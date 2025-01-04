<template>
  <q-layout view="lHh Lpr lFf">
    <app-header class="md:block lt-md:hidden" />
    <mobile-header class="md:hidden lt-md:block" />
    <app-sidebar v-if="!isScreenLargerMd" />
    <q-page-container class="bg-grey-1 !pt-[50px]">
      <nuxt-page />
    </q-page-container>
    <app-footer />
  </q-layout>

</template>

<script>
import { AppHeader, MobileHeader, AppSidebar, AppFooter } from './components'
import { defineComponent } from 'vue-demi'
import useScreen from '@/composables/useScreen'

export default defineComponent({
  components: {
    AppHeader,
    MobileHeader,
    AppSidebar,
    AppFooter,
  },
  setup() {
    // use
    const { isScreenLargerMd } = useScreen()

    return {
      isScreenLargerMd,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
