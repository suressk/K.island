<template>
  <div class="main-page">
    <!--<CircleLoading />-->
    <!--  封面图  -->
    <div class="cover">
      <div id="scene" class="wh-100 flex-center">
        <img data-depth="0.4" src="~@/static/images/scene_bg.webp" alt="cover">
      </div>
      <!--   头部菜单按钮   -->
      <div class="head-bar flex-between">
        <span class="logo flex-center">
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
    </div>
    <!--  文章列表 content  -->
    <ul class="content">
      <li class="content-item">
        <div class="article-cover">
          <img src="" alt="">
        </div>
        <div class="article-info">
          <span class="time">2021-01-01</span>
          <span class="title">文章 title</span>
          <span class="introduce">文章简介</span>
          <div class="suffix">
            <span class="views">
              <i class="iconfont icon-views" />
              1203
            </span>
            <span class="tag">
              <i class="iconfont icon-tag" />
              Mood
            </span>
          </div>
        </div>
      </li>
    </ul>

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
      showNav: false
    }
  },
  mounted () {
    // document.addEventListener('mousemove', this.parallax)
    const scene = document.getElementById('scene')
    // eslint-disable-next-line no-new
    new Parallax(scene, {
      relativeInput: true,
      clipRelativeInput: true
    })
  },
  methods: {
    handleTriggerNav () {
      this.showNav = !this.showNav
    }
    // parallax (e) {
    //   const scene = document.querySelector('#scene')
    //   const x = (window.innerWidth - e.pageX * 5) / 100
    //   const y = (window.innerHeight - e.pageY * 5) / 100
    //   scene.style.transform = `translate(${x}px, ${y}px)`
    // }
  },
  head () {
    return {
      title: 'K.island'
      // meta: [
      //   { hid: 'keywords', name: 'keywords', content: 'keywords' },
      //   { hid: 'description', name: 'description', content: 'web_describe' }
      // ]
    }
  }
})
</script>

<style lang="scss">
@import url('https://at.alicdn.com/t/font_2332190_piak1vlt0jk.css');
.main-page {
  min-height: 100vh;
  //background-color: #008c8c;
  // 封面 区域
  .cover {
    position: relative;
    width: 100%;
    height: 100vh;
    // logo + menuBtn
    .head-bar {
      position: absolute;
      left: 0;
      top: 70px;
      padding: 0 40px;
      width: 100%;
      z-index: 10;
      .logo {
        height: 40px;
        color: #666;
        font-size: 25px;
        font-style: italic;
        border-radius: 5px;
        cursor: default;
        user-select: none;
        img {
          height: 100%;
          margin-right: 20px;
        }
      }
      .menu-btn {
        display: flex;
        width: 40px;
        height: 40px;
        cursor: pointer;
        color: #ff3600;
        background-color: #fff;
        border-radius: 5px;
        .iconfont {
          font-size: 25px;
        }
      }
    }
    #scene {
      overflow: hidden;
      img {
        margin: 0 -100px;
      }
    }
  }
  // 菜单导航
  .nav {
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(255, 255, 255, 0.8);
    transition: height 0.5s cubic-bezier(0.25, 0.5, 0.5, 0.9);
    overflow: hidden;
    font-size: 25px;
    height: 0;
    width: 100vw;
    z-index: 9;
    &.is-show {
      height: 100vh;
    }
    .nav-item {
      user-select: none;
      color: #666;
      margin: 0 10px;
      cursor: pointer;
      &:hover {
        color: #222;
      }
    }
    .tip {
      position: absolute;
      bottom: 10px;
    }
  }
}
</style>
