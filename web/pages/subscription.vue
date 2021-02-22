<template>
  <section class="subscription">
    <KHeader custom-title="(≖ᴗ≖)✧" />

    <div class="main-content flex-col scroller-light">
      <h2 class="tip-title flex-center">[ 沉舟侧畔千帆过，病树前头万木春 ]</h2>
      <div class="subscription-form">
        <h3 class="subscription-title">会当凌绝顶，一览众山小</h3>
        <p class="subscription-txt">
          茫茫人海中，人与人相遇、相知、相爱、相守是一件十分不易的事情，大家要珍惜缘分，生命的轮转就是轮回，一个人的生命只有一次！<br>佛没说今世该如何做，但佛也算说了，因果就在轮回之中...
        </p>
        <div class="d-flex" style="margin-top: 40px">
          <label class="subscription-inp">
            <input type="text" placeholder="Enter your Email" v-model="email">
          </label>
          <button class="subscription-btn">Subscribe</button>
        </div>
      </div>
    </div>
    <KWave />
  </section>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'subscription',
  setup() {
    const email = ref('')

    return {
      email
    }
  },
  head() {
    return {
      title: '订阅文章通知 | K.island'
    }
  }
})
</script>

<style lang="scss">
@import "assets/css/pages/subscription.scss";
</style>
