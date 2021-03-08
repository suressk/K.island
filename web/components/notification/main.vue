<template>
  <transition name="notify">
    <div
      class="notification"
      v-show="visible"
      :style="verticalOffset"
      @mouseenter="stopDestroy"
      @mouseleave="startDestroy"
    >
      <div class="notify-header" :class="'notification-' + type">
        <i class="iconfont" :class="'icon-' + type" />
        <span class="notify-title" v-text="title" />
      </div>
      <div class="notify-body" v-text="message" />
    </div>
  </transition>
</template>

<script>
import { addListener, removeListener } from '@/utils/util'
export default {
  name: 'Notification',
  data () {
    return {
      visible: false,
      type: '',
      title: '',
      message: '',
      timer: null,
      duration: 4000,
      // onClose: null,
      offset: 0,
      closed: false
    }
  },
  computed: {
    verticalOffset () {
      return `top: ${this.offset}px;`
    }
  },
  methods: {
    destroyElement() {
      removeListener(this.$el, 'transitionend', this.destroyElement)
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    close () {
      this.closed = true
      this.onClose()
    },
    startDestroy () {
      this.timer = setTimeout(() => {
        this.close()
      }, this.duration)
    },
    stopDestroy () {
      clearTimeout(this.timer)
      this.timer = null
    }
  },
  mounted () {
    this.timer = setTimeout(() => {
      this.close()
    }, this.duration)
  },
  watch: {
    closed (val) {
      // 已关闭
      if (val) {
        this.visible = false
        // transition 结束移除 $el
        addListener(this.$el, 'transitionend', this.destroyElement)
      }
    }
  }
}

// import {
//   defineComponent,
//   ref,
//   computed,
//   onMounted,
//   watch,
//   getCurrentInstance,
//   PropType
// } from '@nuxtjs/composition-api'
// export default defineComponent({
//   name: 'Notification',
//   setup (props) {
//     console.log('props', props)
//     const { proxy } = getCurrentInstance()
//     console.log(proxy);
//     const closed = ref<boolean>(false)
//     const visible = ref<boolean>(false)
//     const timer = ref<null | number>(null)
//     const duration = ref<number>(5000)
//     // let type = ref<string>('success')
//     // let title = ref<string>('Notification')
//     // let message = ref<string>('success')
//     // let onClose = ref<null | Function>(null)
//     // let offset = ref<number>(0)
//
//     // 销毁组件
//     function destroyElement() {
//       removeListener(proxy.$el, 'transitionend', destroyElement)
//       // proxy.$el.removeEventListener('transitionend', destroyElement);
//       // this.$destroy(true);
//       proxy.onClose && proxy.onClose() // 全局实例数组中移除当前实例
//       // proxy.$el.parentNode.removeChild(proxy.$el);
//     }
//     function close () {
//       closed.value = true
//       // props.onClose()
//       timer.value = null
//     }
//
//     const verticalOffset = computed(() => `top: ${proxy.offset}px;`)
//     watch(closed, (val: boolean) => {
//       // 已关闭
//       if (val) {
//         visible.value = false
//         // transition 结束移除 $el
//         addListener(proxy.$el, 'transitionend', destroyElement)
//         // proxy.$el.addEventListener('transitionend', destroyElement)
//       }
//     })
//     onMounted(() => {
//       timer.value = window.setTimeout(() => {
//         !closed.value && close()
//       }, duration.value)
//     })
//     return {
//       visible,
//       verticalOffset
//     }
//   }
// })
</script>
