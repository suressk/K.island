<template>
  <header class="k-header flex-between">
    <h1 class="k-logo">
      <nuxt-link class="link flex-center" to="/">
        K.
      </nuxt-link>
    </h1>
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
  </header>
</template>

<script>
import QRCode from 'qrcode'

export default {
  name: 'Header',
  data () {
    return {}
  },
  mounted () {
    const qrCodeContainer = document.getElementById('qrcode')
    QRCode.toCanvas(qrCodeContainer, window.location.href)
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import "assets/css/components/header.scss";
</style>
