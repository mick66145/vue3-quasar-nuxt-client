import { computed } from 'vue-demi'
import { useRoute } from 'vue-router'

export default function useTitle() {
  const route = useRoute()
  const { $i18n } = useNuxtApp()

  const webTitle = 'ClientFrontend Base'

  const prefix = computed(() => {
    if (import.meta.env.MODE !== 'development') return ''
    return import.meta.env.IS_LOCAL === 'true' ? '[開發] ' : '[測試] '
  })

  const title = computed(() => {
    const pageTitle = route.meta.title ? $i18n.t(route.meta.title) : ''
    const systemName = $i18n.t('g.system.system-name')

    if (pageTitle && systemName) return `${prefix.value}${pageTitle} - ${systemName}`
    if (pageTitle) return `${prefix.value}${pageTitle} - ${webTitle}`
    return `${prefix.value}${webTitle}`
  })

  return {
    title
  }
}
