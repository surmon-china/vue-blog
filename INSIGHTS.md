
### SSR state context serialize

fork from: https://github.com/nuxt/nuxt.js/blob/dev/packages/utils/src/serialize.js
document: https://github.com/yahoo/serialize-javascript

### PreFetch

```js
const { createSSRApp, defineComponent } = require('vue')
const { renderToString } = require('@vue/server-renderer')

const asyncChildren = defineComponent({
  name: 'asyncChildren',
  async setup() {
    // some async error...
    // e.g. axios.fetch...
    // throw new Error('async child error!')
    return Promise.reject('async child error!')
  },
  template: `<div class="async-children">{{ test.abc }}</div>`
})

const app = createSSRApp({
  name: 'App',
  components: {
    asyncChildren
  },
  template:
  `
    <div class="app">
      <suspense>
        <async-children />
      </suspense>
    </div>
  `,
  errorCaptured(error) {
    console.log('-----errorCaptured', error)
  }
})

app.config.errorHandler = (error) => {
  console.log('-----errorHandler', error)
}

renderToString(app).then(res => {
  console.log('----renderToString', res)
}).catch(error => {
  console.log('----renderToString error', error)
})

```

- [Issue](https://github.com/vuejs/vue-next/issues/2736)

`serverPrefetch` 和 `async setup` 都不能被用作 “抛错即处理” 的预期目的，因为 `renderToString` 的实现中忽略了 `Promise.reject` 返回的结果状态，可参见[此处源码](https://github.com/vuejs/vue-next/blob/master/packages/server-renderer/src/render.ts#L96)，所以只能在 SSR 层面自行实现 `validate` & `preFetch`。

validate 与路由参数耦合，故可以在路由层面进行验证，配置在路由（meta） & 消费在路由（中间件）。
preFetch 由 自定义 hook（客户端）& （手动 get route component）服务端 分别调用。

此方案实现为：

```js
// https://ssr.vuejs.org/guide/data.html#data-store
// 6. do prefetch
// 6. fetch succeed -> renderPage
// 6. fetch failed -> setError -> renderError
const matchedComponents = router.currentRoute.value.matched
  .map(com => com.components?.default)
  .filter(com => (com as any).prefetch)
if (!matchedComponents.length) {
  throw new Error()
}
await Promise.all(matchedComponents.map(
  (component : any) => component.prefetch({
    store,
    route: router.currentRoute
  })
))
```

`serverPrefetch` 是 options API, 尽量不要与 setup API 混搭，所以在 composition-api 中的正确实现应该是：
维持之前的 async setup，当 fetch 发生异常时，直接 setError，而不是期待 async setup 的 error 被捕获。
但是：异步请求 catch 产生的错误信息被捕获了，但是 `renderToString` 的内容并非预期的错误页面；
主要是因为：错误是在 `renderToString` 的过程中发生的，而 ssrRender 可不是响应式的。
所以需要做一个兜底渲染，即：发现 `renderToString` 引起新的 error 时，重新 render 一次。

但这个兜底操作的最终目的是：为了将服务端的网络错误传递给客户端，但是由于服务端和移动端的网络状态本来就是不对应的，比如客户端没有请求成功，客户端应该是需要重新请求的，是这样吗？

所以问题就变成了：
- 期望服务端和客户端对应，对蜘蛛友好，状态也明显，这种情况下，error 也需要在 `ssrContext` 中
- 期望不对应，各自搞各自的，用 http-code 来标示页面的成功与否状态，但是如果服务端输出的是空，客户端是需要重新拉取的，但现有逻辑下服务端不会重新拉取数据

所以最终的做法是：
- 进入路由之前校验路由的 `meta.validate` 若不通过，则会在此处就 setError, 目标页面渲染为空数据，app 渲染为 errorPage
- setup 返回 Promise，当 Promise 成功时，一切正常，失败时 setError，目标页面渲染为空数据，再次 render，app 渲染为 errorPage，若后续 Issues 修复，则可调整逻辑至：以组件 Promise 返回结果为准决定是否渲染错误页面

### SSRContext

`ssrContextKey` 用于在组件中接受 `renderToString` 传入的 props 数据，该能力应用在需要 SSR Render 时向整个应用跨组件注入数据的场景下。
该 `key` 和 `useSSRContext` 都仅在 Server 生效，不能用于通与场景。

鉴于此应用中无此需求：应用抽象有独立的 `global state` 层，且全局共享，故不使用此能力。

```js
const { createSSRApp, defineComponent, h, inject, ssrContextKey, useSSRContext } = require('vue')
const { renderToString } = require('@vue/server-renderer')

const app = createSSRApp(defineComponent({
  name: 'context',
  setup() {
    const ssrContext = inject(ssrContextKey)
    const ssrContext2 = useSSRContext()
    console.log('ssrContext', ssrContext === ssrContext2, ssrContext)
    return () => h('div', 'hello')
  }
}))

;(async () => {
  console.log(await renderToString(app, { abc: 10 }))
})()
```

### Vite
