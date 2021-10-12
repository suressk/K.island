<template>
  <header class="k-header">
    <div class="header-content flex-between fixed">
      <h1 class="header-l-nav d-flex">
        <nuxt-link class="logo flex-center" to="/">K.</nuxt-link>
        <span class="k-play flex-center">
          <i class="iconfont" :class="playIcon" @click="toggleMusic" />
        </span>
      </h1>
      <span class="k-title txt-overflow" :title="title" :class="{ active: showTitle }">{{ title }}</span>

      <ul class="header-r-nav flex-center">
        <li class="r-nav-item flex-center qrcode">
          <i class="iconfont icon-menu" />

          <!-- <canvas class="qrcode" ref="qrcodeRef" />
          <span class="tip">在手机上查看本页内容</span>-->
          <ul class="drop-down flex-col-center">
            <li v-for="nav in navList" :key="nav.title">
              <nuxt-link :to="nav.path" class="nav-item">{{ nav.title }}</nuxt-link>
            </li>
          </ul>
        </li>

        <li class="r-nav-item">
          <nuxt-link class="link flex-center" to="/contact">
            <img class="avatar" src="~~/static/images/avatar.png" alt="K." />
          </nuxt-link>
        </li>
      </ul>
    </div>

    <audio ref="musicRef" preload="metadata" loop="loop">
      <source type="audio/mpeg" :src="music" />
      <!-- 默认加载本服务器音乐 -> 因为人家毕竟要收费 -->
      <source type="audio/mpeg" :src="defaultMusic" />
    </audio>
    <div class="view-progress" :style="{ width: viewProgress }" />

    <div class="music-progress" :style="{ width: musicProgress }" />
  </header>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import { navList } from '~/utils'
import useHeader from './useHeader'

export default defineComponent({
  name: 'KHeader',
  props: {
    title: {
      type: String,
      default: 'K. (≖ᴗ≖)✧'
    },
    music: {
      type: String,
      default: ''
    },
    needScroll: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    return {
      navList,
      ...useHeader(props)
    }
  }
})
</script>

<style lang='scss'>
@import "assets/css/components/header";
</style>
