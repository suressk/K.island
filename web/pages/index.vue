<template>
  <div class="main-page">
    <!-- <CircleLoading />
    <ColorfulLoading />
    <Loading /> -->
    <!--  封面雨幕  -->
    <div class="page-cover">
      <div class="cover-container" :width="sceneWidth" :height="sceneHeight">
        <canvas id="coverContainer" class="rain-effect" />

        <div class="cover-introduce flex-col-center" :style="{ opacity: showNav ? '0' : '1' }">
          <span class="time">{{ today }}</span>
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
      <ul class="content-list" v-if="articleList.length > 0">
        <li v-for="item in articleList" :key="item.uid" class="content-item">
          <div class="cover flex-center trans-all-03">
            <img v-if="item.cover" :src="item.cover" :alt="item.title">
          </div>
          <div class="info">
            <span class="time">{{ item.time.month }} {{ item.time.day }}, {{ item.time.year }}</span>
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

    <ThemeSwitch />
    <BackTop />
    <KFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import useIndex from './useIndex'
import LoadMore from '~/components/LoadMore.vue'
import BackTop from '~/components/BackTop/index.vue'
import KFooter from '~/components/KFooter.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import Notification from '~/components/notification'
import { plainArticleList } from '~/utils/util'
// import html2canvas from 'html2canvas'

const navList = [
  { title: 'Article', path: '/article' },
  { title: 'About Me', path: '/about' },
  { title: 'Subscription', path: '/subscription' }
]

export default defineComponent({
  name: 'Index',
  components: { LoadMore, BackTop, KFooter, ThemeSwitch },
  // // @ts-ignore
  // fetch () {
  // },
  // // merge to data: () => ({})
  // @ts-ignore
  async asyncData ({ $axios }: Context) {
    try {
      const { success, data, message } = await $axios.get('/records/list', {
        params: {
          pageNo: 1,
          pageSize: 10
        }
      })
      if (success) {
        return {
          articleList: plainArticleList(data.list),
          total: data.total
        }
      } else {
        Notification({
          type: 'warning',
          title: 'WARNING',
          message
        })
        return {
          articleList: [],
          total: 0
        }
      }
    } catch (e) {
      Notification({
        type: 'error',
        title: 'ERROR',
        message: 'Fail to get article list, please contact the website owner. Thanks ~'
      })
      return {
        articleList: [],
        total: 0
      }
    }
  },
  setup () {
    return {
      navList,
      ...useIndex()
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
          content: 'K.,K.island,blog,Mood,Mood island,web,前端,个人网站,心情记录小站,堃'
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
@import url("https://at.alicdn.com/t/font_2332190_47i24zpfh49.css");
@import "assets/css/pages/index.scss";
</style>
