import vueEsign from 'vue-esign'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(vueEsign)
});
