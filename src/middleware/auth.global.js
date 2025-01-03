import { useUser } from '@/stores/user'
import useLogout from '@/composables/useLogout'

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useUser()
    const { resetStore } = useLogout()

    const path = ['/entry/login', '/entry/register']
    if (path.includes(to.path) && store.isLogin) {
        return navigateTo('/member-center')
    }

    if (to.meta.auth && !store.isLogin) {
        resetStore()
        return navigateTo('/entry/login', { params: to.params, query: { redirect: to.fullPath } })
    }
})