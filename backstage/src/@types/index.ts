// import { AxiosResponse } from 'axios'

export interface PropsType {
  articleInfo: RecordInfo;
  modelValue: boolean;
}

export interface ErrorResponse {
  code: string;
  message: string;
  response: Response;
}

/*
* 响应数据体
* */
export interface ResponseData {
  success: boolean;
  message: string;
  data: object;
}

// res.data
export interface LoginResponse extends ResponseData {
  data: {
    token: string;
    expireTime: number;
  };
}

interface ArticleInfo {
  id?: number;
  uid?: string;
  title: string;
  tag: string;
  introduce: string;
  cover: string;
  music?: string;
  musicName?: string;
  ctime?: number;
  utime?: number;
  content?: string;
}

export interface RecordInfo extends ArticleInfo {
  content: string;
}

export interface RecordItemInfo extends ArticleInfo {
  id: number;
  uid: string;
  ctime: number;
}

export interface LoginInfo {
  username: string;
  password: string;
}

export interface TokenInfo {
  token: string; // token 信息
  expireTime: number; // 过期时间（s）
}

export interface DeleteImageParams {
  relativePath: string;
}

/* store =================================== */
export interface StoreTypes {
  state: object;
}

export interface RootState {
  state: object;
}
/* store =================================== */

export interface GetListParams {
  pageNo: number;
  pageSize: number;
}

export interface RecordIds {
  id: number;
  uid: string;
}
