import { defineStore } from 'pinia';

import type { AuthorizationDtoType } from '@/types/api/auth.types';
import type { AuthorizationUserInfo } from '@/types/api/users.types';

const TOKEN_REFRESH_INTERVAL = 800 * 100;

interface State {
  token: string | null;
  refreshToken: string | null;
  information: null | AuthorizationUserInfo;
  tokenRefreshInterval?: number;
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    token: null,
    refreshToken: null,
    information: null,
    tokenRefreshInterval: undefined,
  }),

  getters: {
    isAuthorized: (state) => !!state.token,

    userInfo: (state) => state.information,
  },

  actions: {
    async authorization(requestBody: AuthorizationDtoType) {
      try {
        const response = await fetchAuth(requestBody);
        const data = response.data[0];

        this.token = data.attributes.token;
        this.refreshToken = data.attributes['refresh-token'];

        this.startTokenRefreshInterval();
        await this.setInformation(requestBody.login);
      } catch (e: any) {
       throw new Error(e);
      }
    },

    async setInformation(login: string) {
      if (this.token) {
        const response = await fetchBalance({ auth: this.token });
        const data = response.data;

        this.information = {
          login,
          balance: data
        };
      } else {
        this.information = { login };
      }
    },

    logout() {
      this.token = null;
      this.refreshToken = null;
      this.information = null;

      this.stopTokenRefreshInterval();
    },

    async refreshTokenUpdate() {
      try {
        if (this.refreshToken) {
          const response = await fetchUpdateToken({ refreshToken: this.refreshToken });
          this.token = response.token;
          this.refreshToken = response['refresh-token'];
        } else {
          throw new Error('The token cannot be updated');
        }
      } catch (e: any) {
        this.logout();
        throw new Error(e);
      }
    },

    startTokenRefreshInterval() {
      this.tokenRefreshInterval = setInterval(() => {
        if (this.refreshToken) {
          this.refreshTokenUpdate();
        }
      }, TOKEN_REFRESH_INTERVAL);
    },

    stopTokenRefreshInterval() {
      clearInterval(this.tokenRefreshInterval);
    }
  },
  persist: true,
});
