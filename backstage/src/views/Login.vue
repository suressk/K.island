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
        <button class="btn-login" @click="handleLogin">LOGIN</button>
      </div>
    </form>
    <div class="hint">愿所有美好都能如约而至...</div>
  </section>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, getCurrentInstance } from 'vue'

interface LoginInfo {
  username: string;
  password: string;
}

export default {
  name: 'Login',
  components: {},
  setup () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { ctx } = getCurrentInstance()
    const loginInfo: LoginInfo = reactive({
      username: '',
      password: ''
    })
    function handleLogin () {
      console.log('login', loginInfo)
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
