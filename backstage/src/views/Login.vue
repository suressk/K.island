<template>
  <section class="login-container flex-center">
    <form class="login-form flex-col">
      <div class="form-item">
        <label class="ipt">
          <input type="text" placeholder="Username" v-model="username" />
        </label>
      </div>
      <div class="form-item">
        <label class="ipt">
          <input type="password" :autocomplete="false"  placeholder="Password" v-model="password" />
        </label>
      </div>
      <div class="form-item">
        <button class="btn-login" @click="handleLogin" type="button">LOGIN</button>
      </div>
    </form>
    <div class="hint">愿所有美好都能如约而至...</div>
  </section>
</template>

<script lang="ts">
import { reactive, toRefs, nextTick, onMounted, getCurrentInstance } from 'vue'
import { backLogin } from '@/api/api'
import { Notify, setStorageToken } from '@/utils/util'

interface LoginInfo {
  username: string;
  password: string;
}

export default {
  name: 'Login',
  components: {},
  setup () {
    /* eslint-disable */
    // @ts-ignore
    const { ctx } = getCurrentInstance()
    const loginInfo: LoginInfo = reactive({
      username: '',
      password: ''
    })
    function handleLogin () {
      // @ts-ignore
      backLogin({ ...loginInfo }).then(res => {
        // @ts-ignore
        if (res.success) {
          // @ts-ignore
          Notify('success', 'SUCCESS', res.message)
          // @ts-ignore
          setStorageToken(res.data)
          nextTick(() => {
            ctx.$router.push('/')
          })
        } else {
          // @ts-ignore
          Notify('warning', 'WARNING', res.message)
        }
      }).catch(err => {
        // @ts-ignore
        Notify('warning', 'WARNING', err.message)
      })
    }
    onMounted(() => {
      const route = ctx.$router.currentRoute.value
      document.title = route.meta.title + ' - K.island'
    })
    return {
      ...toRefs(loginInfo),
      handleLogin
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/css/pages/login.scss";
</style>
