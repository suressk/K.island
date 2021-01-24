import Vue from 'vue'
import Main from './main.vue'

const NotificationConstructor = Vue.extend(Main)

interface IOptions {
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface IInstance {
  [prop: string]: any
}

let seed = 1
let instance: IInstance
let instances: IInstance[] = []

const Notification = (options: IOptions): IInstance | undefined => {
  if (typeof window === 'undefined') return
  const id = 'notification_' + seed++
  instance = new NotificationConstructor({
    data: options
  })

  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true

  instance.dom = instance.$el
  let offset = 0
  // instance.$el.style.zIndex = PopupManager.nextZIndex();
  instances.forEach(item => {
    offset += item.$el.offsetHeight + 16
  })
  offset += 16
  instance.offset = offset
  instances.push(instance)
  return instance
}

// ['success', 'warning', 'info', 'error'].forEach(type => {
//   if (Notification !== undefined) {
//     // Notification[type] = options => {
//     //
//     // }
//
//   }
// })


export default Notification
