export interface ResponseRes<T> {
  success: boolean;
  data: T;
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

export interface ResponseListRes<T> {
  success: boolean;
  data: ListRes<T>;
  message: string;
}
