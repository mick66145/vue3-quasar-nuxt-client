<template>
  <upload-icon-button icon="photo_camera" :label="buttonLabel" :capture="capture" @on-file="onFile" />
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue-demi'
export default defineComponent({
  props: {
    label: { type: String },
    outline: { type: Boolean, default: false },
    capture: { type: String, default: 'environment' }, // user、environment
  },
  emits: ['on-file'],
  setup(props, { emit }) {
    const { $i18n } = useNuxtApp();

    // data
    const { label } = toRefs(props)

    // computed
    const buttonLabel = computed(() => {
      return label.value ? label.value : $i18n.t('g.btn.upload')
    })

    const onFile = (fileObj) => {
      emit('on-file', fileObj)
    }

    return {
      buttonLabel,
      onFile,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
