import { request } from '@/utils/http';
import { fail } from 'assert';

const WXCODELOGIN = '/smartfisheries/userManger/login.do';

export function uniGetCode(successFunc: Function) {
  console.log('func : uni.login');
  uni.login({
    provider: 'weixin',
    success: function (response: any) {
      if (response.code) {
        console.log('uni.login : ', response.code);
        successFunc(response.code);
      }
    },
    fail: function (e: any) {
      console.log('uniLogin : fail :', e);
    },
  });
  return '';
}
