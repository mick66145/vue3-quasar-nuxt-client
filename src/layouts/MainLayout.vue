<template>
  <div>
    <app-header />
    <nuxt-page />
    <app-footer />
  </div>
</template>

<script>
import { AppHeader, AppFooter } from './components'
export default defineComponent({
  components: {
    AppHeader,
    AppFooter,
  },
  setup() {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped></style>
