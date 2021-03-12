import { getCurrentInstance } from '@nuxtjs/composition-api'
/**
 * modal 弹出层
 * */
export default function useModal() {
  const vm = getCurrentInstance()!

  function updateVisible () {
    vm.emit('update:visible')
  }

  function emitOk() {
    vm.emit('ok')
  }

  return {
    updateVisible,
    emitOk
  }
}
