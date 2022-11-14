export interface ApiResult<T> {
  resultCode: number;
  resultMsg: string;
  extend: T;
}
