export interface PropsType {
  articleInfo: {
    title: string;
    tag: string;
    introduce: string;
    cover: string;
    content: string;
    ctime: string;
  };
  modelValue: boolean;
}

export interface ResponseRes {
  success: boolean;
  data: object;
  message: string;
}
