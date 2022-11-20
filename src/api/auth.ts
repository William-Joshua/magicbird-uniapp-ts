import { request } from '@/utils/http';
import { LoginParams, LoginModel } from '@/api/models/authModel';

const LOGIN = '/userManger/login.do';
/**
 * 登录
 * @param params
 */
export function login(params: LoginParams) {
  return request.post<ApiResult<LoginModel>>(LOGIN, params, {
    custom: {
      auth: false,
    },
  });
}
