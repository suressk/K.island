import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// @ts-ignore
import Storage from 'vue-ls'

const app = createApp(App)
app.use(store)
app.use(Storage, {
  namespace: 'pro__',
  name: 'ls',
  storage: 'local'
})
app.use(router)
app.mount('#app')
