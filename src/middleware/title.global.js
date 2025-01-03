import useTitle from '@/composables/useTitle'

export default defineNuxtRouteMiddleware((to, from) => {

    if (process.client) {
        const { title } = useTitle()
        document.title = title.value;
    }
})