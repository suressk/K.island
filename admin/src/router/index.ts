import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/index.vue'
import { getStorageToken } from '../utils'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'island',
        redirect: '/overview',
        component: Home,
        children: [{
            path: 'overview',
            name: 'overview',
            meta: {
                title: 'Overview'
            },
            component: () => import('../views/Overview/index.vue')
        }, {
            path: 'edit',
            name: 'edit',
            meta: {
                title: 'Edit Article'
            },
            component: () => import('../views/record/Edit.vue')
        }, {
            path: 'list',
            name: 'list',
            meta: {
                title: 'Article List'
            },
            component: () => import('../views/record/List.vue')
        }, {
            path: 'messages',
            name: 'messages',
            meta: {
                title: 'Messages'
            },
            component: () => import('../views/Message/index.vue')
        }, {
            path: 'subscribes',
            name: 'subscribes',
            meta: {
                title: 'Subscribes'
            },
            component: () => import('../views/Subscribe/index.vue')
        }, {
            path: 'comments',
            name: 'comments',
            meta: {
                title: 'Comments'
            },
            component: () => import('../views/Comment/index.vue')
        }, {
            path: 'setting',
            name: 'setting',
            meta: {
                title: 'Setting'
            },
            component: () => import('../views/Setting/index.vue')
        }]
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            requireAuth: true,
            title: 'Sign In'
        },
        component: () => import('../views/Login.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        meta: {
            title: 'Not Found'
        },
        component: () => import('../views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to: any, from: any, next: any) => {
    // next()
    const token = getStorageToken() // null | token
    // 去往非登录页且无 token
    if (!to.path.includes('login') && !token) {
        next('/login')
    } else {
        next()
    }
})

// 路由后置守卫 由路由信息 设置标签页标题
router.afterEach((to: any) => {
    let title: string
    if (to.meta && to.meta.title) {
        title = to.meta.title + ' | K.island'
    } else {
        title = 'K.island'
    }
    document.title = title
})

export default router
