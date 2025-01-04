<template>
  <base-button color="positive" :outline="outline" :rounded="rounded" :label="buttonLabel" :icon="icon" />
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
export default defineComponent({
  props: {
    label: { type: String },
    outline: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    icon: { type: String, default: 'arrow_downward' },
    downloadUrl: { type: String },
  },
  setup(props) {
    const { $i18n } = useNuxtApp();

    // data
    const { label } = toRefs(props)

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : $i18n.t('g.btn.dowload')
    })

    return {
      buttonLabel,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
