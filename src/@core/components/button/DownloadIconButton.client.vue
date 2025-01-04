<template>
  <base-icon-button color="positive" icon="arrow_downward" :outline="outline" :label="buttonLabel" />
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'

export default defineComponent({
  props: {
    label: { type: String },
    outline: { type: Boolean, default: false },
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
