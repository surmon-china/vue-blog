import './polyfill'

import { MUSIC_ALBUM_ID, GA_MEASUREMENT_ID, ADSENSE_CLIENT_ID } from '/@/config/app.config'
import { VueEnv, isProd } from '/@/vuniversal/env'
import gtag from './services/gtag'
import adsense from '/@/services/adsense'
import swiper from '/@/services/swiper'
import { createDefer } from '/@/services/defer'
import { createMusic } from '/@/services/music'
import { createPopup } from '/@/services/popup'
import { consoleSlogan } from '/@/services/slogan'
import { enableCopyright } from '/@/services/copyright'
import { enableBaiduSeoPush } from '/@/services/baidu-seo-push'
import { enableAutoTitleSurprise } from './services/title-surprise'
import { exportAppToGlobal } from '/@/services/exporter'
import { exportLozadToGlobal } from '/@/services/lozad'
import { Language } from '/@/language/data'
import { getFileCDNUrl } from '/@/transforms/url'
import { createVueApp } from './main'

const { app, router, globalState, theme, i18n, store } = createVueApp({ target: VueEnv.Client })
const music = createMusic({ albumId: MUSIC_ALBUM_ID, autoStart: false })
const defer = createDefer()

app.use(swiper)
app.use(music)
app.use(defer, { exportToGlobal: true })
app.use(createPopup(), { exportToGlobal: true })
app.use(adsense, { ID: ADSENSE_CLIENT_ID, enabledAutoAD: true })
app.use(gtag, {
  router,
  id: GA_MEASUREMENT_ID,
  // customResourceURL: getFileCDNUrl('/scripts/gtag.js'),
})

// init
globalState.resetOnClient()
theme.resetOnClient()
i18n.set(globalState.userAgent.isZhUser ? Language.Zh : Language.En)
store.clientInit()
exportLozadToGlobal()
exportAppToGlobal(app)

app.mount('#app').$nextTick(() => {
  // Desktop
  if (!globalState.userAgent.isMobile) {
    defer.addTask(music.start)
    enableAutoTitleSurprise()
  }

  // Production
  if (isProd) {
    enableCopyright()
    enableBaiduSeoPush(router)
    consoleSlogan(i18n)
  }
})
