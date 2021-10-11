<template>
  <section class="verify-subscription">
    <KHeader />

    <div class="content">
      <div class="verify-form absolute-center">
        <div class="modal-avatar flex-center">
          <img src="~~/static/images/avatar.png" alt="K." />
        </div>

        <div class="verify-item d-flex">
          <span class="inp-tag">Name</span>
          <label>
            <input type="text" placeholder="Enter your nickname..." v-model="name" />
          </label>
        </div>

        <div class="verify-item d-flex">
          <span class="inp-tag">Code</span>
          <label>
            <input type="text" placeholder="Enter the verification code..." v-model="code" />
          </label>
        </div>
        <div class="btn-container">
          <button class="btn btn-primary" :disabled="disabled" @click="handleVerifyCode">SUBMIT</button>
        </div>
      </div>
    </div>

    <ThemeSwitch />
  </section>
</template>

<script lang='ts'>
import { ref, computed, getCurrentInstance, defineComponent, onMounted } from '@nuxtjs/composition-api'
import { parseLocationSearch, successNotify, warnNotify, errorNotify } from '~/utils/util'
import KHeader from '~/components/KHeader/index.vue'
import ThemeSwitch from '~/components/ThemeSwitch/index.vue'
import { DEFAULT_ERROR_TIP } from '~/utils'

export default defineComponent({
  name: 'verify',
  components: { KHeader, ThemeSwitch },
  setup() {
    const vm = getCurrentInstance()!.proxy
    const email = ref<string>('')
    const name = ref<string>('')
    const code = ref<string>('')

    const disabled = computed(() => ((!code.value) || (!email.value) || (!name.value)))

    async function handleVerifyCode() {
      try {
        const { success, message } = await vm.$axios.post('/subscribe/verify', {
          email: email.value,
          code: code.value,
          name: name.value
        })
        if (success) {
          successNotify(message + ' 1s 后将回到首页')
          setTimeout(() => {
            location.href = location.origin
          }, 1000)
        } else {
          warnNotify(message ?? DEFAULT_ERROR_TIP)
        }
      } catch (error: any) {
        errorNotify(error?.message ?? DEFAULT_ERROR_TIP)
      }
    }

    onMounted(() => {
      const params = parseLocationSearch()
      email.value = params.email || ''
    })
    return {
      name,
      code,
      disabled,
      handleVerifyCode
    }
  },
  head() {
    return {
      title: '邮箱验证 | K.island'
    }
  }
})
</script>

<style lang='scss'>
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
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    .verify-item {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
          color: var(--primary);
        }
      }
    }

    .btn-container {
      margin: 50px 20px 0;
      text-align: right;

      .btn {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>
