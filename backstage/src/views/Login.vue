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
import { reactive, toRefs, getCurrentInstance } from 'vue'
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
      backLogin({ ...loginInfo }).then(res => {
        // @ts-ignore
        if (res.success) {
          // @ts-ignore
          Notify('success', 'SUCCESS', res.message)
          setStorageToken(res.data)
          // 1s 后跳转至后台管理首页
          setTimeout(() => {
            ctx.$router.push('/')
          }, 1000)
        } else {
          // @ts-ignore
          Notify('warning', 'WARNING', res.message)
        }
      }).catch(err => {
        Notify('warning', 'WARNING', err.message)
      })
    }
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
