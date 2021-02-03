export interface ErrorResponse {
  code: string;
  message: string;
  response: Response;
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
