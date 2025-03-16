<template>
  <swiper-container ref="containerRef" class="mySwiper" :space-between="spaceBetween" :loop="loop" :effect="effect"
    :autoplay="autoplay" :navigation="navigation" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <slot name="default" class="swiper-slide" />
  </swiper-container>
</template>
<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    loop: { type: Boolean, default: true },
    navigation: { type: Boolean, default: true },
    autoplay: { type: Boolean, default: true },
    spaceBetween: { type: Number, default: 50 },
    effect: { type: String },
  },
  setup(props) {

    //ref
    const containerRef = ref()

    //data
    const swiper = useSwiper(containerRef, {})

    return {
      swiper,

    }
  },
})
</script>

<style lang="postcss" scoped>
:deep(.mySwiper) {
  .swiper {

    .swiper-button-prev,
    .swiper-button-next {
      @apply border border-solid bg-gray-800/50 border-gray-300 text-gray-500/50;
      @apply rounded-full h-[45px] w-[45px];

      &::after {
        @apply font-semibold text-base text-white;
      }
    }

    .swiper-button-prev:hover,
    .swiper-button-next:hover {
      @apply bg-gray-700/70;

      &::after {
        @apply text-white;
      }
    }
  }

  .swiper-slide {
    @apply relative h-fit;

    .slide-content {
      @apply absolute left-1/2 top-1/2 -translate-x-3/4 -translate-y-1/2 text-white lt-md:-translate-x-1/2;

      h4 {
        @apply font-black lt-md:text-xl;
      }
    }
  }
}
</style>
