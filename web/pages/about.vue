<template>
  <section class="k-about">
    <KHeader custom-title="(≖ᴗ≖)✧" />
    <div class="content">
      <h3 class="title">你好！我是 K.</h3>
      <p class="part">TEXT PART</p>
      <ul class="introduce-list">
        <li class="item">生于一九九五年 母亲河（长江）边</li>
        <li class="item">屋后尚有群山环绕，门前也有小河潺潺</li>
        <li class="item">常年佛系人生，却也偶叹人生几何</li>
        <li class="item">偶有重温经典，但无热血追捧</li>
        <li class="item">心有指点江山之意，却扰倦怠缠身之难</li>
      </ul>
      <p class="part">你好，陌生人，承蒙遇见，三生有幸~</p>
      <p class="part">佛曰：前世五百次的回眸才换得今世的擦肩而过，我用一千次回眸换得今生在你面前的驻足停留</p>
      <p class="part">茫茫人海中，人与人相遇、相知、相爱、相守是一件十分不易的事情，大家要珍惜缘分，生命的轮转就是轮回，一个人的生命只有一次！佛没说今世该如何做，但佛也算说了，因果就在轮回之中...</p>
      <div class="link-area">
        <span class="link-item">
          <i class="iconfont icon-wechat" />
        </span>
        <span class="link-item">
          <i class="iconfont icon-email" />
        </span>
        <a class="link-item" href="https://github.com/suerssk/K.island" target="_blank">
          <i class="iconfont icon-github" />
        </a>
      </div>
    </div>

    <KFooter />
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'About',
  head () {
    return {
      title: "Hi!I'm K. | K.island"
    }
  }
})
</script>

<style lang="scss">
@import "assets/css/pages/about.scss";
</style>
