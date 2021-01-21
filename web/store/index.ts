import { M_UPDATE_IS_LOGIN } from './mutation-types'

interface State {
  isLogin: boolean;
}

/**
 * vuex state
 * */
export const state = (): State => ({
  isLogin: false
})

/**
 * mutations
 * */
export const mutations = {
  [M_UPDATE_IS_LOGIN] (state: State, payload: any) {
    state.isLogin = payload
  }
}

/**
 * actions
 * */
export const actions = {}
