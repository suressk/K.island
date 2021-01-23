import Vue from 'vue'
import Main from './main.vue'

const NotificationConstructor = Vue.extend(Main)

interface IOptions {
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

let seed = 1
let instance

const Notification = (options: IOptions) => {
  if (typeof window === 'undefined') return
  const id = 'notification_' + seed++
  instance = new NotificationConstructor({
    data: options
  })

  // @ts-ignore
  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true

  // @ts-ignore
  instance.dom = instance.$el
}


export default Notification
