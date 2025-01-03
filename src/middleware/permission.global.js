import { useUser } from '@/stores/user'
import useLogout from '@/composables/useLogout'
import { navigateTo } from '#app'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useUser()

    if (store.isLogin) {
        const info = store.info
        if (info) {
            return
        } else {
            try {
                await Promise.all([store.whoami(), store.permission()])
                return navigateTo({ ...to, replace: true })
            } catch (error) {
                const { resetStore } = useLogout()
                resetStore()
                return navigateTo(`/entry/login?redirect=${to.path}`)
            }
        }
    } else {
        return
    }
})