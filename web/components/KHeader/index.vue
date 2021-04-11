<template>
  <header class="k-header">
    <div class="header-content flex-between fixed">
      <h1 class="header-l-nav d-flex">
        <nuxt-link class="logo flex-center" to="/">K.</nuxt-link>
        <span class="k-play flex-center">
          <i
            class="iconfont"
            :class="playIcon"
            @click="handleTogglePlayMusic"
          />
        </span>
      </h1>
      <span class="k-title txt-overflow" :title="title" :class="{ active: showTitle }">{{ title }}</span>
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
          <nuxt-link class="link flex-center" to="/contact">
            <img class="avatar" src="~~/static/images/avatar.png" alt="K.">
          </nuxt-link>
        </li>
      </ul>
    </div>
    <audio ref="musicRef" preload="auto" loop="loop">
      <source type="audio/mpeg" :src="music">
    </audio>
    <div class="view-progress" :style="{ width: viewProgress }" />

    <div class="music-progress" :style="{ width: musicProgress }" />
  </header>
</template>

<script lang="ts">
import useHeader from './useHeader'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'KHeader',
  props: {
    title: {
      type: String,
      default: 'K. (≖ᴗ≖)✧'
    },
    music: {
      type: String,
      default: 'http://localhost:9527/music/lightMusic.mp3'
    },
    needScroll: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    return {
      ...useHeader(props)
    }
  }
})
</script>

<style lang="scss">
@import "assets/css/components/header";
</style>
