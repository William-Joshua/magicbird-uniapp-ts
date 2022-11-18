import { request } from '@/utils/http';

export function uniGetCode(successFunc: Function, failFunc: Function) {
  try {
    uni.login({
      provider: 'weixin',
      success: function (response: any) {
        if (response.code) {
          successFunc(response.code);
        }
      },
      fail: function (e: any) {
        console.log('uniLogin : fail :', e);
        failFunc();
      },
    });
  } catch (err: any) {
    return err;
  }
}
