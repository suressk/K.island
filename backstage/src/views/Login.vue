<template>
  <section class="login-container flex-center">
    <div class="login-form flex-col">
      <div class="form-item">
        <label class="ipt">
          <input type="text" placeholder="Username" v-model="username" />
        </label>
      </div>
      <div class="form-item">
        <label class="ipt">
          <input type="password" placeholder="Password" v-model="password" />
        </label>
      </div>
      <div class="form-item">
        <button class="btn-login" @click="handleLogin">LOGIN</button>
      </div>
    </div>
    <div class="hint">愿所有美好都能如约而至...</div>
  </section>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue'

interface LoginInfo {
  username: string;
  password: string;
}

export default {
  name: 'Login',
  components: {},
  setup () {
    const loginInfo: LoginInfo = reactive({
      username: '',
      password: ''
    })
    function handleLogin () {
      console.log('login', loginInfo)
    }
    onMounted(() => {
      document.title = '驿站加油站 - K.island'
    })
    return {
      ...toRefs(loginInfo),
      handleLogin
    }
  }
}
</script>

<style lang="scss">
.login-container {
  font-family: Consolas, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  &::before {
    content: "";
    position: fixed;
    width: 100%;
    height: 100%;
  }
  &::before {
    background-image: url("~@/assets/images/login_bg.webp");
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -2;
  }
  //&::after {
  //  z-index: -1;
  //  background-color: rgba(0, 0, 0, 0.5);
  //}
  .login-form {
    width: 500px;
    height: 300px;
    border-radius: 10px;
    background-image: linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0, 0.1));
    backdrop-filter: blur(8px);
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
    border-top: 2px solid rgba(0, 0,0,0.5);
    border-left: 2px solid rgba(0,0,0,0.5);
    .form-item {
      margin: 30px auto;
      width: 60%;
      input {
        background-color: transparent;
        background-image: none;
        border-radius: 4px 4px 0 0;
        border: none;
        border-bottom: 2px solid #dcdfe6;
        color: #fff;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        width: 100%;
        transition: border-bottom-color .3s cubic-bezier(.645,.045,.355,1);
        &:focus {
          border-bottom-color: #00ccff;
        }
      }
      .btn-login {
        cursor: pointer;
        width: 100%;
        border: none;
        outline: none;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
        color: #fff;
        //color: transparent;
        //-webkit-background-clip: text;
        font-size: 20px;
        font-weight: 500;
        position: relative;
        background-image: linear-gradient(90deg,
          #03a9f4,
          #f441a5,
          #ffeb3b,
          #03a9f4
        );
        background-size: 400%;
        &::before {
          content: "";
          position: absolute;
          left: -5px;
          right: -5px;
          top: -5px;
          bottom: -5px;
          opacity: 0;
          transition: all 0.5s;
          background-image: linear-gradient(90deg,
            #03a9f4,
            #f441a5,
            #ffeb3b,
            #03a9f4
          );
        }
        &:hover {
          animation: bgAnimate 8s infinite linear;
        }
        &:hover::before {
          filter: blur(10px);
          opacity: 0.8;
        }
      }
    }
  }
  // hint
  .hint {
    user-select: none;
    color: #fff;
    font-size: 14px;
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    white-space: nowrap;
  }
}

// 300px
@keyframes bgAnimate {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 400%;
  }
}
</style>
