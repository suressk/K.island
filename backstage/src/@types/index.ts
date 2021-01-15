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
  data: object;
  message: string;
}

// res.data
export interface LoginResponse extends Promise<ResponseData> {
  success: boolean;
  data: TokenInfo;
  message: string;
}

export interface RecordInfo {
  title: string;
  tag: string;
  introduce: string;
  content: string;
  cover: string;
  ctime?: number;
  id?: number;
  uid?: string;
}

export interface RecordItemInfo {
  title: string;
  tag: string;
  introduce: string;
  cover: string;
  ctime: number;
  id: number;
  uid: string;
  content?: string;
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
