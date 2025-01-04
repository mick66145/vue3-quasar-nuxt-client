<template>
  <input-select v-model="observeValue" :options="areaList" :required="required" :label="observeLabel"
    :placeholder="observePlaceholder" />
</template>

<script>
import { defineComponent, ref, computed, onMounted, toRefs, watch } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { AreaResource } from '@core/modules/area/api'
import useCRUD from '@/composables/useCRUD'

const areaResource = AreaResource({})

export default defineComponent({
  props: {
    modelValue: { type: [String, Object] },
    cityId: { type: [String, Number] },
    required: { type: Boolean, default: false },
    label: { type: String },
    placeholder: { type: String },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { $i18n } = useNuxtApp();

    // data
    const { label, placeholder, cityId } = toRefs(props)
    const observeValue = useVModel(props, 'modelValue', emit)
    const areaList = ref([])

    // mounted
    onMounted(() => {
      if (cityId.value) { callReadListFetch() }
    })

    // computed
    const observeLabel = computed(() => {
      return label.value ? label.value : $i18n.t('g.common.area')
    })
    const observePlaceholder = computed(() => {
      return placeholder.value ? placeholder.value : $i18n.t('g.common.select', { field: $i18n.t('g.common.area') })
    })

    // methods
    const fetchData = () => {
      const query = { city_id: cityId.value }
      return areaResource.list({ query }).then((res) => {
        areaList.value = []
        areaList.value = res.list
      })
    }
    const clearData = () => { areaList.value = [] }

    // use
    const { callReadListFetch } = useCRUD({
      readListFetch: fetchData,
    })

    // watch
    watch(() => cityId.value, (newValue) => {
      if (newValue) fetchData()
    })

    return {
      observeValue,
      observeLabel,
      observePlaceholder,
      areaList,
      fetchData,
      clearData,
    }
  },
})

</script>

<style lang="postcss" scoped></style>
