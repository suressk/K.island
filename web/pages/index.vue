<template>
  <div class='main-page'>
    <!--  封面雨幕  -->
    <div class='page-cover'>
      <div class='cover-container' :width='sceneWidth' :height='sceneHeight'>
        <canvas id='coverContainer' class='rain-effect' />

        <div class='cover-introduce flex-col-center' :style="{ opacity: showNav ? '0' : '1' }">
          <span class='time'>{{ today }}</span>
          <span class='title txt-overflow'>要么孤独，要么庸俗</span>
          <span class='introduce'>人生不过二两酒，一两心酸一两愁。昨日心酸酿成酒，苦酒入喉今日愁。浮生溺毙杯中物，今日不做明日愁...</span>
        </div>
      </div>
      <!--   头部菜单按钮   -->
      <div class='head-bar flex-between'>
        <span class='logo trans-all-03 flex-center' :class="{ 'nav-show': showNav }">
          <img src='~@/static/images/logo.svg' alt='logo'>
          K.island
        </span>
        <span class='menu-btn flex-center' @click='handleToggleNav'>
          <i class='iconfont icon-menu' />
        </span>
      </div>
      <!--   导航菜单   -->
      <div class='nav flex-center' :class="{ 'is-show': showNav }">
        <nuxt-link
          v-for='nav in navList'
          :key='nav.title'
          :to='nav.path'
          class='nav-item'
        >
          {{ nav.title }}
        </nuxt-link>
        <!--<a href='https://github.com/suressk' target='_blank' class='nav-item'>GitHub</a>-->
        <div class='tip'>
          Everywhere in the world has a similar life.
        </div>
      </div>
    </div>
    <!--  文章列表 content  -->
    <div class='content'>
      <ul class='content-list' v-if='articleList.length > 0'>
        <li
          v-for='item in articleList'
          :key='item.uid'
          class='content-item'
          @click='handleToDetail(item)'
        >
          <div class='cover flex-center'>
            <img
              v-lazy='item.cover'
              src='~@/static/images/sunny.webp'
              :alt='item.title'
            >
          </div>
          <div class='info'>
            <span class='time'>{{ item.time.month }} {{ item.time.day }}, {{ item.time.year }}</span>
            <span class='title two-line-txt'>{{ item.title }}</span>
            <span class='introduce three-line-txt'>{{ item.introduce }}</span>
            <div class='suffix d-flex'>
              <span class='views d-flex'>
                <i class='iconfont icon-view' />
                {{ item.views }}
              </span>
              <span class='tag d-flex'>
                <i class='iconfont icon-tag' />
                {{ item.tag }}
              </span>
            </div>
          </div>
        </li>
      </ul>

      <LoadMore :load-status='loadStatus' @load-more='handleLoadMore' />
    </div>

    <ThemeSwitch />
    <BackTop />
    <KFooter />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import useIndex from './useIndex'
import LoadMore from '~/components/LoadMore.vue'
import BackTop from '~/components/BackTop/index.vue'
import KFooter from '~/components/KFooter.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import { commitMutations } from '~/utils/util'
import {
  CURRENT_PAGE,
  NO_MORE,
  M_RESET_LOAD_MORE,
  M_SET_CURRENT_PAGE,
  M_SET_LOAD_STATUS,
  M_SET_TOTAL_ITEMS, LOAD_MORE
} from '~/store/mutation-types'

const navList = [
  { title: 'Article', path: '/article' },
  { title: 'Subscription', path: '/subscription' },
  { title: 'Contact Me', path: '/contact' },
  { title: 'Messages', path: '/messages' }
]

export default defineComponent({
  name: 'Index',
  components: { LoadMore, BackTop, KFooter, ThemeSwitch },
  // @ts-ignore
  async asyncData({ $axios, store }: Context) {
    try {
      const { success, data } = await $axios.get('/record/list', {
        params: {
          pageNo: 1,
          pageSize: 10,
          index: 1
        }
      })
      if (success) {
        const { total, list } = data
        commitMutations(store, M_SET_TOTAL_ITEMS, total)
        // 还有更多文章（不是最后一页）
        if (list.length < total) {
          commitMutations(store, M_SET_CURRENT_PAGE, store.state[CURRENT_PAGE] + 1)
          commitMutations(store, M_SET_LOAD_STATUS, LOAD_MORE)
        } else {
          commitMutations(store, M_SET_LOAD_STATUS, NO_MORE)
        }
        return {
          articleList: list
        }
      } else {
        return {
          articleList: []
        }
      }
    } catch (e) {
      return {
        articleList: []
      }
    }
  },
  setup() {
    return {
      navList,
      ...useIndex()
    }
  },
  // @ts-ignore
  beforeRouteLeave(to, from, next) {
    commitMutations(this.$store, M_RESET_LOAD_MORE)
    next()
  },
  head() {
    return {
      title: 'K.island',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'K.,K.island,Blog,Mood,Mood island,web,前端,个人网站,心情记录小栈,堃'
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

<style lang='scss'>
@import "assets/font/iconfont.css";
@import "assets/css/pages/index.scss";
</style>
