import { defineStore } from 'pinia'
import { LanguageSettingResource } from '@core/modules/language/api'

export const useLanguageSettingStore = defineStore({
  id: 'languageSettingStore',
  getters: {
    getLanguageSettingResource() {
      return LanguageSettingResource({})
    }
  },
  actions: {
    list({ query }) {
      return this.getLanguageSettingResource.list({ query })
    },
    get({ id, query }) {
      return this.getLanguageSettingResource.get({ id, query })
    },
  },
})
