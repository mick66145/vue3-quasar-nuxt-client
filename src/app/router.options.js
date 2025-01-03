
/* Layout */
import MainLayout from '@/layouts/MainLayout.vue'

/* Router Modules */
import entryRouter from './modules/entry'
import redirectRouter from './modules/redirect'
import memberCenterRouter from './modules/member-center'

export const constantRoutes = [
    {
        path: '/:catchAll(.*)*',
        component: () => import('@/pages/error-page/404.vue'),
    },
    {
        path: '/:lang?',
        component: MainLayout,
        children: [
            {
                path: '',
                component: () => import('@/pages/front/Front.vue'),
                name: 'Front',
                meta: { title: '首頁' },
            },
        ],
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/pages/error-page/404.vue'),
        hidden: true,
    },
    redirectRouter,
    entryRouter,
    memberCenterRouter,
]

export default {
    routes: (_routes) => constantRoutes,
}
