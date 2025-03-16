<template>
  <div>
    <base-swiper :space-between="spaceBetween" :loop="false" effect="cards" :autoplay="false"
      :slides-per-view="slidesPerView" :cardsEffect="cardsEffect" :navigation="navigation">
      <slot name="default" />
    </base-swiper>
  </div>
</template>
<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    navigation: { type: Boolean, default: true },
    spaceBetween: { type: Number, default: 50 },
    slidesPerView: { type: Number, default: 1 },
    cardsEffect: {
      type: Object,
      default: {
        rotate: 10, slideShadows: false
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
