<template>
  <q-header elevated class="bg-white text-blue-grey-7">
    <container-block class="container">
      <q-toolbar class="p-0">
        <base-flat-button class="pl-0" no-wrap to="/">
          <q-toolbar-title shrink>
            <span class="text-base">{{ $t('g.system.system-name') }}</span>
          </q-toolbar-title>
        </base-flat-button>
        <!-- <q-space /> -->
        <div class="flex no-wrap items-center">
          <base-flat-button size="1rem" color="blue-grey" v-for="menuItem in menu" :key="menuItem"
            :label="menuItem.name">
            <base-menu :options="menu.children" />
          </base-flat-button>
        </div>
      </q-toolbar>
    </container-block>

  </q-header>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useFrontendMenu } from '@/stores/frontendMenu'

export default defineComponent({
  components: {
  },
  setup() {
    // data
    const frontendmenuStore = useFrontendMenu()

    // computed
    const menu = computed(() => {
      return [].concat(frontendmenuStore.frontendMenuList)
    })

    return {
      menu,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
