import { defineStore } from 'pinia';
import { uniGetCode } from '@/api/wechatApi';

interface UserState {
  id?: string | number;
  accountID: string | number;
  userName: string;
  wechatName: string;
  avatarUrl: string;
  openCode: string;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    accountID: 'guset',
    userName: '游客',
    wechatName: '游客',
    openCode: '',
    avatarUrl: '../../static/images/avatar.png',
  }),
  getters: {
    getAccount: state => state.accountID,
    getUserName: state => state.userName,
    getOpenCode: state => state.openCode,
    getWechatName: state => state.wechatName,
    getAvatarUrl: state => state.avatarUrl,
  },
  actions: {
    setAccount(account: string) {
      this.accountID = account;
    },
    setOpenCode(openCode: string) {
      this.openCode = openCode;
    },
    setWechatDetail(wechatParam: any) {
      this.wechatName = wechatParam.wechatName;
    },
    setuserName(userName: string) {
      this.userName = userName;
    },
    /**
     * @description 获取 OpenID
     */
    uniGetOpenCode(successFunc: Function, failFunc: Function) {
      uniGetCode((openCode: string) => {
        this.setOpenCode(openCode), successFunc();
      }, failFunc);
    },
  },
});
