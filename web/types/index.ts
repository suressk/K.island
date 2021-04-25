export interface ErrorResponse {
  code: string
  message: string
  response: Response
}

export interface ResponseRes<D> {
  success: boolean
  data: D
  message: string
}

// export interface QueryArticleParams {
//   uid: string
//   id: number | string
// }

export interface PaginationParams {
  pageNo: number
  pageSize: number
}

export interface ArticleItem {
  id: number
  uid: string
  time: {
    year: string
    month: string
    monthNum: number
    day: string
    hour: string
    minute: string
  },
  title: string
  introduce: string
  tag: string
  views: number
  liked: number
  cover: string
  ctime: number
  utime: number
}

export interface ArticleDetail extends ArticleItem {
  content: string
  music: string
  musicName: string
}

export type MentionsInfo = {
  toName: null | string
  toEmail: null | string
  parentId: null | number
  topicId: null | string
}

export type CommentPropsParams = {
  article: ArticleDetail
}

const tuple = <T extends string[]>(...args: T): T => args
const TipTypes = tuple('success', 'info', 'warning', 'error')

type TipType = typeof TipTypes[number]

interface InfoOptions {
  type: TipType
  message: string
}

export interface NotificationOptions extends InfoOptions {
  title: string
}

export interface ConfirmOptions extends InfoOptions {
  okTxt?: string
  cancelTxt?: string
  onOk?: Function
  onCancel?: Function
}

export interface AnyInstance {
  [prop: string]: any
}

// export interface VueInstance {
//   $el: HTMLElement
//   $mount: () => void
//   id?: string
//   visible?: boolean
//   onClose?: () => void
//   [prop: string]: any
// }

// export interface NotificationInstance {
//   id?: string
//   offset?: number
//   onClose?: () => void
//   visible?: boolean
//   $el?: HTMLElement
// }

export interface ILoadImageItem {
  el: HTMLImageElement
  src: string
}

/**
 * 评论
 * */
export interface CommentProps {
  submitting: number
}

export interface CommentInfo {
  name: string
  email: string
  comment: string
}

export interface ReplyInfo extends CommentInfo {
  toName?: string
  toEmail?: string
  parentId?: number
  topicId?: string
}

export interface ModalProps {
  visible?: boolean
  title?: string
  okText?: string
  cancelText?: string
  showFooter?: boolean
}

export type CommentItem = {
  id: number
  uid: string
  parentId: number | null
  recordId: number
  fromName: string
  fromEmail: string
  toName: string
  toEmail: string
  ctime: number
  content: string
  topicId: string
  children?: CommentItem[]
}

/**
 * 留言
 * */
export interface MsgListItem {
  id: number
  uid: string
  name: string
  content: string
  ctime: number
}
