import {
  M_SET_ARTICLE_DETAIL,
  M_SET_TOTAL_ARTICLE_ITEM,
  M_RESET_LOAD_MORE,
  M_SET_LOAD_STATUS
} from './mutation-types'
import { ArticleDetail } from '~/@types'

interface State {
  articleDetail: ArticleDetail;
  totalArticle: number;
  curPage: number;
  loadStatus: number;
}

/**
 * vuex state
 * */
export const state = (): State => <State> ({
  articleDetail: {},
  totalArticle: 0,
  curPage: 1,
  loadStatus: -1
})

/**
 * mutations
 * */
export const mutations = {
  [M_SET_ARTICLE_DETAIL] (state: State, payload: ArticleDetail) {
    state.articleDetail = payload
  },
  [M_SET_TOTAL_ARTICLE_ITEM] (state: State, itemsNum: number) {
    state.totalArticle = itemsNum
  },
  [M_RESET_LOAD_MORE] (state: State) {
    state.totalArticle = 0
    state.curPage = 1
  },
  [M_SET_LOAD_STATUS] (state: State, status: number) {
    state.loadStatus = status
  }
}

/**
 * actions
 * */
export const actions = {}
