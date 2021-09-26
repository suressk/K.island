import {
  M_SET_CURRENT_PAGE,
  M_SET_TOTAL_ITEMS,
  M_RESET_LOAD_MORE,
  M_SET_LOAD_STATUS,
  LOAD_STATUS,
  TOTAL_ITEMS,
  CURRENT_PAGE,
  HAS_MORE
} from './mutation-types'

interface State {
  [TOTAL_ITEMS]: number;
  [CURRENT_PAGE]: number;
  [LOAD_STATUS]: number;
}

/**
 * vuex state
 * */
export const state = (): State => ({
  [TOTAL_ITEMS]: 0,
  [CURRENT_PAGE]: 1,
  [LOAD_STATUS]: 0
})

/**
 * mutations
 * */
export const mutations = {
  [M_SET_CURRENT_PAGE](state: State, page: number) {
    state[CURRENT_PAGE] = page
  },
  [M_SET_TOTAL_ITEMS](state: State, itemsNum: number) {
    state[TOTAL_ITEMS] = itemsNum
  },
  // 重置加载更多状态值
  [M_RESET_LOAD_MORE](state: State) {
    state[TOTAL_ITEMS] = 0
    state[CURRENT_PAGE] = 1
    state[LOAD_STATUS] = HAS_MORE
  },
  [M_SET_LOAD_STATUS](state: State, status: number) {
    state[LOAD_STATUS] = status
  }
}

/**
 * actions
 * */
export const actions = {}
