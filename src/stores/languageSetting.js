import { defineStore } from 'pinia'
import { useLanguageSettingStore } from '@core/modules/language/stores'

export const useLanguageSetting = defineStore({
  id: 'languageSetting',
  state: () => ({
    languageSettingList: [],
  }),
  getters: {
    getLanguageSettingStore() {
      return useLanguageSettingStore()
    }
  },
  actions: {
    getLanguageSetting() {
      /* 如果有語言設定的api就使用以下註解 */
      // return new Promise((resolve, reject) => {
      //   const query = { orderby: 'sequence:asc,id:desc' }
      //   this.getLanguageSettingStore.list({ query })
      //     .then(res => {
      //       const { list } = res
      //       this.languageSettingList = list
      //       resolve()
      //     }).catch(error => {
      //       reject(error)
      //     })
      // })
      return new Promise((resolve) => {
        resolve(true)
      })
    },
    isValidLang(lang) {
      const localeList = this.languageSettingList.map(item => item.locale)
      return localeList.includes(lang)
    }
  }
})
