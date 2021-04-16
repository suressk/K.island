import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
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

/**
 * 扩展 vue 代码语法高亮
 * */
VueMarkdownEditor.use(vuepressTheme, {
    codeHighlightExtensionMap: {
        vue: 'xml'
    }
})
// VueMarkdownEditor.use(githubTheme)

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueMarkdownEditor)
// useAntd(app)

app.mount('#app')
