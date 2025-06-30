import { createWebHashHistory, createRouter } from 'vue-router'
import userRouters from './userRouters.ts'

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
      redirect: '/attendance-settings/positioning-management',
      children: userRouters
    }
  ]
})

export default router
