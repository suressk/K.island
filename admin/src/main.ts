import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import useAntd from './plugins/useAntd'
import 'vite-plugin-svg-icons/register'

/**
 * markdown 编辑器
 * */
// @ts-ignore
import VueMarkdownEditor from '@kangc/v-md-editor'
// @ts-ignore
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

VueMarkdownEditor.use(vuepressTheme)
// VueMarkdownEditor.use(githubTheme)

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueMarkdownEditor)
// useAntd(app)

app.mount('#app')
