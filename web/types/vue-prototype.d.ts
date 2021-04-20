import {NotificationOptions} from '~/types'
// import {AxiosInstance} from 'axios'

declare module 'vue/types/vue' {
  interface Vue {
    $notification: (options: NotificationOptions) => void; // Vue.extend() API 实现 notify 消息提示框
    // $axios: (url: string, opt: any) => Promise<any>; // get
    $axios: any;
    destroyElement: () => void;
    // init: Function;
  }
}
