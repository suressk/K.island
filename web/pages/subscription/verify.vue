<template>
  <section class="verify-subscription">
    <KHeader custom-title="(≖ᴗ≖)✧" />

    <div class="content">
      <div class="verify-form absolute-center">
        <div class="modal-avatar flex-center">
          <img src="~~/static/images/avatar.png" alt="K.">
        </div>

        <div class="verify-item d-flex">
          <span>Email</span>
          <label>
            <input type="text" placeholder="Enter your email..." v-model="email" />
          </label>
        </div>

        <div class="verify-item d-flex">
          <span>Code</span>
          <label>
            <input type="text" placeholder="Enter the verify code..." v-model="code" />
          </label>
        </div>
      </div>
    </div>

    <ThemeSwitch />
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'

function parseSearch () {
  const searchStr = decodeURIComponent(location.search)
  if (searchStr) {
    const obj: any = {}
    const searchArr = searchStr.slice(1).split('&')
    searchArr.forEach(item => {
      const resArr = item.split('=')
      obj[resArr[0]] = resArr[1]
    })
    return obj
  }
  return {}
}

export default defineComponent({
  name: 'verify',
  components: { KHeader, ThemeSwitch },
  setup() {
    const email = ref<string>('')
    const code = ref<string>('')

    onMounted(() => {
      const params = parseSearch()
      email.value = params.email
    })
    return {
      email,
      code
    }
  }
})
</script>

<style lang="scss">
.verify-subscription {
  .verify-form {
    width: 90%;
    height: 350px;
    //box-shadow: 0 0 10px var(--opacity-cyan-3);
    background-color: var(--white);
    border-radius: 10px;
    padding: 3vw 0;
    .avatar {
      width: 6vw;
      height: 6vw;
      position: absolute;
      top: -3vw;
      left: 0;
      border-radius: 50%;
    }
    .verify-item {
      margin: 20px auto;
      border: 1px solid var(--border);
      padding: 10px;
    }
  }
}
</style>
