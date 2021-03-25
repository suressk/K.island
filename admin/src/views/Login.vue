<template>
  <div class="login-container">
    <form class="login-form flex-col fixed-center">
      <div class="avatar flex-center">
        <img src="../assets/images/avatar.png" alt="author">
      </div>
      <div class="form-item">
        <label class="ipt-item">
          <input type="text" required v-model="username"/>
          <span class="tip-label">Username</span>
          <span class="border-line"/>
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
          <span class="tip-label">Password</span>
          <span class="border-line"/>
        </label>
      </div>
      <div class="form-item">
        <button class="btn-login" @click="handleLogin" type="button">SIGN IN</button>
      </div>
    </form>
    <div class="hint">愿所有美好都能如约而至...</div>
  </div>
</template>

<script lang="ts">
import {LoginInfo, LoginResponse} from '../types'
import {ACCESS_TOKEN} from '../store/mutation-types'
import {defineComponent, reactive, toRefs} from 'vue'
import {useRouter} from 'vue-router'
import {login} from '../api/api'
import md5 from 'md5'
import {
  successNotify,
  warningNotify,
  errorNotify,
  setCookie,
  setStorageToken
} from '../utils/util'

export default defineComponent({
  name: "Login",
  setup() {
    const loginInfo = reactive<LoginInfo>({
      username: '',
      password: '',
    })
    const router = useRouter()

    function handleLogin() {
      login({
        username: loginInfo.username,
        password: md5(loginInfo.password)
        // @ts-ignore
      }).then((res: LoginResponse) => {
        if (res.success) {
          successNotify(res.message)
          setStorageToken(res.data)
          setCookie(ACCESS_TOKEN, res.data.token, res.data.expireTime)
          setTimeout(() => {
            router.push('/')
          }, 500)
        } else {
          warningNotify(res.message)
        }
      }).catch(err => {
        errorNotify(err.message)
      })
    }

    return {
      ...toRefs(loginInfo),
      handleLogin
    }
  }
})
</script>

<style lang="scss">
@import "../assets/css/login.scss";
</style>
