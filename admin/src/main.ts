import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import useAntd from './plugins/useAntd'
import 'vite-plugin-svg-icons/register'

const app = createApp(App)
app.use(router)
app.use(store)

// useAntd(app)

app.mount('#app')
