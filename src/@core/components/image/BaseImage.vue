<template>
  <span>
    <div class="q-img q-img--menu">
      <div style="padding-bottom: 75%;"></div>
      <div class="q-img__container absolute-full">
        <nuxt-img class="q-img__image q-img__image--with-transition q-img__image--loaded" :class="observeClass"
          :style="observeStyle" v-show="!useSkeleton || (!isReading && useSkeleton)" loading="eager" :src="observeSrc"
          :alt="alt" :fit="fit" :height="height" :width="width" :preload="preload" :position="position"
          :fetchpriority="fetchpriority" :modifiers="{ aspectRatio: ratio }" :format="format" :sizes="sizes"
          @click="onPreview">
          <template #error>
            <div class="bg-dark flex flex-center text-white absolute-full">
              載入失敗
            </div>
          </template>
        </nuxt-img>
      </div>
      <div class="q-img__content absolute-full q-anchor--skip" v-if="$slots.default">
        <slot name="default" />
      </div>
    </div>
    <skeleton-square v-if="isReading && useSkeleton" />
    <lightbox-dialog ref="dialog" :options="[{ src: observeSrc, key: observeSrc, intro: alt }]" />
  </span>
</template>

<script>
import { defineComponent, ref, computed, toRefs } from 'vue-demi'
import { getToken } from '@core/utils/auth'
import { fetchBlobData, fetchBlobDataAsDataUrl } from '@/utils/blob'
import { asyncComputed } from '@vueuse/core'
export default defineComponent({
  props: {
    src: { type: String },
    ratio: { type: Number, default: 1 },
    alt: { type: String },
    fit: { type: String, default: 'cover' },
    height: { type: String, default: '100%' },
    width: { type: String, default: '100%' },
    borderRadius: { type: String },
    format: { type: String, default: 'format' },
    preload: { type: Boolean, default: false },
    loading: { type: String },
    fetchpriority: { type: String },
    sizes: { type: String, default: 'sm:100vw' },
    position: { type: String },
    preview: { type: Boolean, default: false },
    useAuthorization: { type: Boolean, default: false },
    headers: { type: Object },
    fileReaderMethod: { type: String, default: 'text' },
    useSkeleton: { type: Boolean, default: false },
  },
  setup(props) {
    // data
    const dialog = ref()
    const isReading = ref(false)
    const { borderRadius, fit } = toRefs(props)
    // computed
    const observeSrc = asyncComputed(
      async () => {
        if (props.useAuthorization) {
          isReading.value = true
          const src = props.src
          const options = {
            headers: props.headers || { Authorization: `Bearer ${getToken()}` },
          }
          const fetchObj = {
            text: () => fetchBlobData(src, options),
            dataUrl: () => fetchBlobDataAsDataUrl(src, options),
          }
          const data = await fetchObj[props.fileReaderMethod]()
          isReading.value = false
          return data
        } else {
          return props.src
        }
      },
      null,
    )

    const observeClass = computed(() => ({
      'cursor-pointer': props.preview,
    }))

    const observeStyle = computed(() => ({
      borderRadius: borderRadius.value ? `${borderRadius.value}` : undefined,
      'object-fit': fit.value ? fit.value : undefined,
      'object-position': fit.value ? '50% 50%' : undefined,
    }))

    const onPreview = () => {
      if (props.preview) {
        dialog.value.showDialog({})
      }
    }
    return {
      dialog,
      isReading,
      observeSrc,
      observeClass,
      observeStyle,
      onPreview,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
