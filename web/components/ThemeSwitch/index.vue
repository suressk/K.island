<template>
  <div class="theme-switch" @click="handleChangeTheme">
    <span class="flex-center absolute-center">
      <i class="iconfont icon-light" :class="{ active: dark }" />
    </span>
    <span class="flex-center absolute-center">
      <i class="iconfont icon-night" :class="{ active: !dark }" />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import { debounce, getStorageValue, setStorageValue } from '~/utils/util'

export default defineComponent({
  name: 'ThemeSwitch',
  setup() {
    const dark = ref<boolean>(false)

    const handleChangeTheme = debounce(() => {
      dark.value = !dark.value
      setStorageValue('theme', dark.value ? 'night' : 'light')
      document.body.className = dark.value ? 'k-dark' : ''
    }, 100)

    onMounted(() => {
      const theme = getStorageValue('theme') || 'light'
      dark.value = theme === 'night'
      document.body.className = dark.value ? 'k-dark' : ''
    })

    return {
      dark,
      handleChangeTheme
    }
  }
})
</script>

<style lang="scss">
.theme-switch {
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: fixed;
  left: 10px;
  bottom: 25px;
  z-index: 15;
  border-radius: 0 5px 5px 0;
  .iconfont {
    opacity: 0;
    visibility: hidden;
    font-size: 1.5rem;
    &.active {
      animation: slideInDown .3s ease-in-out .2s forwards;
    }
  }
}
@keyframes slideInDown {
  0% {
    transform: translateY(-30px);
    opacity: 0;
    visibility: hidden;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
}
</style>
