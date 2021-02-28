import { M_SET_ARTICLE_DETAIL, A_QUERY_ARTICLE_DETAIL } from './mutation-types'
import { QueryArticleParams } from '~/@types'
import { Store } from 'vuex'
import Notification from '~/components/notification'

interface State {
  articleInfo: Object;
}

/**
 * vuex state
 * */
export const state = (): State => ({
  articleInfo: {}
})

/**
 * mutations
 * */
export const mutations = {
  [M_SET_ARTICLE_DETAIL] (state: State, payload: any) {
    state.articleInfo = payload
  }
}

/**
 * actions
 * */
export const actions = {
  async [A_QUERY_ARTICLE_DETAIL] (store: Store<State>, payload: QueryArticleParams) {
    const { uid, id } = payload
    // @ts-ignore
    const res = await this.$axios.get('/records/detail', {
      params: { uid, id }
    })
    if (res.success) {
      store.commit(M_SET_ARTICLE_DETAIL, { ...payload, ...res.data }) // 存储当前文章详情
      return
    }
    Notification({
      title: 'ERROR',
      type: 'error',
      message: res.message
    })
    store.commit(M_SET_ARTICLE_DETAIL, {}) // 查询失败，置空
  }
}
