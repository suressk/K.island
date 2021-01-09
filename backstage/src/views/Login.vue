<template>
  <section class="login-container flex-center">
    <form class="login-form flex-col">
      <div class="form-item">
        <label class="ipt-item">
          <input type="text" required v-model="username" />
          <span class="tip-label trans-all-05">Username</span>
          <span class="border-line"></span>
        </label>
      </div>
      <div class="form-item">
        <label class="ipt-item">
          <input type="password" :autocomplete="false" required v-model="password" />
          <span class="tip-label trans-all-05">Password</span>
          <span class="border-line"></span>
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
import { ComponentInternalInstance } from '@vue/runtime-core'
import md5 from 'md5'
import { login } from '@/api/api'
import { Notify, setStorageToken, setCookie } from '@/utils/util'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { LoginInfo } from '@/@types'
// import { AxiosResponse } from 'axios', ResponseData

export default {
  name: 'Login',
  setup () {
    /* eslint-disable */
    // @ts-ignore
    const { ctx }: ComponentInternalInstance = getCurrentInstance!()
    const loginInfo: LoginInfo = reactive({
      username: '',
      password: ''
    })
    function handleLogin () {
      login({
        username: loginInfo.username,
        password: md5(loginInfo.password)
      }).then(res => {
        // @ts-ignore
        if (res.success) {
          // @ts-ignore
          Notify('success', 'SUCCESS', res.message)
          setStorageToken(res.data)
          setCookie(ACCESS_TOKEN, res.data.token, res.data.expireTime)
          // 1s 后跳转至后台管理首页
          setTimeout(() => {
            ctx.$router.push('/')
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
