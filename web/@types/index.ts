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

export interface QueryArticleParams {
  uid: string;
  id: number | string;
}

export interface ArticleListItem {
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
  cover: string;
  ctime: number;
  utime: number;
}

export interface NotificationOptions {
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
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
