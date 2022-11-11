import { createGlobalState } from '@vueuse/shared';
import { useLocalStorage } from '@vueuse/core';

const LIFEDATA_KEY = 'lifeData';

interface Account {
  nickName: string;
  accountID: string;
  wechatName: string;
  avatarUrl: string;
}

interface UserState {
  id?: string | number;
  user: Account;
  token: string;
  loginStatus: boolean;
}

const initVal: UserState = {
  token: '',
  loginStatus: false,
  user: {
    nickName: '游客',
    accountID: 'account',
    wechatName: '游客',
    avatarUrl: '../static/images/avatar.png',
  },
};

export const useUserGlobal = createGlobalState(() => useLocalStorage(LIFEDATA_KEY, initVal));

export default function useUserStore() {
  const lifeData = useUserGlobal();
  const getToken = () => {
    return lifeData.value.token;
  };
  const getUser = () => {
    return lifeData.value.user;
  };
  const vuex_token = computed(() => {
    return lifeData.value.token;
  });
  const vuex_user = computed(() => {
    return lifeData.value.user;
  });
  const initUserStore = () => {
    lifeData.value.token = '';
    lifeData.value.loginStatus = false;
    lifeData.value.user = {
      nickName: '游客',
      accountID: 'account',
      wechatName: '游客',
      avatarUrl: '../static/images/logo.svg',
    };
  };
  return {
    lifeData,
    getToken,
    getUser,
    vuex_token,
    vuex_user,
    initUserStore,
  };
}
