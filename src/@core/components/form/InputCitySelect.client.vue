<template>
  <input-select v-model="observeValue" :options="cityList" :required="required" :placeholder="observePlaceholder"
    :label="observeLabel" />
</template>

<script>
import { defineComponent, ref, computed, onMounted, toRefs } from 'vue-demi'
import { CityResource } from '@core/modules/city/api'
import { useVModel } from '@vueuse/core'
import useCRUD from '@/composables/useCRUD'

const cityResource = CityResource({})

export default defineComponent({
  props: {
    modelValue: { type: [String, Object] },
    required: { type: Boolean, default: false },
    label: { type: String },
    placeholder: { type: String },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { $i18n } = useNuxtApp();

    // data
    const { label, placeholder } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)
    const cityList = ref([])

    // computed
    const observeLabel = computed(() => {
      return label.value ? label.value : $i18n.t('g.common.city')
    })
    const observePlaceholder = computed(() => {
      return placeholder.value ? placeholder.value : $i18n.t('g.common.select', { field: $i18n.t('g.common.city') })
    })

    // mounted
    onMounted(async () => {
      callReadListFetch()
    })

    // methods
    const fetchData = (query) => {
      return cityResource.list({ query }).then((res) => {
        cityList.value = []
        cityList.value = res.list
      })
    }
    const clearData = () => { cityList.value = [] }

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })

    return {
      observeValue,
      observeLabel,
      observePlaceholder,
      cityList,
      fetchData,
      clearData,
    }
  },
})

</script>

<style lang="postcss" scoped></style>
