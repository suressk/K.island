/**
 * mutation types --- prefix: 'M_'
 * action types   --- prefix: 'A_'
 * */
export const M_SET_ARTICLE_DETAIL = 'M_SET_ARTICLE_DETAIL' // 文章详情
// export const A_QUERY_ARTICLE_DETAIL = 'A_QUERY_ARTICLE_DETAIL'

// export const M_SET_ARTICLE_ITEM = 'M_SET_ARTICLE_ITEM' // 文章列表选中项
export const M_SET_TOTAL_ARTICLE_ITEM = 'M_SET_TOTAL_ARTICLE_ITEM' // 文章总条数
export const M_RESET_LOAD_MORE = 'M_RESET_LOAD_MORE' // 重置 loadMore 状态
export const M_SET_LOAD_STATUS = 'M_SET_LOAD_STATUS' // loadMore loading 状态

/**
 * loading status
 * -1   可加载更多
 * 0    没有更多内容
 * 1    正在加载
 */
export const LOADING = 1
export const LOAD_MORE = -1
export const NO_MORE = 0
