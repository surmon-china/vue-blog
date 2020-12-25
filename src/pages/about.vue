<template>
  <div class="about-page" :class="{ mobile: isMobile }">
    <div class="about-me">
      <div class="profile">
        <div class="bio">
          <i class="iconfont icon-swordsman" />
          <div class="text">
            <i18n>
              <template #zh>一个渣男</template>
              <template #en>I'm Surmon, a digital nomad.</template>
            </i18n>
          </div>
        </div>
        <div class="description">
          <div class="item">
            <i class="iconfont icon-heart" />
            <span class="like-text">
              <i18n
                zh="酒池肉林、日夜笙歌、依翠偎红、五音六律、目营心匠、桀骜不羁"
                en="misfits. rebels. troublemakers. rocker."
              />
            </span>
          </div>
          <div class="item">
            <i class="iconfont icon-tibet-1" />
            <span class="live-map" @click="toggleLiveMap">
              <i18n
                zh="路为纸，地成册，行作笔，心当墨；思无界，行有疆"
                en="Every path I went astray built my Rome."
              />
            </span>
            <client-only>
              <popup :visible="isOnLiveMap" @close="toggleLiveMap">
                <iframe
                  :src="VALUABLE_LINKS.GOOGLE_LIVE_MAP"
                  frameborder="0"
                  class="live-map"
                />
              </popup>
            </client-only>
          </div>
          <div class="item">
            <i class="iconfont icon-social" />
            <span class="social-media-accounts">
              <span class="normal">
                <ulink class="item normal-button github" :href="VALUABLE_LINKS.GITHUB">
                  <i class="iconfont icon-github" />
                  <span class="text">GitHub</span>
                </ulink>
                <ulink class="item normal-button twitter" :href="VALUABLE_LINKS.TWITTER">
                  <i class="iconfont icon-twitter" />
                  <span class="text">Twitter</span>
                </ulink>
                <ulink class="item normal-button instagram" :href="VALUABLE_LINKS.INSTAGRAM">
                  <i class="iconfont icon-instagram" />
                  <span class="text">Instagram</span>
                </ulink>
              </span>
              <desktop-only>
                <span class="mini">
                  <ulink class="item telegram" :href="VALUABLE_LINKS.TELEGRAM">
                    <i class="iconfont icon-telegram" />
                  </ulink>
                  <ulink class="item linkedin" :href="VALUABLE_LINKS.LINKEDIN">
                    <i class="iconfont icon-linkedin" />
                  </ulink>
                  <ulink class="item douban" :href="VALUABLE_LINKS.DOUBAN">
                    <i class="iconfont icon-douban" />
                  </ulink>
                  <ulink class="item zhihu" :href="VALUABLE_LINKS.ZHIHU">
                    <i class="iconfont icon-zhihu" />
                  </ulink>
                  <ulink class="item weibo" :href="VALUABLE_LINKS.WEIBO">
                    <i class="iconfont icon-weibo" />
                  </ulink>
                  <ulink class="item bilibili" :href="VALUABLE_LINKS.BILIBILI">
                    <i class="iconfont icon-bilibili" />
                  </ulink>
                  <ulink class="item stackoverflow" :href="VALUABLE_LINKS.STACK_OVERFLOW" v-if="false">
                    <i class="iconfont icon-stackoverflow" />
                  </ulink>
                  <ulink class="item algorithm" :href="VALUABLE_LINKS.LEETCODE_CN" v-if="false">
                    <i class="iconfont icon-leetcode" />
                  </ulink>
                  <ulink class="item quora" :href="VALUABLE_LINKS.QUORA">
                    <i class="iconfont icon-quora" />
                  </ulink>
                </span>
              </desktop-only>
            </span>
          </div>
          <div class="item">
            <i class="iconfont icon-dollar"></i>
            <div class="sponsor">
              <ulink
                class="github normal-button icon-button"
                :href="VALUABLE_LINKS.GITHUB_SPONSORS"
                @mousedown="handleTouchSponsor"
              >
                <i class="iconfont icon-heart" />
                <span class="text">GitHub Sponsors</span>
              </ulink>
              <ulink
                class="paypal normal-button icon-button"
                :href="VALUABLE_LINKS.PAYPAL"
                @mousedown="handleTouchSponsor"
              >
                <i class="iconfont icon-paypal" />
                <span class="text">PayPal me</span>
              </ulink>
              <ulink
                class="more normal-button icon-button"
                :href="VALUABLE_LINKS.SPONSOR"
                @mousedown="handleTouchSponsor"
              >
                <i class="iconfont icon-qrcode" />
                <span class="text">More</span>
              </ulink>
            </div>
          </div>
          <div class="item">
            <i class="iconfont icon-music" />
            <span class="music">
              <router-link :to="getPageRoute(RouteName.Music)">
                Jazz-HipHop, Electronic, Disco, Rock, Popular
              </router-link>
              <ulink class="spotify" :href="VALUABLE_LINKS.SPOTIFY">
                <i class="iconfont icon-spotify" />
              </ulink>
              <ulink class="music-163" :href="VALUABLE_LINKS.MUSIC_163">
                <i class="iconfont icon-163music-logo" />
              </ulink>
            </span>
          </div>
          <div class="item">
            <i class="iconfont icon-comment-discussion" />
            <ulink class="group-link" :href="VALUABLE_LINKS.QQ_GROUP">
              <i18n zh="寂寞同性交友群" en="QQ group" />
            </ulink>
            <span class="separator">|</span>
            <ulink class="group-link" :href="VALUABLE_LINKS.TELEGRAM_GROUP">
              <i18n zh="电报群" en="Telegram group" />
            </ulink>
          </div>
          <div class="item">
            <i class="iconfont icon-friend" />
            <span class="friends">
              <a
                v-for="(link, name) in FRIEND_LINKS"
                :key="link"
                :href="link"
                class="link"
                target="_blank"
                rel="external nofollow noopener"
              >
                {{ name }}
              </a>
            </span>
            <span>...</span>
          </div>
        </div>
      </div>
      <div class="gravatar">
        <div class="background be-2">
          <uimage
            cdn
            class="image"
            alt="background"
            src="/images/page-about/background-be-2.jpg"
          />
        </div>
        <div class="background be-1">
          <uimage
            cdn
            class="image"
            alt="background"
            src="/images/page-about/background-be-1.jpg"
          />
        </div>
        <div class="background star-1">
          <uimage
            cdn
            class="image"
            alt="background-star"
            src="/images/page-about/background-star-1.png"
          />
        </div>
        <div class="background star-2">
          <uimage
            cdn
            class="image"
            alt="background-star"
            src="/images/page-about/background-star-2.png"
          />
        </div>
        <img :src="gravatar" class="avatar" draggable="false">
        <div class="description">
          <h3 class="name">
            <strong>Surmon</strong>
          </h3>
          <p class="role">
            <i18n en="Digital nomad" zh="数字游民" />
          </p>
        </div>
        <desktop-only>
          <span class="followme">
            <i18n :lkey="LANGUAGE_KEYS.FRIEND_ME" />
          </span>
          <div class="wechat" @mouseenter="handleHoverFollowMe">
            <uimage
              cdn
              class="qrcode"
              src="/images/page-about/wechat-qrcode.jpg"
            />
            <span class="tooltip">
              <i18n zh="扫码加微，解锁灵魂" en="Scan the QR code in WeChat" />
            </span>
          </div>
        </desktop-only>
      </div>
    </div>
    <template v-if="adConfig.PC_ABOUT_PAGE_SWIPER.length">
      <desktop-only>
        <client-only transition>
          <div class="mammon">
            <swiper class="swiper" :options="adSwiperOption">
              <swiper-slide
                v-for="(item, index) in adConfig.PC_ABOUT_PAGE_SWIPER"
                :key="index"
              >
                <ulink class="item" :href="item.url">
                  <img
                    :src="item.src"
                    :alt="item.alt || item.title"
                    :title="item.title || item.alt"
                  >
                </ulink>
              </swiper-slide>
              <template #pagination>
                <div class="swiper-pagination" />
              </template>
            </swiper>
          </div>
        </client-only>
      </desktop-only>
    </template>
    <div class="location-map">
      <iframe class="iframe" src="/partials/map.html" />
    </div>
    <desktop-only>
      <div class="about-project">
        <ulink class="project-link" :href="VALUABLE_LINKS.GITHUB">
          <p class="title">
            <i class="iconfont icon-terminal" />
            <span class="description">contributions</span>
          </p>
          <uimage cdn src="/images/ghchart.svg" />
        </ulink>
      </div>
    </desktop-only>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, toRef } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { RouteName } from '/@/router'
  import { getPageRoute } from '/@/transforms/route'
  import { getFileCDNUrl } from '/@/transforms/url'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { GAEventActions, GAEventTags } from '/@/constants/gtag'
  import { VALUABLE_LINKS, FRIEND_LINKS } from '/@/config/app.config'

  export default defineComponent({
    name: 'About',
    setup(props) {
      const { i18n, helmet, gtag, globalState, store, adConfig, isZhLang, isMobile } = useEnhancer()
      const isOnLiveMap = toRef(globalState.switchBox, 'liveMap')
      const gravatar = computed(() => (
        store.state.option.adminInfo?.gravatar ||
        getFileCDNUrl('/images/gravatar.jpg')
      ))

      helmet(() => {
        const prefix = isZhLang.value
          ? `${i18n.t(LANGUAGE_KEYS.PAGE_ABOUT)} | `
          : ''
        return { title: prefix + 'About' }
      })

      const handleHoverFollowMe = () => {
        gtag?.event('加微信码', {
          event_category: GAEventActions.View,
          event_label: GAEventTags.AboutPage
        })
      }

      const handleTouchSponsor = () => {
        gtag?.event('赞赏 Sponsor', {
          event_category: GAEventActions.Click,
          event_label: GAEventTags.AboutPage
        })
      }

      const toggleLiveMap = () => {
        globalState.switchTogglers.liveMap()
        if (globalState.switchBox.liveMap) {
          gtag?.event('轨迹地图', {
            event_category: GAEventActions.View,
            event_label: GAEventTags.AboutPage
          })
        }
      }

      const adSwiperOption = {
        loop: true,
        direction: 'vertical',
        autoplay: {
          delay: 2666,
          disableOnInteraction: false
        },
        pagination: {
          clickable: true,
          el: '.swiper-pagination'
        },
        autoHeight: true,
        mousewheel: true,
        observeParents: true,
        preloadImages: false,
        lazy: true
      }

      return {
        VALUABLE_LINKS,
        FRIEND_LINKS,
        LANGUAGE_KEYS,
        RouteName,
        getPageRoute,
        adConfig,
        adSwiperOption,
        isMobile,
        isOnLiveMap,
        gravatar,
        handleHoverFollowMe,
        handleTouchSponsor,
        toggleLiveMap
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .live-map {
    width: 88vw;
    height: 88vh;
  }

  .about-page {
    width: 100%;
    overflow:  hidden;

    .about-me {
      width: 100%;
      height: auto;
      margin-bottom: $lg-gap;
      overflow: hidden;
      display: flex;
      justify-content: space-between;

      .profile {
        flex-grow: 1;
        padding: 2.4rem 2.8rem;
        padding-bottom: 2rem;
        position: relative;
        @include common-bg-module();
        @include radius-box($lg-radius);

        .bio {
          display: flex;
          align-items: center;
          padding-left: $sm-gap;
          margin-bottom: 1.8rem;

          .iconfont {
            font-size: $font-size-h2;
            color: $primary;
          }

          .text {
            position: relative;
            margin-left: 1.8rem;
            padding: 0 1em;
            padding-bottom: .2em;
            font-family: 'webfont-bolder', DINRegular;
            background-color: $primary-lighter;
            color: $text-reversal;
            line-height: 2em;
            letter-spacing: .1em;
            @include radius-box($sm-radius);

            &::before {
              content: '';
              position: absolute;
              display: block;
              height: 1rem;
              bottom: -0.5rem;
              left: 0;
              right: 0;
              background-image: radial-gradient(circle, transparent 70%, $white 70%);
              background-size: 0.7em 1em;
              background-position: 0 -0.5em;
            }
          }
        }

        .description {
          > .item {
            line-height: 2.5em;
            min-height: 2.5em;
            margin-bottom: 1.2rem;
            &:last-child {
              margin-bottom: 0;
            }

            > .iconfont {
              width: 2em;
              margin-right: 1em;
              display: inline-block;
              font-size: $font-size-h4;
              text-align: center;
              color: $text-dividers;

              &.icon-tibet-1 {
                color: #a94444;
              }
              &.icon-heart {
                color: $red;
              }
              &.icon-social {
                color: $bilibili-blue-primary;
              }
              &.icon-dollar {
                color: #ffa800;
              }
              &.icon-music {
                color: $music163-primary;
              }
              &.icon-comment-discussion {
                color: $telegram-primary;
              }
              &.icon-friend {
                color: $accent;
              }
            }

            .normal-button {
              $button-size: 2rem;
              display: inline-flex;
              line-height: $button-size;
              padding: 0 $sm-gap;
              margin-right: $sm-gap;
              color: $white;
              @include radius-box($sm-radius);
              @include background-transition();

              .iconfont {
                margin-right: $xs-gap;
              }
              .text {
                font-size: $font-size-small;
              }

              &.icon-button {
                padding-left: 0;
                .iconfont {
                  display: inline-block;
                  width: $button-size;
                  height: $button-size;
                  line-height: $button-size;
                  text-align: center;
                }
              }
            }

            .separator {
              margin: 0 $sm-gap;
            }

            .group-link {
              padding-bottom: 2px;
              border-bottom: 1px solid;
            }

            > .like-text {
              font-family: 'webfont-bolder', DINRegular;
            }

            > .live-map {
              cursor: pointer;
              border-bottom: 1px solid;
              font-family: 'webfont-bolder', DINRegular;
            }

            > .music {
              .spotify,
              .music-163 {
                margin-left: $xs-gap;
              }
              .spotify {
                color: $spotify-primary;
              }
              .music-163 {
                color: $music163-primary;
              }
            }

            > .friends {
              .link {
                margin-right: 1.8rem;
                text-transform: capitalize;
                font-weight: bold;
                padding-bottom: 2px;
                border-bottom: 1px solid;
              }
            }

            > .social-media-accounts {
              .normal {
                display: inline-flex;
                align-items: center;
                margin-right: $lg-gap;

                .item {
                  &.github {
                    background-color: $github-primary;
                    &:hover {
                      background-color: $github-primary-hover;
                    }
                  }
                  &.twitter {
                    background-color: $twitter-primary;
                    &:hover {
                      background-color: $twitter-primary-hover;
                    }
                  }
                  &.instagram {
                    opacity: 0.8;
                    margin: 0;
                    background: $instagram-primary;
                    background: $instagram-gradient;
                    @include visibility-transition();
                    &:hover {
                      opacity: 1;
                    }
                  }
                }
              }

              > .mini {
                $button-size: 2rem;
                > .item {
                  display: inline-block;
                  width: $button-size;
                  height: $button-size;
                  line-height: $button-size;
                  margin-right: $sm-gap;
                  text-align: center;
                  border-radius: 100%;
                  color: $white;
                  opacity: 0.8;
                  @include visibility-transition();

                  &:hover {
                    opacity: 1;
                  }

                  .iconfont {
                    font-size: $font-size-small;
                  }

                  &.telegram {
                    background-color: $telegram-primary;
                  }
                  &.douban {
                    background-color: $douban-primary;
                  }
                  &.zhihu {
                    background-color: $zhihu-primary;
                  }
                  &.weibo {
                    background-color: $weibo-primary;
                  }
                  &.bilibili {
                    background-color: $bilibili-pink-primary;
                  }
                  &.stackoverflow {
                    background-color: $stackoverflow-primary;
                  }
                  &.algorithm {
                    background-color: $leetcode-primary;
                  }
                  &.quora {
                    background-color: $quora-primary;
                  }
                  &.linkedin {
                    background-color: $linkedin-primary;
                  }
                }
              }
            }

            > .sponsor {
              display: inline-flex;
              align-items: center;

              .github,
              .paypal,
              .more {
                opacity: .9;
                @include visibility-transition();
                &:hover {
                  opacity: 1;
                }
              }

              .github {
                background-color: $github-primary;
                .iconfont {
                  background-color: $github-primary-hover;
                  color: $github-sponsor-primary;
                }
              }
              .paypal {
                background-color: $paypal-primary;
                .iconfont {
                  background-color: $paypal-primary-hover;
                  color: $paypal-primary;
                }
              }
              .more {
                background-color: $wechat-primary;
              }
            }
          }
        }
      }

      .gravatar {
        position: relative;
        width: 22rem;
        flex-grow: 0;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
        margin-left: $lg-gap;
        @include radius-box($lg-radius);
        @include common-bg-module();

        @keyframes aboutbg-be-1 {
          0% { transform: translate3d(0%, 0%, 0) }
          25% { transform: translate3d(-50%, -50%, 0) }
          50% { transform: translate3d(-50%, 0%, 0) }
          75% { transform: translate3d(0%, -50%, 0) }
          100% { transform: translate3d(0%, 0%, 0) }
        }

        @keyframes aboutbg-be-2 {
          0% { transform: translate3d(0%, 0%, 0) }
          25% { transform: translate3d(0%, -50%, 0) }
          50% { transform: translate3d(-20%, 0%, 0) }
          75% { transform: translate3d(-30%, -50%, 0) }
          100% { transform: translate3d(0%, 0%, 0) }
        }

        @keyframes aboutbg-star {
          0% { opacity: 1; }
          25% { opacity: .5; }
          50% { opacity: .8; }
          75% { opacity: .2; }
          100% { opacity: 1; }
        }

        > .background {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 26%;
          top: 0;
          right: 0;
          z-index: $z-index-normal;
          overflow: hidden;

          &.be-1 {
            opacity: .66;

            > .image {
              width: auto;
              height: 200%;
              animation: aboutbg-be-1 88s linear infinite;
            }
          }

          &.be-2 {
            opacity: 1;

            > .image {
              width: auto;
              height: 200%;
              animation: aboutbg-be-2 66s linear infinite;
            }
          }

          &.star-1,
          &.star-2 {
            width: auto;
            height: auto;
            right: 1rem;

            > .image {
              width: 5rem;
              height: auto;
              animation: aboutbg-star 6s linear infinite;
            }
          }
        }

        &:hover {
          > .avatar {
            transform: rotate(360deg);
          }

          > .wechat {
            @include visible();
          }
        }

        > .avatar {
          width: 8rem;
          height: 8rem;
          z-index: $z-index-normal + 2;
          margin-top: 5rem;
          max-width: 100%;
          border-radius: 100%;
          border: 5px solid $module-bg;
          box-sizing: content-box;
          transition: transform $transition-time-slow;
        }

        > .description {
          text-align: center;
          color: $text;

          > .role {
            margin-top: .466rem;
          }
        }

        > .followme {
          margin-top: 1.666rem;
          display: inline-block;
          color: $primary;
          border: 1px solid $primary;
          border-radius: $xs-radius;
          width: 56%;
          height: 2.68rem;
          text-align: center;
          line-height: 2.46rem;

          &:hover {
            color: $text-reversal;
            background-color: $primary;
          }
        }

        > .wechat {
          position: absolute;
          left: 0;
          bottom: 0rem;
          width: 100%;
          height: 74%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: $z-index-normal + 1;
          @include hidden();
          @include visibility-transition();

          .qrcode {
            margin-top: 3rem;
            margin-bottom: $gap;
            width: 80%;
          }

          .tooltip {
            color: $text;
            font-size: $font-size-small;
          }
        }
      }
    }

    .mammon {
      width: 100%;
      margin-bottom: $lg-gap;
      background-color: $module-bg;
      @include radius-box($lg-radius);

      .swiper {
        height: 6rem;

        img {
          width: 100%;
          @include hover-effect();
        }
      }
    }

    .location-map {
      overflow: hidden;
      width: 100%;
      padding: $sm-gap;
      margin-bottom: $lg-gap;
      @include radius-box($lg-radius);
      @include common-bg-module();

      iframe {
        width: 100%;
        height: 19rem;
        border-radius: $xs-radius;
      }
    }

    .about-project {
      overflow: hidden;
      position: relative;
      display: flex;
      width: 100%;
      height: 12rem;

      .project-link {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        @include common-bg-module();
        @include radius-box($lg-radius);

        .title {
          margin-bottom: 0;
          display: flex;
          flex-direction: column;
          text-align: center;
          margin-right: $lg-gap * 3;

          .iconfont {
            font-size: 4em;
            color: #98c471;
            line-height: 1em;
            padding: 0;
            margin-top: $sm-gap;
            margin-bottom: $gap;
          }
          .description {
            $color: rgb(214, 229, 133);
            display: block;
            line-height: 1.7em;
            text-align: center;
            padding: 0 .2em;
            color: $color;
            border: 1px solid $color;
            font-size: $font-size-small;
          }
        }
      }
    }

    &.mobile {
      margin: 0;

      > .about-me,
      > .location-map {
        margin-bottom: $gap;
      }

      > .about-me {
        flex-direction: column-reverse;

        .gravatar {
          width: 100%;
          margin-left: 0;
          margin-bottom: $gap;
          flex-direction: row;
          padding: $lg-gap 0;

          > .background {
            height: 100%;

            &.star-1,
            &.star-2 {
              > .image {
                width: 4rem;
              }
            }

            > .image {
              width: 200%;
              height: auto;
            }
          }

          > .avatar {
            width: 6rem;
            height: 6rem;
            margin-top: 0;
            margin-left: 6%;
          }

          > .description {
            width: 50%;
            margin-left: 5%;
            text-align: left;
            z-index: $z-index-normal + 1;
            color: $text-reversal;

            > .name,
            > .role {
              margin: 1rem 0;
            }
          }

          > .favorite {
            margin: 1rem 0;
            margin-bottom: 2rem;
          }
        }

        .profile {
          width: 100%;
          padding: 1em;
          padding-top: 2rem;
          overflow: hidden;

          .description {
            > .item {
              @include text-overflow();

              > .iconfont {
                margin-right: $sm-gap;
              }
            }
          }
        }
      }

      > .location-map {
        margin: 0;

        .iframe {
          height: 11rem;
        }
      }
    }
  }
</style>
