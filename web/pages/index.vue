<template>
  <div class="main-page">
    <!--<CircleLoading />-->
    <!--  封面图  -->
    <div class="page-cover">
      <div id="scene" class="wh-100 flex-center" :style="{ height: sceneHeight }">
        <div class="layer" data-depth="0.2" :style="layerStyle">
          <img src="~@/static/images/scene_bg.webp" alt="cover" width="1920" height="1080" :style="imgStyle">
        </div>
      </div>
      <!--   头部菜单按钮   -->
      <div class="head-bar flex-between">
        <span class="logo trans-all-05 flex-center" :class="{ 'nav-show': showNav }">
          <img src="~@/static/images/logo.svg" alt="logo">
          K.island
        </span>
        <span class="menu-btn flex-center" @click="handleTriggerNav">
          <i class="iconfont icon-menu" />
        </span>
      </div>
      <!--   导航菜单   -->
      <div class="nav flex-center" :class="{ 'is-show': showNav }">
        <nuxt-link
          v-for="nav in navList"
          :key="nav.title"
          :to="nav.path"
          class="nav-item"
        >
          {{ nav.title }}
        </nuxt-link>
        <div class="tip">
          Everywhere in the world has a similar life.
        </div>
      </div>
      <div class="mask" />
    </div>
    <!--  文章列表 content  -->
    <div class="content">
      <ul class="content-list">
        <li class="content-item">
          <div class="cover flex-center trans-all-03">
            <img src="" alt="">
          </div>
          <div class="info">
            <span class="time">2021-01-01</span>
            <span class="title two-line-txt">文章 title</span>
            <span class="introduce three-line-txt">文章简介</span>
            <div class="suffix d-flex">
              <span class="views d-flex">
                <i class="iconfont icon-view" />
                1203
              </span>
              <span class="tag d-flex">
                <i class="iconfont icon-tag" />
                Mood
              </span>
            </div>
          </div>
        </li>
        <li class="content-item">
          <div class="cover flex-center trans-all-03">
            <img src="" alt="">
          </div>
          <div class="info">
            <span class="time">2021-01-01</span>
            <span class="title two-line-txt">文章 title</span>
            <span class="introduce three-line-txt">文章简介</span>
            <div class="suffix d-flex">
              <span class="views d-flex">
                <i class="iconfont icon-view" />
                1203
              </span>
              <span class="tag d-flex">
                <i class="iconfont icon-tag" />
                Mood
              </span>
            </div>
          </div>
        </li>
      </ul>
      <LoadMore class="more" />
    </div>

    <BackToTop />
    <Footer />
  </div>
</template>

<script>
import Vue from 'vue'
import Parallax from 'parallax-js'

const navList = [
  { title: 'Article', path: '/article' },
  { title: 'About Me', path: '/about' }
]

export default Vue.extend({
  data () {
    return {
      navList,
      showNav: false,
      sceneHeight: '100%',
      sceneWidth: '100%',
      layerStyle: {},
      imgStyle: {}
    }
  },
  mounted () {
    this.init()
    const scene = document.getElementById('scene')
    /* eslint-disable */
    new Parallax(scene, {
      relativeInput: true,
      clipRelativeInput: true
    })
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.init()
      window.onresize = () => vm.init()
    })
  },
  beforeRouteLeave (to, from, next) {
    window.onresize = null
    next()
  },
  methods: {
    init () {
      this.sceneHeight = document.documentElement.clientHeight + 'px'
      this.sceneWidth = document.documentElement.clientWidth + 'px'
      this.coverLayer()
    },
    handleTriggerNav () {
      this.showNav = !this.showNav
    },
    coverLayer () {
      const sceneWidth = parseInt(this.sceneWidth)
      const sceneHeight = parseInt(this.sceneHeight)
      const e = (sceneWidth > 1000 || sceneHeight > 1000) ? 1000 : 500
      let x, y, i
      if (sceneWidth >= sceneHeight) {
        i = sceneWidth / e * 50
        y = i
        x = i * sceneWidth / sceneHeight
      } else {
        i = sceneHeight / e * 50
        x = i
        y = i * sceneHeight / sceneWidth
      }
      const style = {
        width: sceneWidth + x + 'px',
        height: sceneHeight + y + 'px',
        marginLeft: -0.5 * x + 'px',
        marginTop: -0.5 * y + 'px'
      }
      this.layerStyle = { ...this.layerStyle, ...style }
      this.coverImg()
    },
    coverImg () {
      const width = parseInt(this.layerStyle.width)
      const height = parseInt(this.layerStyle.height)
      const scale = 1080 / 1920
      const style = {}
      const compute = height / width > scale
      style.width = compute ? `${height / scale}px` : `${width}px`
      style.height = compute ? `${height}px` : `${width * scale}px`
      style.left = (width - parseInt(style.width)) / 2 + 'px'
      style.top = (height - parseInt(style.height)) / 2 + 'px'
      this.imgStyle = { ...this.imgStyle, ...style }
    }
  },
  head () {
    return {
      title: 'K.island',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'K.,blog,mood island,web,前端,个人博客,心情记录小站'
        },
        {
          hid: 'description',
          name: 'description',
          content: '世界上每个角落都有人过着相似的人生。愿所有的美好如约而至，愿所有的黑暗都能看到希望，我们都能微笑前行，人生没有完美，也许有些遗憾才美...'
        }
      ]
    }
  }
})
</script>

<style lang="scss">
@import url('https://at.alicdn.com/t/font_2332190_xf4z5im8p5m.css');
@import "assets/css/pages/index.scss";
</style>
