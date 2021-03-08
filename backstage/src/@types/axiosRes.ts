/**
 * res => {
    success: boolean;
    data: object;
    message: string;
  }
 */
export interface ResponseRes {
  success: boolean;
  data: any;
  message: string;
}

/*
* {
*   list: T[],
*   total: number
* }
* */

interface ListRes<T> {
  list: T[];
  total: number;
}

export interface ResponseListRes<T> extends ResponseRes {
  data: ListRes<T>;
}
