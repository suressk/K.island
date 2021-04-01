<template>
  <section class="verify-subscription">
    <KHeader custom-title="(≖ᴗ≖)✧" />

    <div class="content">
      <div class="verify-form absolute-center">
        <div class="modal-avatar flex-center">
          <img src="~~/static/images/avatar.png" alt="K.">
        </div>

        <div class="verify-item d-flex">
          <span class="inp-tag">Email</span>
          <label>
            <input type="text" placeholder="Enter your email..." v-model="email" />
          </label>
        </div>

        <div class="verify-item d-flex">
          <span class="inp-tag">Code</span>
          <label>
            <input type="text" placeholder="Enter the verify code..." v-model="code" />
          </label>
        </div>
        <div class="btn-container">
          <button
            class="btn btn-primary"
            :disabled="notAllowed"
            @click="handleVerifyCode"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>

    <ThemeSwitch />
  </section>
</template>

<script lang="ts">
import { ref, computed, getCurrentInstance, defineComponent, onMounted } from '@nuxtjs/composition-api'
import { checkIsEmail } from '~/utils/util'
import notify from '~/components/notification'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'

function parseSearch () {
  const searchStr = decodeURIComponent(location.search)
  if (searchStr) {
    const obj: any = {}
    const searchArr = searchStr.slice(1).split('&')
    searchArr.forEach(item => {
      const resArr = item.split('=')
      obj[resArr[0]] = resArr[1]
    })
    return obj
  }
  return {}
}

export default defineComponent({
  name: 'verify',
  components: { KHeader, ThemeSwitch },
  setup() {
    const { proxy } = getCurrentInstance()!
    const email = ref<string>('')
    const code = ref<string>('')

    const notAllowed = computed(() => {
      return ((code.value.length === 0) || (email.value.length === 0))
    })

    function handleVerifyCode () {
      // 邮箱格式不对
      if (!checkIsEmail(email.value)) {
        notify({
          type: 'warning',
          title: 'Attention~',
          message: '邮箱格式好像不太对吼~'
        })
        return
      }
      // @ts-ignore
      proxy.$axios.post('/subscribe/verify', {
        email: email.value,
        code: code.value
      }).then((res: any) => {
        if (res.success) {
          notify({
            type: 'success',
            title: 'Congratulations~',
            message: res.message
          })
          setTimeout(() => {
            proxy.$router.push('/')
          }, 500)
        } else {
          notify({
            type: 'warning',
            title: 'Sorry~',
            message: res.message
          })
        }
      }).catch((err: any) => {
        notify({
          type: 'error',
          title: 'Something Wrong~',
          message: err.message
        })
      })
    }

    onMounted(() => {
      const params = parseSearch()
      email.value = params.email
    })
    return {
      email,
      code,
      notAllowed,
      handleVerifyCode
    }
  }
})
</script>

<style lang="scss">
.verify-subscription {
  .verify-form {
    width: 90%;
    max-width: 600px;
    height: 350px;
    background-color: var(--white);
    border-radius: 10px;
    padding: 50px 0 10px;
    .modal-avatar {
      position: absolute;
      top: -50px;
      left: 0;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    }
    .verify-item {
      box-shadow: 0 0 10px rgba(0, 0, 0, .2);
      margin: 50px 20px 0;
      border: 1px solid var(--border);
      border-radius: 5px;
      padding: 10px;
      height: 50px;
      width: calc(100% - 40px);
      .inp-tag {
        display: inline-block;
        width: 60px;
        text-align: right;
        padding-right: 10px;
        border-right: 1px solid var(--border);
      }
      label {
        height: 100%;
        width: calc(100% - 65px);
        padding: 0 10px;
        input {
          height: 100%;
          width: 100%;
          background-color: transparent;
          border: none;
          //display: inline-block;
          outline: none;
          color: var(--ink);
        }
      }
    }
    .btn-container {
      margin: 50px 20px 0;
      text-align: right;
      .btn {
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
      }
    }
  }
}
</style>
