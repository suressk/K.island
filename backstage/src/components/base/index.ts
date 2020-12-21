import { App } from 'vue'
import Button from './Button.vue'

const install = function (app: App<Element>) {
  app.component('KButton', Button)
}

export default install
