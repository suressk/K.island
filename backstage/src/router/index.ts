import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'island',
    redirect: '/add',
    component: Home,
    children: [{
      path: 'add',
      name: 'SoulArea',
      meta: {
        title: 'K.island'
      },
      component: () => import('../views/pages/AddRecord.vue')
    }, {
      path: 'management',
      name: 'Management',
      component: () => import('../views/pages/ManageRecords.vue')
    }, {
      path: 'reply',
      name: 'Reply',
      component: () => import('../views/pages/ConcatReply.vue')
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
    path: '/:catchAll(.*)',
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
