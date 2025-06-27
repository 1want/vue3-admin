import { createWebHashHistory, createRouter } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      name: 'layout',
      path: '/',
      component: () => import('@/layout/index.vue'),
      redirect: '/positioning-management',
      children: [
        {
          name: 'positioning-management',
          path: 'positioning-management',
          component: () => import('@/views/positioning-management/index.vue')
        },
        {
          name: 'approval-management',
          path: 'approval-management',
          component: () => import('@/views/approval-management/index.vue')
        }
      ]
    }
  ]
})

export default router
