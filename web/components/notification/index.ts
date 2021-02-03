import Vue from 'vue'

import Main from './main.vue'
import { NotificationOptions, NotificationInstance } from '~/@types'

const NotificationConstructor = Vue.extend(Main)

let key = 1
let instance: NotificationInstance
let notifications: NotificationInstance[] = []

const Notification = (options: NotificationOptions): NotificationInstance | undefined => {
  if (typeof window === 'undefined') return
  const id = 'notification_' + key++

  let offset = 0
  // instance.$el.style.zIndex = PopupManager.nextZIndex();
  notifications.forEach(item => {
    // console.log('offsetHeight ==============', item.$el.offsetHeight);
    offset += item.$el.offsetHeight + 16
  })
  offset += 16
  // options = {
  //   duration: 5000,
  //   ...options,
  //   id,
  //   offset,
  //   onClose: () => {
  //     close(id)
  //   }
  // }
  instance = new NotificationConstructor({
    data: options
  })
  instance.onClose = () => {
    close(id)
  }
  instance.offset = offset

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
  const len = notifications.length
  let index = -1
  const curInstance = notifications.filter((ins, i) => {
    if (ins.id === id) {
      index = i
      return true
    }
    return false
  })[0]
  if (!curInstance) return
  notifications.splice(index, 1)
  curInstance.$el.parentNode.removeChild(curInstance.$el)
  // 移除实例前，实例列表只剩当前实例，就不存在需变动其他实例的 position 偏移量
  if (len <= 1) return

  const removedHeight = instance.$el.offsetHeight
  for (let i = 0; i < len - 1; i++) {
    const verticalOffset = notifications[i].$el.style['top']
    notifications[i].$el.style['top'] = parseInt(verticalOffset) - removedHeight - 16 + 'px'
  }
}

export default Notification
