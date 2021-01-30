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
  watch,
  ref,
  computed,
  onMounted,
  getCurrentInstance,
  PropType
} from '@vue/composition-api'

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
    const { proxy } = getCurrentInstance()
    console.log(proxy);
    let closed = ref<boolean>(false)
    let visible = ref<boolean>(false)
    let type = ref<string>('success')
    let title = ref<string>('Notification')
    let message = ref<string>('success')
    const timer = ref<null | number>(null)
    const duration = ref<number>(5000)
    // let onClose = ref<null | Function>(null)
    // let offset = ref<number>(0)

    // 销毁组件
    function destroyElement() {
      proxy.$el.removeEventListener('transitionend', destroyElement);
      // this.$destroy(true);
      proxy.$destroy();
      proxy.$el.parentNode.removeChild(proxy.$el);
    }
    function close () {
      closed.value = true
      props.onClose()
    }

    const verticalOffset = computed(() => `top: ${props.offset}px;`)
    watch(() => closed, (val: boolean) => {
      console.log('closed', val);
      // 已关闭
      if (val) {
        visible.value = false
        // transition 结束移除 $el
        proxy.$el.addEventListener('transitionend', destroyElement)
      }
    })
    onMounted(() => {
      timer.value = window.setTimeout(() => {
        close()
      }, duration.value)
    })
    return {
      visible,
      type,
      title,
      message,
      verticalOffset
    }
  }
})

// export default Vue.extend({
//   name: 'Notification',
//   data () {
//     return {
//       visible: false,
//       type: 'success',
//       title: 'Notify',
//       message: 'success',
//       timer: null,
//       duration: 5000,
//       onClose: null,
//       offset: 0,
//       closed: false
//     }
//   },
//   computed: {
//     verticalOffset () {
//       return `top: ${this.offset}px;`
//     }
//   },
//   methods: {
//     destroyElement() {
//       this.$el.removeEventListener('transitionend', this.destroyElement);
//       // this.$destroy(true);
//       this.$destroy();
//       this.$el.parentNode.removeChild(this.$el);
//     },
//     close () {
//       this.closed = true
//       this.onClose()
//     }
//   },
//   mounted () {
//     this.timer = window.setTimeout(() => {
//       this.close()
//     }, this.duration)
//   },
//   watch: {
//     closed (val: boolean) {
//       // 已关闭
//       if (val) {
//         this.visible = false
//         // transition 结束移除 $el
//         this.$el.addEventListener('transitionend', this.destroyElement)
//       }
//     }
//   }
// })
</script>
