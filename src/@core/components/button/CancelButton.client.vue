<template>
  <base-button :outline="outline" :rounded="rounded" :label="buttonLabel" :color="color" :icon="icon" />
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
export default defineComponent({
  props: {
    label: { type: String },
    outline: { type: Boolean, default: true },
    rounded: { type: Boolean, default: false },
    color: { type: String, default: 'primary' },
    icon: { type: String },
  },
  setup(props) {
    const { $i18n } = useNuxtApp();

    // data
    const { label } = toRefs(props)

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : $i18n.t('g.btn.cancel')
    })

    return {
      buttonLabel,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
