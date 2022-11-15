import { request } from '@/utils/http';
import { fail } from 'assert';

const WXCODELOGIN = '/smartfisheries/userManger/login.do';

export function uniGetCode() {
  uni.login({
    provider: 'weixin',
    success: function (response: any) {
      if (response.code) {
        return response.code;
      }
    },
    fail: function (e: any) {
      console.log('uniLogin : fail :', e);
    },
  });
  return '';
}
