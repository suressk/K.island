export interface ErrorResponse {
  code: string;
  message: string;
  response: Response;
}

export interface ResponseRes {
  success: boolean;
  data: any;
  message: string;
}

// export interface QueryArticleParams {
//   uid: string;
//   id: number | string;
// }

export interface PaginationParams {
  pageNo: number
  pageSize: number
}

export interface ArticleItem {
  id: number;
  uid: string;
  time: {
    year: string;
    month: string;
    monthNum: number;
    day: string;
    hour: string;
    minute: string;
  },
  title: string;
  introduce: string;
  tag: string;
  views: number;
  liked: number;
  cover: string;
  ctime: number;
  utime: number;
}

export interface ArticleDetail extends ArticleItem {
  content: string;
  music: string;
  musicName: string;
}

interface InfoOptions {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export interface NotificationOptions extends InfoOptions {
  title: string;
}

export interface ConfirmOptions extends InfoOptions {
  okTxt?: string;
  cancelTxt?: string;
  onOk?: Function;
  onCancel?: Function;
}

export interface AnyInstance {
  [prop: string]: any;
}

// export interface NotificationInstance {
//   id?: string;
//   offset?: number;
//   onClose?: () => void;
//   visible?: boolean;
//   $el?: HTMLElement;
// }

export interface ILoadImageItem {
  el: HTMLImageElement;
  src: string;
}

/**
 * 评论
 * */
export interface CommentProps {
  submitting: number;
}

export interface CommentInfo {
  name: string;
  email: string;
  comment: string;
}
export interface ModalProps {
  visible?: boolean
  title?: string
  okText?: string
  cancelText?: string
  showFooter?: boolean
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
