import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'island',
    redirect: '/overview',
    component: Home,
    children: [{
      path: 'overview',
      name: 'Overview',
      meta: {
        title: '瞧瞧这人气'
      },
      component: () => import('../views/pages/Overview.vue')
    }, {
      path: 'add',
      name: 'Add',
      meta: {
        title: '新品上架哦'
      },
      component: () => import('../views/pages/AddRecord.vue')
    }, {
      path: 'management',
      name: 'Management',
      meta: {
        title: '杂货翻新啦'
      },
      component: () => import('../views/pages/ManageRecords.vue')
    }, {
      path: 'reply',
      name: 'Reply',
      meta: {
        title: '聊个五毛钱的天'
      },
      component: () => import('../views/pages/ConcatReply.vue')
    }]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requireAuth: true,
      title: '嘀！加油站'
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    meta: {
      title: '诶？！你迷路了吗'
    },
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
