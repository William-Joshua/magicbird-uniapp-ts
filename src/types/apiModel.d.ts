declare interface ApiResult<T = any> {
  resultCode: number;
  resultMsg: string;
  extend: T;
}
