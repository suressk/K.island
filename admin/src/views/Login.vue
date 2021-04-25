<template>
  <section class="login-container">
    <div class="login-form flex-col fixed-center">
      <div class="avatar flex-center">
        <img src="../assets/images/avatar.png" alt="author">
      </div>
      <div class="form-item">
        <label class="ipt-item">
          <input type="text" required v-model="username" autocomplete="off" />
          <span class="tip-label">Username</span>
          <span class="border-line"/>
        </label>
      </div>
      <div class="form-item">
        <label class="ipt-item">
          <input
            type="password"
            autocomplete="off"
            required
            v-model="password"
            @keyup.enter="handleLogin"
          />
          <span class="tip-label">Password</span>
          <span class="border-line"/>
        </label>
      </div>
      <div class="form-item">
        <button class="btn btn-primary btn-login" @click="handleLogin" type="button">SIGN IN</button>
      </div>
    </div>
    <div class="hint">Hope that all the good things will come on schedule...</div>
  </section>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import {useRouter} from 'vue-router'
import {login} from '../api/api'
import {
  successNotify,
  warningNotify,
  errorNotify,
  setCookie,
  setStorageToken,
  setStorageItem
} from '../utils/util'
import {LoginInfo, LoginResponse} from '../types'
import md5 from 'md5'
import {ACCESS_TOKEN, TOKEN_EXPIRED} from '../store/mutation-types'

export default defineComponent({
  name: "Login",
  setup() {
    const loginInfo = reactive<LoginInfo>({
      username: '',
      password: '',
    })
    const router = useRouter()

    function handleLogin() {
      if (!loginInfo.username || !loginInfo.password) {
        warningNotify('username or password is empty!')
        return
      }
      login({
        username: loginInfo.username,
        password: md5(loginInfo.password)
        // @ts-ignore
      }).then((res: LoginResponse) => {
        if (res.success) {
          successNotify(res.message)
          setStorageToken(res.data)
          setCookie(ACCESS_TOKEN, res.data.token, res.data.expireTime)
          setStorageItem(TOKEN_EXPIRED, 0)
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
