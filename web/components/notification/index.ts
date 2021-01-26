import Vue from 'vue'
// @ts-ignore
import Main from './main.vue'

const NotificationConstructor = Vue.extend(Main)

interface IOptions {
  [prop: string]: any;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface IInstance {
  [prop: string]: any;
}

let key = 1
let instance: IInstance
let instances: IInstance[] = []

const Notification = (options: IOptions): IInstance | undefined => {
  if (typeof window === 'undefined') return
  const id = 'notification_' + key++

  options.onClose = () => {
    Notification.close(id);
  };
  instance = new NotificationConstructor({
    data: options
  })

  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true

  // instance.dom = instance.$el
  let offset = 0
  // instance.$el.style.zIndex = PopupManager.nextZIndex();
  instances.forEach(item => {
    // console.log('offsetHeight ==============', item.$el.offsetHeight);
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
//   }
// })

Notification.close = (id: string) => {
  const len = instances.length
  let index = -1
  const curInstance = instances.filter((ins, i) => {
    if (ins.id === id) {
      index = i
      return true
    }
    return false
  })[0]
  if (!curInstance) return
  instances.splice(index, 1)
  // 实例列表只剩当前实例，就不存在需变动其他实例的 position 偏移量
  if (len <= 1) return
  // const position = curInstance.position
  // console.log('position ====', position);
  
  const removedHeight = instance.$el.offsetHeight
  for (let i = 0; i < len - 1; i++) {
    const verticalOffset = instances[i].$el.style['top']
    console.log('verticalOffset', verticalOffset);
    instances[i].$el.style['top'] = parseInt(verticalOffset) - removedHeight - 16 + 'px'
  }
}

export default Notification
