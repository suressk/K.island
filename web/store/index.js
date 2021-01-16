import { M_UPDATE_IS_LOGIN } from './mutation-types'

/**
 * vuex state
 * */
export const state = () => ({
  isLogin: false
})

/**
 * mutations
 * */
export const mutations = {
  [M_UPDATE_IS_LOGIN] (state, payload) {
    state.isLogin = payload
  }
}

/**
 * actions
 * */
export const actions = {}
