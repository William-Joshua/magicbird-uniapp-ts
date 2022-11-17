import { defineStore } from 'pinia';
import { getCache, removeCache, setCache } from '@/utils/cache';
import { TOKEN_KEY } from '@/enums/cacheEnum';
import { login } from '@/api/auth';
import { LoginParams, LoginModel } from '@/api/models/authModel';

interface AuthState {
  token?: string;
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    token: undefined,
  }),
  getters: {
    getToken: state => state.token,
    isLogin: (state): boolean => !!state.token,
  },
  actions: {
    initToken() {
      this.token = getCache<string>(TOKEN_KEY) || undefined;
    },
    setToken(token: string | undefined) {
      setCache(TOKEN_KEY, token);
      this.token = token;
    },
    /**
     * @description 登录
     */
    async login(params: LoginParams): Promise<LoginModel> {
      try {
        console.log('login:', params);
        const { data } = await login(params);

        if (data.resultCode == 200) {
          this.setToken(data.extend.access_token);
          return Promise.resolve(data.extend);
        }
        return Promise.reject(data.resultMsg);
      } catch (err: any) {
        return Promise.reject(err);
      }
    },
    /**
     * @description 登出
     */
    async loginOut(): Promise<any> {
      try {
        //const res = await logout();
        removeCache(TOKEN_KEY);
        this.setToken(undefined);
        return Promise.resolve();
      } catch (err: any) {
        return Promise.reject(err);
      }
    },
    // /**
    //  * @description 刷新token
    //  */
    // async refreshToken(): Promise<LoginModel> {
    //   try {
    //     const { data } = await refreshToken();
    //     this.setToken(data.token);
    //     return Promise.resolve(data);
    //   } catch (err: any) {
    //     return Promise.reject(err);
    //   }
    // },
  },
});
