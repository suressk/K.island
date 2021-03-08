<template>
  <section class="login-container flex-center">
    <form class="login-form flex-col">
      <div class="form-item">
        <label class="ipt-item">
          <input type="text" required v-model="username" />
          <span class="tip-label trans-all-05">Username</span>
          <span class="border-line" />
        </label>
      </div>
      <div class="form-item">
        <label class="ipt-item">
          <input
            type="password"
            :autocomplete="false"
            required
            v-model="password"
            @keyup.enter="handleLogin"
          />
          <span class="tip-label trans-all-05">Password</span>
          <span class="border-line" />
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
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import md5 from 'md5'
import { login } from '@/api/api'
import { Notify, setStorageToken, setCookie } from '@/utils/util'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { LoginInfo, LoginResponse } from '@/@types'

export default {
  name: 'Login',
  setup () {
    const useRouterInstance = useRouter()
    const loginInfo: LoginInfo = reactive({
      username: '',
      password: ''
    })
    function handleLogin () {
      login({
        username: loginInfo.username,
        password: md5(loginInfo.password)
        /* eslint-disable */
        // @ts-ignore
      }).then((res: LoginResponse) => {
        // @ts-ignore
        if (res.success) {
          // @ts-ignore
          Notify('success', 'SUCCESS', res.message)
          setStorageToken(res.data)
          setCookie(ACCESS_TOKEN, res.data.token, res.data.expireTime)
          // 1s 后跳转至后台管理首页
          setTimeout(() => {
            useRouterInstance.push('/')
          }, 500)
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
