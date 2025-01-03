import { defineStore } from 'pinia'

const { $i18n } = useNuxtApp();

export const useMessageDialogStore = defineStore({
  id: 'messageDialog',
  state: () => ({
    show: false,
    title: '',
    message: '',
    persistent: false,
    confirmButtonText: '',
    confirmButtonColor: 'primary',
    cancelButtonText: '',
    cancelButtonColor: 'primary',
    showCancel: true,
    resolve: null,
  }),
  actions: {
    alert({
      title,
      message,
      persistent,
      confirmButtonText,
      confirmButtonColor,
      cancelButtonText,
      cancelButtonColor,
      showCancel,
    }) {
      this.title = title || $i18n.t('g.dialog.default-title')
      this.message = message
      this.persistent = persistent || this.persistent
      this.confirmButtonText = confirmButtonText || $i18n.t('g.btn.confirm')
      this.confirmButtonColor = confirmButtonColor || this.confirmButtonColor
      this.cancelButtonText = cancelButtonText || $i18n.t('g.btn.cancel')
      this.cancelButtonColor = cancelButtonColor || this.cancelButtonColor
      this.showCancel = showCancel
      this.show = true
      return new Promise(resolve => {
        this.resolve = resolve
      })
    },
    confirm() {
      if (this.resolve) {
        this.resolve(true)
      }
      this.close()
    },
    close() {
      this.show = false
      this.$reset()
    },
  },
})
