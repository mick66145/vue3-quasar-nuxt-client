<template>
  <header class="bg-white">
    <nav class="flex items-center justify-between px-4">
      <a href="#" class="p-1.5">
        <span class="text-primary">{{ $t('g.system.system-name') }}</span>
      </a>
    </nav>
  </header>
</template>

<script>
import { defineComponent } from 'vue-demi'
export default defineComponent({
  setup() {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped></style>
