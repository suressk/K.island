<template>
  <section class="login-container">
    <div class="login-container-bg" />
    <div class="login-container-bg" />
    <div class="login-container-bg" />
    <div class="login-form flex-col fixed-center">
      <span class="circle" />
      <span class="circle" />
      <span class="circle" />
      <span class="circle" />
      <span class="circle" />
      <div class="form-item login-header d-flex">
        <span class="avatar flex-center">
          <img src="../assets/images/avatar.png" alt="author" />
        </span>
        <h1 class="island">K.island</h1>
      </div>
      <div class="form-item">
        <label class="ipt-item">
          <input type="text" required v-model="username" autocomplete="off" />
          <span class="tip-label">Username</span>
          <span class="border-line" />
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
          <span class="border-line" />
        </label>
      </div>
      <div class="form-item">
        <button
          class="btn btn-primary btn-login"
          :disabled="disabled"
          @click="handleLogin"
          type="button"
        >GO</button>
      </div>
    </div>
    <div class="hint">Hope that all the good things will come on schedule...</div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../api/api'
import {
  successNotify,
  warningNotify,
  errorNotify,
  setStorageToken,
  setStorageItem
} from '../utils/util'
import { LoginInfo, LoginResponse } from '../types'
import { TOKEN_EXPIRED } from '../store/mutation-types'
import md5 from 'md5'

export default defineComponent({
  name: "Login",
  setup() {
    const loginInfo = reactive<LoginInfo>({
      username: '',
      password: '',
    })
    const router = useRouter()

    const disabled = computed(() => (!loginInfo.username || !loginInfo.password))

    async function handleLogin() {
      if (!loginInfo.username || !loginInfo.password) {
        warningNotify('username or password is empty!')
        return
      }
      try {
        // 登录请求
        // @ts-ignore
        const { success, data, message }: LoginResponse = await login({
          username: loginInfo.username,
          password: md5(loginInfo.password)
        })

        if (success) {
          successNotify(message)
          setStorageToken(data)
          setStorageItem(TOKEN_EXPIRED, 0)
          router.push('/')
        } else {
          warningNotify(message)
        }
      } catch (error) {
        errorNotify(error?.message ?? 'Login Failed...')
      }
    }

    return {
      ...toRefs(loginInfo),
      disabled,
      handleLogin
    }
  }
})
</script>

<style lang="scss">
@import "../assets/css/login.scss";
</style>
