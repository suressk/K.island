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

export interface NotificationOptions {
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

export interface NotificationInstance {
  [prop: string]: any;
}

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
