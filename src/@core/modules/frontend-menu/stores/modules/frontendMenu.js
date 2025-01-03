import { defineStore } from 'pinia'
import { FrontendMenuResource } from '@core/modules/frontend-menu/api'

export const useFrontendMenuStore = defineStore({
  id: 'frontendMenuStore',
  getters: {
    getFrontendMenuResource() {
      return FrontendMenuResource({})
    }
  },
  actions: {
    list({ query }) {
      return this.getFrontendMenuResource.list({ query })
    },
    get({ id, query }) {
      return this.getFrontendMenuResource.get({ id, query })
    },
  },
})
