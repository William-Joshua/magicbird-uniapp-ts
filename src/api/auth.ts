import { request } from '@/utils/http';
import { LoginParams, LoginModel } from '@/api/models/authModel';
import { ApiResult } from '@/api/models/apiResult';

const LOGIN = '/userManger/login.do';
// /**
//  * 登录
//  * @param params
//  */
// export function login(params: LoginParams) {
//   return request.post<LoginModel>(LOGIN, params, {
//     custom: {
//       auth: false,
//     },
//   });
// }

/**
 * 登录
 * @param params
 */
export function login(params: LoginParams) {
  console.log('post:', params);
  return request.post<ApiResult<LoginModel>>(LOGIN, params, {
    custom: {
      auth: false,
    },
  });
}

/**
 * 登出
 */
// export function logout() {
//   return request.post(LOGIN_OUT, {});
// }

/**
 * 刷新token
 */
// export function refreshToken() {
//   return request.post<LoginModel>(REFRESH_TOKEN, {});
// }
