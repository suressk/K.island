<template>
  <section class="login-container flex-center">
    login
    <!-- <a-button type="primary">Login</a-button>-->
  </section>
</template>

<script>
import { onMounted } from 'vue'
export default {
  name: 'Login',
  setup () {
    onMounted(() => {
      console.log('onMounted')
    })
  }
}
</script>

<style lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  color: #fff;
  font-size: 50px;
  &::before,
  &::after {
    content: "";
    position: fixed;
    width: 100%;
    height: 100%;
  }
  &::before {
    background-image: url("../assets/images/login_bg.jpg");
    background-position: center center;
    background-size: 120% 120%;
    background-repeat: no-repeat;
    z-index: -2;
  }
  &::after {
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
