<template>
  <header class="k-header">
    <div class="header-content flex-between fixed">
      <h1 class="k-logo">
        <nuxt-link class="link flex-center" to="/">
          K.
        </nuxt-link>
      </h1>
      <span class="k-title flex-center" :class="{ active: showTitle }">{{ kTitle }}</span>
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
  </header>
</template>

<script lang="ts">
import QRCode from 'qrcode'
import { ref, defineComponent, onMounted, onBeforeUnmount } from '@nuxtjs/composition-api'
import { addListener, removeListener, throttle } from '../../utils/util' // '~/utils/util'

export default defineComponent({
  name: 'KHeader',
  props: {
    kTitle: {
      type: String,
      default: 'K. (≖ᴗ≖)✧'
    }
  },
  setup () {
    const showTitle = ref<boolean>(false)

    function handleScroll () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 100) {
        !showTitle.value && (showTitle.value = true)
        return
      }
      showTitle.value && (showTitle.value = false)
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
      showTitle
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

<style scoped lang="scss">
@import "assets/css/components/header.scss";
</style>
