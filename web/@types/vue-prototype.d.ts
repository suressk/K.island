import { NotificationOptions } from './index'

declare module 'vue/types/vue' {
  interface Vue {
    $notification: (options: NotificationOptions) => void; // Vue.extend() API 实现 notify 消息提示框
    $notify: (options: NotificationOptions) => void; // 原生方法实现 notify 消息提示框
    init: Function;
    destroyElement: Function;
    visible: Boolean;
  }
}
