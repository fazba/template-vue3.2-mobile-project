import { createRouter, createWebHistory } from 'vue-router'
import { Toast } from 'vant'
import { sessionCache } from '@/utils/storage'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/Login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      component: () => import('@/views/index/Index.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  Toast.loading({
    duration: 0,
    forbidClick: true,
    message: '加载中...',
  })
  if (to.path === '/login') return next()
  if (sessionCache.getItem('userType') == null) return next('/login')
  if (to.matched.length === 0) {
    from.path ? next({ path: from.path }) : next('/')
  } else {
    next()
  }
})
router.afterEach(() => {
  Toast.clear()
})
export default router
