import {createStore} from 'vuex'
import {UNREAD, M_SET_UNREAD} from './mutation-types'

// import { SET_ASIDE_MENU_SHRINK } from './mutation-common'

export default createStore({
    state: {
        // shrinkAsideMenu: false // 侧边菜单项收缩与否
        [UNREAD]: 0
    },
    mutations: {
        // [SET_ASIDE_MENU_SHRINK] (state, val) {
        //   state.shrinkAsideMenu = val
        // }
        [M_SET_UNREAD] (state, unread: number) {
            state[UNREAD] = unread
        }
    },
    actions: {},
    modules: {}
})
