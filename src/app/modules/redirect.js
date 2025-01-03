
const redirectRouter = {
  path: '/redirect',
  redirect: { name: 'BindRedirect' },
  children: [
    {
      path: '/bind-redirect',
      name: 'BindRedirect',
      component: () => import('@/pages/redirect/BindRedirect.vue'),
    },
  ],
}

export default redirectRouter
