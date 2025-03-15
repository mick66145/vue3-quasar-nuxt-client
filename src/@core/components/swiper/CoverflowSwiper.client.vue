<template>
  <div>
    <base-swiper :loop="true" :space-between="null" :autoplay="false" effect="coverflow" :navigation="navigation"
      :slidesPerView="slidesPerView" :coverflowEffect="coverflowEffect" :breakpoints="breakpoints">
      <slot name="default" />
    </base-swiper>
  </div>
</template>
<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    loop: { type: Boolean, default: true },
    navigation: { type: Boolean, default: true },
    slidesPerView: { type: Number, default: 1.5 },
    coverflowEffect: {
      type: Object,
      default: {
        rotate: 0,
        stretch: 50,
        depth: 100,
        modifier: 3,
        slideShadows: false
      }
    },
    breakpoints: {
      type: Object,
      default: {
        1024: { coverflowEffect: { stretch: 100, depth: 150 } },
        768: { coverflowEffect: { stretch: 75, depth: 150 } },
      }
    },
  },
  setup() {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped></style>
