import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import types from '@/store/constants/types'
Vue.use(Router)

const router = new Router({
    // mode: 'history',
    linkActiveClass: 'active',
    routes: [
        { path: '/login',        name: 'login',         component: () => import('./views/Login.vue')        }, // 登录
        { path: '/panel',        name: 'panel',         component: () => import('./views/Panel.vue')        }, // 主面板
        { path: '/home',         name: 'home',          component: () => import('./views/Home.vue')         }, // 官网首页
        { path: '/about',        name: 'about',         component: () => import('./views/About.vue')        }, // 走进裕丰
        { path: '/product',      name: 'product',       component: () => import('./views/Product.vue')      }, // 产品管理
        { path: '/platform',     name: 'platform',      component: () => import('./views/Platform.vue')     }, // 平台管理
        { path: '/system',       name: 'system',        component: () => import('./views/System.vue')       }, // 系统模块管理
        { path: '/news',         name: 'news',          component: () => import('./views/News.vue')         }, // 新闻中心
        { path: '/message',      name: 'message',       component: () => import('./views/Message.vue')      }, // 留言管理
        { path: '*', redirect: { name: 'login' }                                                            }  //默认
    ]
})

router.beforeEach((to, from, next) => {
    store.commit(types.APP_SET_ROUTER, {to: to.name, from: from.name})
    next(true)
})

export default router
