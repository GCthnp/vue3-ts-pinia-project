import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore({
  id: 'userInfo',
  state: () => ({
    userInfo: '',
  }),
  getters: {},
  actions: {},
})
