import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

export const useApp = defineStore({
  id: 'app',
  state: () => ({
    sidebar: {
      opened: false,
      withoutAnimation: false,
    },
    isLoading: false,
    isReading: false,
    isReadingList: false,
    isCreate: false,
    isUpdate: false,
    isDelete: false,
  }),
  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
  },

})
