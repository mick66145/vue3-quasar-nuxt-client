import { computed } from 'vue-demi'
import { useRoute } from 'vue-router'

export const modeTypes = {
  create: 'create',
  edit: 'edit',
  view: 'view',
}

export default function useEditTitle(mode) {
  const route = useRoute()
  const { $i18n } = useNuxtApp();

  const prefixNames = {
    [modeTypes.create]: $i18n.t('g.prefix.add'),
    [modeTypes.edit]: $i18n.t('g.prefix.edit'),
    [modeTypes.view]: $i18n.t('g.prefix.view'),
  }

  const pageTitle = computed(() => {
    const metaTitle = route.meta.title
    return `${prefixNames[mode.value]}${metaTitle}`
  })
  const prefix = computed(() => {
    return `${prefixNames[mode.value]}`
  })
  return {
    pageTitle,
    prefix,
  }
}
