<template>
  <transition name="notify">
    <div class="notify notification" v-show="visible" :style="verticalOffset">
      <div class="notify-header" :class="'notification-' + type">
        <i class="iconfont" :class="'icon-' + type" />
        <span class="notify-title" v-text="title" />
      </div>
      <div class="notify-body" v-text="message" />
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
  getCurrentInstance,
  PropType
} from '@vue/composition-api'
import { addListener, removeListener } from '@/utils/util'

export default defineComponent({
  name: 'Notification',
  props: {
    offset: { type: Number, default: 0 },
    onClose: {
      type: Function as PropType<() => void>,
      required: true
    },
    message: { type: String, default: '' },
    title: { type: String, default: '' },
    type: { type: String, default: '' },
  },
  setup (props) {
    console.log('props', props)
    const { proxy } = getCurrentInstance()
    console.log(proxy);
    let closed = ref<boolean>(false)
    let visible = ref<boolean>(false)
    // let type = ref<string>('success')
    // let title = ref<string>('Notification')
    // let message = ref<string>('success')
    const timer = ref<null | number>(null)
    const duration = ref<number>(5000)
    // let onClose = ref<null | Function>(null)
    // let offset = ref<number>(0)

    // 销毁组件
    function destroyElement() {
      removeListener(proxy.$el, 'transitionend', destroyElement)
      // proxy.$el.removeEventListener('transitionend', destroyElement);
      // this.$destroy(true);
      props.onClose() // 全局实例数组中移除当前实例
      proxy.$el.parentNode.removeChild(proxy.$el);
    }
    function close () {
      closed.value = true
      props.onClose()
    }

    const verticalOffset = computed(() => `top: ${props.offset}px;`)
    watch(closed, (val: boolean) => {
      console.log('closed', val);
      // 已关闭
      if (val) {
        visible.value = false
        // transition 结束移除 $el
        addListener(proxy.$el, 'transitionend', destroyElement)
        // proxy.$el.addEventListener('transitionend', destroyElement)
      }
    })
    onMounted(() => {
      timer.value = window.setTimeout(() => {
        !closed.value && close()
      }, duration.value)
    })
    return {
      visible,
      // type,
      // title,
      // message,
      verticalOffset
    }
  }
})
</script>
