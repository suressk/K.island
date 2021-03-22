import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import useElementPlus from './plugins/useElementPlus'

const app = createApp(App)
app.use(router)
app.use(store)

useElementPlus(app)

app.mount('#app')
