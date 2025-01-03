import { defineStore } from 'pinia'
import { useFrontendMenuStore } from '@core/modules/frontend-menu/stores'
import { FrontendMenuViewModel } from '@core/modules/frontend-menu/models'

export const useFrontendMenu = defineStore({
  id: 'frontendMenu',
  state: () => ({
    frontendMenuList: [],
    frontendMenuTree: [],
  }),
  getters: {
    getFrontendMenuStore() {
      return useFrontendMenuStore()
    }
  },
  actions: {
    buildTree(arr, parentId = null) {
      const tree = []
      for (const item of arr) {
        if (item.parentId === parentId) {
          const node = FrontendMenuViewModel(item)
          const children = this.buildTree(arr, item.id)
          node.children = children
          tree.push(node)
        }
      }
      return tree
    },
    getFrontendMenuList() {
      /* 如果有前台選單的api就使用以下註解 */
      // return new Promise((resolve, reject) => {
      //   this.getFrontendMenuStore.list({})
      //     .then(res => {
      //       const { list } = res
      //       this.frontendMenuList = list
      //       this.frontendMenuTree = this.buildTree(list)
      //       resolve()
      //     }).catch(error => {
      //       console.log(error)
      //       reject(error)
      //     })
      // })
      return new Promise((resolve) => {
        resolve(true)
      })
    },

  },
})
