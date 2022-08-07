import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/main/Main.vue'),
    children: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        name: 'Home',
        meta: {
          name: '首页',
        },
        component: () => import('@/views/main/home/Home.vue'),
      },
      {
        path: '/student',
        name: 'Student',
        meta: {
          name: '学生信息',
        },
        component: () => import('@/views/main/student/Student.vue'),
      },
      {
        path: '/grade',
        name: 'Grade',
        meta: {
          name: '学生成绩',
        },
        component: () => import('@/views/main/student/Grade.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue'),
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
