import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'main',
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/main',
    component: () => import('@/views/main/Main.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login' && localStorage.getItem('testToken')) {
    next({ path: '/main' })
  } else if (to.path != '/login' && !localStorage.getItem('testToken')) {
    next({ path: '/login' })
  } else next()
})

export default router
