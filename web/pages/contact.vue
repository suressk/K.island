<template>
  <section class="k-contact">
    <KHeader />
    <div class="content">
      <h3 class="title">你好！我是 K.</h3>
      <p class="part">PART 1 《About Me》</p>
      <ul class="introduce-list">
        <li class="item">脚踩 95 后边缘的小 K.</li>
        <li class="item">家居巴蜀之旁，毗邻三峡之坝</li>
        <li class="item">屋后尚有群山环绕，门前也有小河潺潺</li>
        <li class="item">常年佛系人生，却也偶叹人生几何</li>
        <li class="item">偶有重温经典，但无热血追捧</li>
        <li class="item">心有指点江山之意，却扰倦怠缠身之难</li>
      </ul>
      <p class="part">PART 2 《酒与愁》</p>
      <ul class="introduce-list">
        <li class="item">人生不过二两酒，一两心酸一两愁</li>
        <li class="item">昨日心酸酿成酒，苦酒入喉今日愁</li>
        <li class="item">浮生溺毙杯中物，今日不做明日愁</li>
      </ul>
      <p class="part">你好，陌生人，承蒙遇见，三生有幸~</p>
      <p class="part">佛曰：前世五百次的回眸才换得今世的擦肩而过。前世的我莫不是用了千百次的回眸才能换得今生的你在此驻足停留？！哈哈哈~</p>
      <p class="part">茫茫人海中，人与人相遇、相知乃至相爱、相守是皆是十分不易的事情，希望大家能够珍惜缘分，生命的轮转就是轮回，一个人的生命只有一次！佛没说今世该如何做，但佛也算说了，因果就在轮回之中...</p>
      <div class="link-area">
        <span class="link-item">
          <i class="iconfont icon-wechat" />
          <span class="k-popover flex-center">
            <img src="~@/static/images/wechat.webp" alt="K's wechat">
          </span>
        </span>
        <span class="link-item">
          <i class="iconfont icon-email" />
          <span class="k-popover flex-col-start">
            <span class="txt-overflow">🍻{{ AuthorInfo.qq }}</span>
            <span class="txt-overflow">🍸{{ AuthorInfo.outlook }}</span>
            <!--<span class="txt-overflow">🥂{{ AuthorInfo.gmail }}</span>-->
          </span>
        </span>
        <a class="link-item" href="https://github.com/suerssk/K.island" target="_blank">
          <i class="iconfont icon-github" />
          <span class="k-popover flex-col-start">
            <span class="txt-overflow">🤞 去点个 star 叭 ~</span>
          </span>
        </a>
      </div>
    </div>

    <ThemeSwitch />
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AuthorInfo } from '~/store/mutation-types'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'

export default defineComponent({
  name: 'About',
  components: { KHeader, ThemeSwitch },
  setup() {
    return {
      AuthorInfo
    }
  },
  head () {
    return {
      title: "Hi!I'm K. | K.island"
    }
  }
})
</script>

<style lang="scss">
@import "assets/css/pages/contact.scss";
</style>
