<template>
  <div class="main-page">
    <!-- <CircleLoading />
    <ColorfulLoading />
    <Loading /> -->
    <!--  封面雨幕  -->
    <div class="page-cover">
      <div class="cover-container" :width="sceneWidth" :height="sceneHeight">
        <canvas id="coverContainer" class="rain-effect" />

        <div class="cover-introduce flex-col" :style="{ opacity: showNav ? '0' : '1' }">
          <span class="time">{{ curTime }}</span>
          <span class="title txt-overflow">要么孤独，要么庸俗</span>
          <span class="introduce">人生不过二两酒，一两心酸一两愁。昨日心酸酿成酒，苦酒入喉今日愁。浮生溺毙杯中物，今日不做明日愁...</span>
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
      <!--<div class="mask" />-->
    </div>
    <!--  文章列表 content  -->
    <div class="content">
      <ul class="content-list" v-if="info && info.length > 0">
        <li v-for="item in info" :key="item.uid" class="content-item">
          <div class="cover flex-center trans-all-03">
            <img v-if="item.cover" :src="item.cover" :alt="item.title">
          </div>
          <div class="info">
            <span class="time">{{ item.time }}</span>
            <span class="title two-line-txt">{{ item.title }}</span>
            <span class="introduce three-line-txt">{{ item.introduce }}</span>
            <div class="suffix d-flex">
              <span class="r-hover views d-flex">
                <i class="iconfont icon-view" />
                {{ item.views }}
              </span>
              <span class="g-hover tag d-flex">
                <i class="iconfont icon-tag" />
                {{ item.tag }}
              </span>
            </div>
          </div>
        </li>
      </ul>
      <LoadMore :load-status="loadStatus" @load-more="handleLoadMore" />
    </div>

    <BackTop />
    <KFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useIndex from './useIndex'
import LoadMore from '~/components/LoadMore.vue'
import BackTop from '~/components/BackTop/index.vue'
import KFooter from '~/components/KFooter.vue'
import notification from '~/components/notification'
// import html2canvas from 'html2canvas'

const navList = [
  { title: 'Article', path: '/article' },
  { title: 'About Me', path: '/about' },
  { title: 'Subscription', path: '/subscription' }
]

export default defineComponent({
  name: 'Index',
  components: { LoadMore, BackTop, KFooter },
  // // @ts-ignore
  // fetch () {
  // },
  // // merge to data: () => ({})
  // @ts-ignore
  async asyncData ({ $axios }) {
    // 测试 axios
    const { success, data, message } = await $axios.get('/records/list', {
    // const res = await $axios.get('/records/list', {
      params: {
        pageNo: 1,
        pageSize: 10
      }
    })
    // console.log('RESPONSE ===== ', res);
    if (success) {
      notification({
        type: 'success',
        title: 'SUCCESS',
        message
      })
      return {
        info: data.list
      }
    } else {
      console.log(message)
    }
  },
  setup () {
    return {
      navList,
      ...useIndex(),
      // info: []
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
@import url("https://at.alicdn.com/t/font_2332190_mgbefmywrv7.css");
@import "assets/css/pages/index.scss";
</style>
