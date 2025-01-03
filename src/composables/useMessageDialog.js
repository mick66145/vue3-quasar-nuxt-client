import { useMessageDialogStore } from '@/stores/messageDialog'

export default function useMessageDialog() {
  const store = useMessageDialogStore()
  const { $i18n } = useNuxtApp();

  const messageAlert = ({ title, message, confirmButtonText, confirmButtonColor }) => store.alert({
    title: title || $i18n.t('g.dialog.default-title'),
    message,
    persistent: false,
    showCancel: false,
    confirmButtonText: confirmButtonText || $i18n.t('g.btn.confirm'),
    confirmButtonColor: confirmButtonColor || 'primary',
  })

  const messageConfirm = ({ title, message, confirmButtonText, confirmButtonColor, cancelButtonText, cancelButtonColor }) => store.alert({
    title: title || $i18n.t('g.dialog.default-title'),
    message,
    persistent: true,
    confirmButtonText: confirmButtonText || $i18n.t('g.btn.confirm'),
    confirmButtonColor: confirmButtonColor || 'primary',
    showCancel: true,
    cancelButtonText: cancelButtonText || $i18n.t('g.btn.cancel'),
    cancelButtonColor: cancelButtonColor || 'primary',
  })

  const messageDelete = ({ title, message, confirmButtonText, cancelButtonText, cancelButtonColor }) => store.alert({
    title: title || $i18n.t('g.dialog.delete-title'),
    status: 'error',
    message,
    persistent: true,
    confirmButtonText: confirmButtonText || $i18n.t('g.btn.delete'),
    confirmButtonColor: 'negative',
    showCancel: true,
    cancelButtonText: cancelButtonText || $i18n.t('g.btn.cancel'),
    cancelButtonColor: cancelButtonColor || 'primary',
  })

  return {
    messageAlert,
    messageConfirm,
    messageDelete,
  }
}
