export interface ErrorResponse {
  code: string;
  message: string;
  response: Response;
}

export interface NotificationOptions {
  [prop: string]: any;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

export interface NotificationInstance {
  [prop: string]: any;
}
