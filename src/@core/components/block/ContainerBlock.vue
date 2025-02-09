<template>
  <div>
    <slot />
  </div>
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

<style lang="scss" scoped>
@import "@/assets/styles/abstracts/variables";
$container-xl-padding: 49px;
$container-lg-padding: 29px;
$container-md-padding: 1px;
$container-sm-padding: 17px;
$container-xs-padding: 5px;

.container,
.container-sm,
.container-md,
.container-lg,
.container-xl {
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
}

@media (max-width: $breakpoint-xs-max) {

  .container,
  .container-sm,
  .container-md,
  .container-lg,
  .container-xl {
    max-width: 100%;
  }
}

@media (min-width: $breakpoint-sm-min) {

  .container,
  .container-sm {
    max-width: $breakpoint-xs - $container-xs-padding;
  }
}

@media (min-width: $breakpoint-md-min) {

  .container,
  .container-sm,
  .container-md {
    max-width: $breakpoint-sm - $container-sm-padding;
  }
}

@media (min-width: $breakpoint-lg-min) {

  .container,
  .container-sm,
  .container-md,
  .container-lg {
    max-width: $breakpoint-md - $container-md-padding;
  }
}

@media (min-width: $breakpoint-xl-min) {

  .container,
  .container-sm,
  .container-md,
  .container-lg,
  .container-xl {
    max-width: $breakpoint-lg - $container-lg-padding;
  }
}

@media (min-width: $breakpoint-2xl-min) {

  .container,
  .container-sm,
  .container-md,
  .container-lg,
  .container-xl,
  .container-2xl {
    max-width: $breakpoint-xl - $container-xl-padding;
  }
}
</style>
