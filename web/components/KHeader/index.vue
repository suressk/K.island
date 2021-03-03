<template>
  <header class="k-header">
    <div class="header-content flex-between fixed">
      <h1 class="header-l-nav d-flex">
        <nuxt-link class="logo flex-center" to="/">K.</nuxt-link>
        <span class="k-play flex-center">
          <i
            class="iconfont"
            :class="{
              'icon-play': !playing,
              'icon-paused': playing
            }"
            @click="handlePlayMusic"
          />
        </span>
      </h1>
      <span class="k-title txt-overflow" :title="customTitle" :class="{ active: showTitle }">{{ customTitle }}</span>
      <ul class="header-r-nav flex-center">
        <li class="r-nav-item flex-center qrcode">
          <i class="iconfont icon-qrcode trans-all-03" />
          <div class="drop-down flex-center">
            <canvas id="qrcode" />
            <span class="tip">
              在手机上查看本页内容
            </span>
          </div>
        </li>
        <li class="r-nav-item">
          <nuxt-link class="link flex-center" to="/about">
            <img class="avatar" src="~@/static/images/avatar.png" alt="K.">
          </nuxt-link>
        </li>
      </ul>
    </div>
    <audio ref="kMusic" preload="auto" loop="loop">
      <source type="audio/mpeg" src="static/music/lightMusic.mp3">
    </audio>
  </header>
</template>

<script lang="ts">
import QRCode from 'qrcode'
// import Notification from '~/components/notification'
import {
  ref,
  defineComponent,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance
} from '@nuxtjs/composition-api'
import { addListener, removeListener, throttle } from '~/utils/util'

export default defineComponent({
  name: 'KHeader',
  props: {
    customTitle: {
      type: String,
      default: 'K. (≖ᴗ≖)✧'
    }
  },
  setup () {
    const vm = getCurrentInstance()!
    const showTitle = ref<boolean>(false)
    const playing = ref<boolean>(false)

    function handleScroll () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 100) {
        !showTitle.value && (showTitle.value = true)
        return
      }
      showTitle.value && (showTitle.value = false)
    }

    function handlePlayMusic () {
      // vm.refs.kMusic
      playing.value = !playing.value
      // 正在播放
      if (playing.value) {
        // @ts-ignore
        vm.refs.kMusic.play()
      } else {
        // @ts-ignore
        vm.refs.kMusic.pause()
      }
    }

    const fnScroll = throttle(handleScroll, 100)

    onMounted(() => {
      const qrCodeContainer = document.getElementById('qrcode')
      QRCode.toCanvas(qrCodeContainer, window.location.href)
      addListener(document, 'scroll', fnScroll)
    })
    onBeforeUnmount(() => {
      removeListener(document, 'scroll', fnScroll)
    })
    return {
      showTitle,
      playing,
      handlePlayMusic
    }
  }
})

//  {
//   name: 'Header',
//   props: {
//     title: {
//       type: String,
//       default: 'K'
//     }
//   },
//   // data () {
//   //   return {}
//   // },
//   mounted () {
//     const qrCodeContainer = document.getElementById('qrcode')
//     QRCode.toCanvas(qrCodeContainer, window.location.href)
//   },
//   methods: {}
// }
</script>

<style lang="scss">
@import "assets/css/components/header.scss";
</style>
