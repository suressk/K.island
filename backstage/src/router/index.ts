import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/edit',
    component: Home,
    children: [{
      path: '/edit',
      name: 'EditBlog',
      meta: {
        title: 'K.island'
      },
      component: () => import('../views/pages/EditBlog.vue')
    }, {
      path: '/reply',
      name: 'Reply',
      component: () => import('../views/pages/Reply.vue')
    }]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requireAuth: true
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//
// })

export default router
