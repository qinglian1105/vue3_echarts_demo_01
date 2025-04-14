import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, 
    token: null,     
  }),
  getters: {
    isLoggedIn: (state) => !!state.user, 
    userName: (state) => state.user?.name || 'Guest',  
  },
  actions: {
    setUser(userData) {
      this.user = userData;
    },
    setToken(authToken) {
      this.token = authToken;
    },
    clearUser() {
      this.user = null;
      this.token = null;
    },    
  },
});