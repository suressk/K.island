import Vue from 'vue'
import Component from './confirm.vue'
import { AnyInstance, ConfirmOptions } from '~/@types'

const PopConfirmConstructor = Vue.extend(Component)

let key = 1
let instance: AnyInstance
let confirms: AnyInstance[] = []

const Confirm = (options: ConfirmOptions): AnyInstance | undefined => {
  if (typeof window === 'undefined') return
  const id = 'confirm_' + key++

  let zIndex = 60
  confirms.forEach(() => {
    zIndex += 1
  })

  instance = new PopConfirmConstructor({
    data: options
  })
  instance.onClose = () => {
    close(id)
  }
  instance.zIndex = zIndex
  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true
  confirms.push(instance)
  return instance
}

function close(id: string) {
  let index = -1
  const curInstance = confirms.filter((ins, i) => {
    if (ins.id === id) {
      index = i
      return true
    }
    return false
  })[0]
  if (!curInstance) return
  confirms.splice(index, 1)
}

export default Confirm
