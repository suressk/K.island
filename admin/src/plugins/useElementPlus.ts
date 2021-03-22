import { App } from 'vue'

import {
    ElSwitch, ElButton, ElInput,
    ElSelect, ElOption
} from 'element-plus'

/**
 * style
 * */
import 'element-plus/lib/theme-chalk/el-switch.css'
import 'element-plus/lib/theme-chalk/el-button.css'
import 'element-plus/lib/theme-chalk/el-input.css'
import 'element-plus/lib/theme-chalk/el-select.css'
import 'element-plus/lib/theme-chalk/el-option.css'

const comps = [
    ElSwitch, ElButton, ElInput, ElSelect, ElOption
]

export default function useElementPlus (app: App) {
    comps.forEach(comp => {
        app.component(comp.name, comp)
    })
}
