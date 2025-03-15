import ContainerBlock from './block/ContainerBlock.vue'
import BaseSwiper from './swiper/BaseSwiper.vue'
import CoverflowSwiper from './swiper/CoverflowSwiper.vue'
import CardSwiper from './swiper/CardSwiper.vue'

export default {
  install(app) {
    app.component('ContainerBlock', ContainerBlock)
    app.component('BaseSwiper', BaseSwiper)
    app.component('CoverflowSwiper', CoverflowSwiper)
    app.component('CardSwiper', CardSwiper)
  },
}
