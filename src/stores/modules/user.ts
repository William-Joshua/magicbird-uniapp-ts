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
      this.avatarUrl = wechatParam.avatarUrl;
    },
    setuserName(userName: string) {
      this.userName = userName;
    },
    /**
     * @description 获取 OpenID
     */
    uniGetOpenCode(): boolean {
      try {
        const opencode = uniGetCode();

        if (opencode.length > 0) {
          this.setOpenCode(opencode);
          return true;
        }
        return false;
      } catch (err: any) {
        console.log('Get Open Code Failed : ', err);
        return false;
      }
    },
  },
});
