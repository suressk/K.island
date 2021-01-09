export interface PropsType {
  articleInfo: RecordInfo;
  modelValue: boolean;
}

export interface ErrorResponse {
  code: string;
  message: string;
  response: Response;
}

export interface ResponseData {
  success: boolean;
  data: object;
  message: string;
}

export interface RecordInfo {
  title: string;
  tag: string;
  introduce: string;
  content: string;
  cover: string;
  ctime?: number;
}

export interface LoginInfo {
  username: string;
  password: string;
}

export interface DeleteImageParams {
  relativePath: string;
}
