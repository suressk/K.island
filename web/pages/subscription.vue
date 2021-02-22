<template>
  <section class="subscription">
    <KHeader custom-title="(≖ᴗ≖)✧" />

    <div class="main-content flex-col scroller-light">
      <h2 class="tip-title flex-center">[ 人生如逆旅，我亦是行人 ]</h2>
      <div class="subscription-form">
        <h3 class="subscription-title">浮生如梦，为欢几何？</h3>
        <p class="subscription-txt">
          佛曰：前世五百次的回眸才换得今世的擦肩而过。
        </p>
        <p class="subscription-txt">
          茫茫人海中，人与人的相遇、相知皆是一件十分不易的事情，珍惜缘分，一个人的生命只有一次，莫要等到失去之后才去后悔！而那时，那个人或许已经不再具有之前的勇气与豪情壮志了
        </p>
        <p class="subscription-txt">
          佛曰：世间所有的相遇皆因缘起。你我，亦是如此...
        </p>
        <div class="d-flex" style="margin-top: 40px">
          <label class="subscription-inp">
            <input type="text" placeholder="Enter your Email" @blur="handleCheckEmail" v-model="email">
            <span v-show="!isEmail" class="warning-tip">邮箱格式好像不对呢 ~</span>
          </label>
          <button class="subscription-btn btn" @click="handleSubscribe">
            Subscribe
            <span class="empty-tip" :class="{ show: emptyEmail }">邮箱为空哦~，是不是忘记填啦？</span>
          </button>
        </div>
      </div>

      <KWave />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { checkEmail } from '~/utils/util'

export default defineComponent({
  name: 'subscription',
  setup() {
    const email = ref<string>('')
    const isEmail = ref<boolean>(true)
    const emptyEmail = ref<boolean>(false)
    let timer: number

    function handleCheckEmail () {
      email.value = email.value.trim()
      // email 为空
      if (email.value === '') {
        isEmail.value = true // 不提示邮箱格式错误
        return
      }
      isEmail.value = checkEmail(email.value)
    }

    function handleSubscribe () {
      // email 为空
      if (email.value === '') {
        emptyEmail.value = true
        if (timer) clearTimeout(timer)
        timer = window.setTimeout(() => {
          emptyEmail.value = false
        }, 3000)
      }
      // email 格式正确
      if (isEmail.value && email.value !== '') {
        console.log('订阅')
      }
    }

    return {
      email,
      isEmail,
      emptyEmail,
      handleCheckEmail,
      handleSubscribe
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
