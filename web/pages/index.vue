<template>
  <div class="main-page">
    <!-- <CircleLoading />
    <ColorfulLoading />
    <Loading /> -->
    <!--  封面图  -->
    <div class="page-cover">
      <div id="scene" class="wh-100 flex-center" :style="{ height: sceneHeight }">
        <div class="layer flex-center" data-depth="0.2" :style="layerStyle">
          <!--<img src="~@/static/images/scene_bg.webp" alt="cover" width="1920" height="1080" :style="coverStyle">-->
          <img src="~@/static/images/cover-es36sme-50as.webp" alt="cover" width="1920" height="1080" :style="coverStyle">
        </div>
      </div>
      <!--   头部菜单按钮   -->
      <div class="head-bar flex-between">
        <span class="logo trans-all-03 flex-center" :class="{ 'nav-show': showNav }">
          <img src="~@/static/images/logo.svg" alt="logo">
          K.island
        </span>
        <span class="menu-btn flex-center" @click="handleToggleNav">
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
        <a href="https://github.com/suerssk" target="_blank" class="nav-item">GitHub</a>
        <div class="tip">
          Everywhere in the world has a similar life.
        </div>
      </div>
      <div class="mask" />
    </div>
    <!--  文章列表 content  -->
    <div class="content">
      <ul class="content-list" v-if="info && info.length > 0">
        <li v-for="item in info" :key="item.uid" class="content-item">
          <div class="cover flex-center trans-all-03">
            <img :src="item.cover" alt="">
          </div>
          <div class="info">
            <span class="time">{{ item.time }}</span>
            <span class="title two-line-txt">{{ item.title }}</span>
            <span class="introduce three-line-txt">{{ item.introduce }}</span>
            <div class="suffix d-flex">
              <span class="r-border views d-flex">
                <i class="iconfont icon-view" />
                {{ item.views }}
              </span>
              <span class="g-border tag d-flex">
                <i class="iconfont icon-tag" />
                {{ item.tag }}
              </span>
            </div>
          </div>
        </li>
      </ul>
      <LoadMore class="more" :load-status="loadStatus" @load-more="handleLoadMore" />
    </div>

    <canvas id="coverContainer"></canvas>

    <BackTop />
    <KFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useIndex from './useIndex'
// import html2canvas from 'html2canvas'

const navList = [
  { title: 'Article', path: '/article' },
  { title: 'About Me', path: '/about' }
]

export default defineComponent({
  // // @ts-ignore
  // fetch () {
  // },
  // // merge to data: () => ({})
  // @ts-ignore
  // async asyncData ({ $axios }) {
  //   // 测试 axios
  //   // const { success, data, message } = await $axios.get('/records/list', {
  //   // const res = await $axios.get('/records/list', {
  //   //   params: {
  //   //     pageNo: 1,
  //   //     pageSize: 10
  //   //   }
  //   // })
  //   // console.log('RESPONSE ===== ', res);
  //   // if (success) {
  //   //   this.$notification({
  //   //     type: 'success',
  //   //     title: 'SUCCESS',
  //   //     message
  //   //   })
  //   //   return {
  //   //     info: data.list
  //   //   }
  //   // } else {
  //   //   console.log(message)
  //   // }
  // },
  setup () {
    return {
      navList,
      ...useIndex(),
      info: []
    }
  },
  // mounted() {
  //   // setTimeout(() => {
  //   //   html2canvas(document.body).then(canvas => {
  //   //     document.body.appendChild(canvas)
  //   //   })
  //   // }, 5000)
  // },
  // // @ts-ignore
  // beforeRouteEnter (to: any, from: any, next: any): void {
  //   next((vm: { init: () => void }) => {
  //     console.log('beforeRouteEnter', vm)

  //     vm.init()
  //     window.onresize = () => vm.init()
  //   })
  // },
  // beforeRouteLeave (to, from, next) {
  //   window.onresize = null
  //   next()
  // },
  head () {
    return {
      title: 'K.island',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'K.,K.island,blog,mood island,web,前端,个人网站,心情记录小站,堃'
        },
        {
          hid: 'description',
          name: 'description',
          content: '愿世间美好都能如约而至，愿我们都能变为自己期愿的样子...'
        }
      ]
    }
  }
})
</script>

<style lang="scss">
@import url('https://at.alicdn.com/t/font_2332190_ouxgc89654n.css');
@import "assets/css/pages/index.scss";
</style>
