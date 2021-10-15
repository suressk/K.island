<template>
  <section class="k-contact">
    <KHeader />

    <div class="content">
      <h3 class="title">✨&nbsp;&nbsp;你好！我是 小K.</h3>
      <p class="part">PART 1 《小思》</p>
      <ul class="introduce-list">
        <li class="item">秋风拂面过，不识人间疾</li>
        <li class="item">喧嚣的城市，繁华的街道</li>
        <li class="item">皆与你无关而已</li>
        <li class="item">人来人往的街道，霓虹闪烁的高楼</li>
        <li class="item">恰似水中花、镜中月一般</li>
        <li class="item">只是因为万家灯火没有一处属于你罢了</li>
      </ul>
      <p class="part">PART 2 《孤独》</p>
      <ul class="introduce-list">
        <li class="item">每个人都只能陪你走一段路，迟早都是要分开的，只是时间早晚而已</li>
        <!-- <li class="item">18 岁，孤独是为了拥抱一个人，哭着拥抱了整个班</li> -->
        <li class="item">20 岁，孤独是从此故乡只有冬夏，再无春秋</li>
        <li class="item">24 岁，孤独是独自的承受和自我的治愈</li>
        <li class="item">25 岁，孤独是陌生的城市和拥挤的地铁</li>
        <li class="item">30 岁，孤独是逝去的年华和父母的白发</li>
      </ul>
      <p class="part">坦然地面对孤独带来的伤感和难过，可能是对成熟的认知吧</p>
      <p class="part">PART 3</p>
      <p class="part">你好，陌生人，承蒙遇见，三生有幸~</p>
      <p class="part">佛曰：前世五百次的回眸才换得今世的擦肩而过。前世的我做了什么，才能换得今生的你在此驻足停留？！</p>
      <p class="part">
        茫茫人海中，人与人相遇、相知乃至相爱、相守是皆是十分不易的事情，
        希望大家能够珍惜缘分，生命的轮转就是轮回，一个人的生命只有一次！
        佛没说今世该如何做，但佛也算说了，因果就在轮回之中...
      </p>
      <p class="part">仅愿你，能遇良人；在我看不到的地方 [安然无恙]。如此，便好&nbsp;&nbsp;♥️</p>

      <div class="link-area">
        <span class="link-item">
          <i class="iconfont icon-wechat" />
          <span class="k-popover flex-center">
            <img src="~@/static/images/wechat.webp" alt="K's wechat" />
          </span>
        </span>
        <span class="link-item">
          <i class="iconfont icon-email" />
          <span class="k-popover flex-col-start">
            <span class="txt-overflow">🍻&nbsp;&nbsp;{{ AuthorInfo.qq }}</span>
            <span class="txt-overflow">🍸&nbsp;&nbsp;{{ AuthorInfo.outlook }}</span>
          </span>
        </span>
        <a class="link-item" href="https://github.com/suressk/K.island" target="_blank">
          <i class="iconfont icon-github" />
          <span class="k-popover d-flex">
            <span class="txt-overflow">🤞&nbsp;&nbsp;去点个 star 叭 ~</span>
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
  name: 'Contact',
  components: { KHeader, ThemeSwitch },
  setup() {
    return {
      AuthorInfo
    }
  },
  head() {
    return {
      title: "你好！我是 小K. | K.island"
    }
  }
})
</script>

<style lang="scss">
@import "assets/css/pages/contact.scss";
</style>
