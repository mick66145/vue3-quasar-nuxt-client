<template>
  <q-header class="flex-center row fixed-top">
    <q-toolbar class="bg-white flex-center row">
      <q-avatar class="left-3 absolute">
        <base-image width="30px" heigth="30px" src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
      </q-avatar>
      <base-flat-button no-wrap to="/">
        <q-toolbar-title shrink> {{ $t('g.system.system-name') }}</q-toolbar-title>
      </base-flat-button>
      <base-icon-button class="right-3 absolute " icon="menu" color="blue-grey" @click="onToggle" />
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useApp } from '@/stores/app'
export default defineComponent({
  components: {
  },
  setup() {
    // data
    const storeApp = useApp()

    // methods
    const onToggle = () => {
      storeApp.toggleSideBar()
    }

    return {
      onToggle,
    }
  },
})
</script>

<style lang="postcss" scoped>
.q-header {
  @apply top-0 right-0 left-0 fixed;
  @apply bg-white bg-opacity-0;
}
</style>
