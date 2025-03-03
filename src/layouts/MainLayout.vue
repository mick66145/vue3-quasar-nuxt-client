<template>
  <q-layout view="lHh Lpr lFf">
    <app-header class="xl:block lt-xl:hidden" />
    <mobile-header class="xl:hidden lt-xl:block" />
    <app-sidebar class="xl:hidden lt-xl:block" overlay :breakpoint="1200" />
    <q-page-container class="bg-grey-1 !pt-[50px]">
      <nuxt-page />
    </q-page-container>
    <app-footer />
  </q-layout>

</template>

<script>
import { AppHeader, MobileHeader, AppSidebar, AppFooter } from './components'
import { defineComponent } from 'vue-demi'

export default defineComponent({
  components: {
    AppHeader,
    MobileHeader,
    AppSidebar,
    AppFooter,
  },
  setup() {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped></style>
