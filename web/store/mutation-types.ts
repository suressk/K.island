/**
 * mutation types --- prefix: 'M_'
 * action types   --- prefix: 'A_'
 * */
export const M_SET_CURRENT_PAGE = 'M_SET_CURRENT_PAGE' // 当前页数
export const M_SET_TOTAL_ITEMS = 'M_SET_TOTAL_ITEMS' // 文章总条数
export const M_SET_LOAD_STATUS = 'M_SET_LOAD_STATUS' // loadMore loading 状态
export const M_RESET_LOAD_MORE = 'M_RESET_LOAD_MORE' // 重置 loadMore 状态

/**
 * loading status
 * -1   没有更多内容
 *  0   可加载更多
 *  1   正在加载
 */
export const LOADING = 1
export const LOAD_MORE = 0
export const NO_MORE = -1

/**
 * state variable
 * */
export const LOAD_STATUS = 'loadStatus'
export const TOTAL_ITEMS = 'totalItems'
export const CURRENT_PAGE = 'curPage'

/**
 * localStorage values
 * */
export const LEAVE_MSG_LIMIT = 'leaveMsgLimit' // 每日新增 msg 限制数
export const MSG_TIP_SHOW = 'msgTipShow' // msg 提示信息显示与否
export const COMMENT_USER = 'commentUser' // 评论者信息

