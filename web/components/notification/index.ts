import Vue from 'vue'
import Component from './notify.vue'
import { NotificationOptions, AnyInstance } from '~/types'

const NotificationConstructor = Vue.extend(Component)

let key = 1
let instance: AnyInstance
let notifications: AnyInstance[] = []

/**
 * Because get the article info is happening in the server environment,
 * there doesn't exist 'window' object, but this notification is called
 * in the server environment, so something wrong will be happened
 * */

const Notification = (options: NotificationOptions): AnyInstance | undefined => {
  if (typeof window === 'undefined') return
  const id = 'notification_' + key++

  // let offset = 0
  let zIndex = 99 // 后一个提示框的层级始终比前一个高一层（虽然不处理的表现形式是一样的）
  notifications.forEach(() => {
    // offset += item.$el.offsetHeight + 16
    zIndex += 1
  })
  // offset += 16
  instance = new NotificationConstructor({
    data: options
  })
  // 当前 notification(vue 实例)添加属性
  instance.onClose = () => {
    close(id)
  }
  // instance.offset = offset
  instance.zIndex = zIndex
  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true

  notifications.push(instance)
  return instance
}

/**
 * 移除 notification 实例列表实例，并变动其后的 top 值
 * */
function close (id: string) {
  // const len = notifications.length
  let index = -1
  const curInstance = notifications.filter((ins, i) => {
    if (ins.id === id) {
      index = i
      return true
    }
    return false
  })[0]
  if (!curInstance) return
  // 若无当前实例，则移除数组中的最后一项
  notifications.splice(index, 1)
  // curInstance.$el.parentNode.removeChild(curInstance.$el)

  // 移除实例前，实例列表只剩当前实例，就不存在需变动其他实例的 position 偏移量
  // if (len < 1) return
  // const removedHeight = instance.$el.offsetHeight
  // for (let i = 0; i < len - 1; i++) {
  //   const verticalOffset = notifications[i].$el.style['top']
  //   notifications[i].$el.style['top'] = parseInt(verticalOffset) - removedHeight - 16 + 'px'
  // }
}

export default Notification
