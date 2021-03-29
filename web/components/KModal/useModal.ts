import { getCurrentInstance, watch, onUnmounted } from '@nuxtjs/composition-api'
import { ModalProps } from '~/@types'
/**
 * modal 弹出层
 * */
export default function useModal(props: ModalProps) {
  const vm = getCurrentInstance()!

  function updateVisible () {
    vm.emit('update:visible')
  }

  function emitOk() {
    vm.emit('ok')
  }

  const stopWatch = watch(() => props.visible, show => {
    if (!show) {
      document && (document.body.style.overflowY = '')
    } else {
      document && (document.body.style.overflowY = 'hidden')
    }
  })

  onUnmounted(() => {
    stopWatch()
  })

  return {
    updateVisible,
    emitOk
  }
}
