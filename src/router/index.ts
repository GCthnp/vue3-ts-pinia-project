import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'main',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/main/Main.vue'),
    children: [
      {
        path: '/main',
        redirect: '/main/home',
      },
      {
        path: '/main/home',
        name: 'Home',
        meta: {
          name: '首页',
        },
        component: () => import('@/views/main/home/Home.vue'),
      },
      {
        path: '/main/student',
        name: 'Student',
        meta: {
          name: '学生信息',
        },
        component: () => import('@/views/main/student/Student.vue'),
      },
      {
        path: '/main/test',
        name: 'Test',
        component: () => import('@/views/main/home/Home.vue'),
      },
    ],
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
