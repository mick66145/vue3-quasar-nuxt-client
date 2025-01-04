<template>
  <base-button :rounded="rounded" :outline="outline" :label="buttonLabel" :icon="icon" @click="goBack" />
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
import useGoBack from '@/composables/useGoBack'

export default defineComponent({
  props: {
    label: { type: String },
    icon: { type: String },
    outline: { type: Boolean, default: true },
    rounded: { type: Boolean, default: true },
    fallBack: { type: [String, Object] },
    isFallBack: { type: Boolean, default: false },
  },
  setup(props) {
    const { $i18n } = useNuxtApp();

    // data
    const { label, fallBack, isFallBack } = toRefs(props)

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : $i18n.t('g.btn.go-back')
    })

    // use
    const { goBack } = useGoBack({ fallBack, isFallBack })

    return {
      buttonLabel,
      goBack,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
