<template>
  <div class="main-page">
    <!-- <CircleLoading /> -->
    <!-- <colorful-loading /> -->
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
      <LoadMore class="more" />
    </div>

    <button @click="handleNotify">
      TEST
    </button>

    <BackToTop />
    <KFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import Parallax from 'parallax-js'
import ColorfulLoading from '../components/ColorfulLoading.vue'
import {
  defineComponent,
  ref,
  onMounted,
  // computed,
  // watch,
  // getCurrentInstance,
  // PropType
} from '@nuxtjs/composition-api'
import useIndex from './useIndex'

const navList = [
  { title: 'Article', path: '/article' },
  { title: 'About Me', path: '/about' }
]

interface IStyleOption {
  [prop: string]: string;
}

let layerStyle: IStyleOption = {}
let coverStyle: IStyleOption = {}

export default defineComponent({
  components: { ColorfulLoading },
  setup () {

    return {
      navList,
      ...useIndex(),
      info: []
    }
  },
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

// export default Vue.extend({
//   components: { ColorfulLoading },
//   // commit / dispatch => store
//   // fetch ({ $axios }) {
//   // },
//   // merge to data: () => ({})
//   // @ts-ignore
//   // async asyncData ({ $axios }) {
//   //   // 测试 axios
//   //   // const { success, data, message } = await $axios.get('/records/list', {
//   //   const res = await $axios.get('/records/list', {
//   //     params: {
//   //       pageNo: 1,
//   //       pageSize: 10
//   //     }
//   //   })
//   //   console.log('RESPONSE ===== ', res);
//   //   // if (success) {
//   //   //   this.$notification({
//   //   //     type: 'success',
//   //   //     title: 'SUCCESS',
//   //   //     message
//   //   //   })
//   //   //   return {
//   //   //     info: data.list
//   //   //   }
//   //   // } else {
//   //   //   console.log(message)
//   //   // }
//   // },
//   data () {
//     return {
//       navList,
//       showNav: false,
//       sceneHeight: '100%',
//       sceneWidth: '100%',
//       layerStyle,
//       coverStyle,
//       info: []
//     }
//   },
//   mounted () {
//     this.init()
//     new Parallax(document.getElementById('scene'), {
//       relativeInput: true,
//       clipRelativeInput: true
//     })
//   },
//   // @ts-ignore
//   beforeRouteEnter (to: any, from: any, next: any): void {
//     next((vm: { init: () => void }) => {
//       vm.init()
//       window.onresize = () => vm.init()
//     })
//   },
//   beforeRouteLeave (to, from, next) {
//     window.onresize = null
//     next()
//   },
//   methods: {
//     init () {
//       this.sceneHeight = document.documentElement.clientHeight + 'px'
//       this.sceneWidth = document.documentElement.clientWidth + 'px'
//       this.coverLayer()
//     },
//     handleToggleNav () {
//       this.showNav = !this.showNav
//     },
//     coverLayer () {
//       const sceneWidth = parseInt(this.sceneWidth)
//       const sceneHeight = parseInt(this.sceneHeight)
//       const e = (sceneWidth > 1000 || sceneHeight > 1000) ? 1000 : 500
//       let x, y, i
//       if (sceneWidth >= sceneHeight) {
//         i = sceneWidth / e * 50
//         y = i
//         x = i * sceneWidth / sceneHeight
//       } else {
//         i = sceneHeight / e * 50
//         x = i
//         y = i * sceneHeight / sceneWidth
//       }
//       const style = {
//         width: sceneWidth + x + 'px',
//         height: sceneHeight + y + 'px',
//         marginLeft: -0.5 * x + 'px',
//         marginTop: -0.5 * y + 'px'
//       }
//       this.layerStyle = { ...this.layerStyle, ...style }
//       this.coverImg()
//     },
//     coverImg () {
//       const width = parseInt(this.layerStyle.width)
//       const height = parseInt(this.layerStyle.height)
//       const scale = 1080 / 1920
//       const style: IStyleOption = {}
//       // const style = {}
//       const compute = height / width > scale
//       style.width = compute ? `${height / scale}px` : `${width}px`
//       style.height = compute ? `${height}px` : `${width * scale}px`
//       style.left = (width - parseInt(style.width)) / 2 + 'px'
//       style.top = (height - parseInt(style.height)) / 2 + 'px'
//       this.coverStyle = { ...this.coverStyle, ...style }
//     },
//     handleNotify () {
//       // this.$notify({
//       //   type: 'success',
//       //   title: '测试',
//       //   message: 'Just test the notify methods'
//       // })
//       this.$notification({
//         type: 'error',
//         title: '测试',
//         message: 'Just test the notify methods'
//       })
      
//     }
//   },
//   head () {
//     return {
//       title: 'K.island',
//       meta: [
//         {
//           hid: 'keywords',
//           name: 'keywords',
//           content: 'K.,K.island,blog,mood island,web,前端,个人网站,心情记录小站,堃'
//         },
//         {
//           hid: 'description',
//           name: 'description',
//           content: '愿世间美好都能如约而至，愿我们都能变为自己期愿的样子...'
//         }
//       ]
//     }
//   }
// })
</script>

<style lang="scss">
@import url('https://at.alicdn.com/t/font_2332190_7zmx9vl8cra.css');
@import "assets/css/pages/index.scss";
</style>
