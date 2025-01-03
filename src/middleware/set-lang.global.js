import { useLanguageSetting } from '@/stores/languageSetting'

export default defineNuxtRouteMiddleware((to, from) => {

    if (process.server) {

        const languageStore = useLanguageSetting()
        const i18n = useNuxtApp().$i18n
        const { lang } = to.params
        if (lang) {
            if (!languageStore.isValidLang(lang)) {
                return navigateTo('/404')
            }
            i18n.setLocale(lang)
        }
        else {
            const languageCookie = useCookie('language')
            if (languageCookie.value && languageStore.isValidLang(languageCookie.value)) {
                i18n.setLocale(languageCookie.value)
            } else {
            }
        }
    }
})