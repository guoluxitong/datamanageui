import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {path: '/login',component: () => import('../views/login/index'),hidden: true},
  {
    path:'/home',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('../views/home/index'),
        name: 'home',
        meta: { title: '首页', noCache: true}
      }
    ]
  },
  {
    path:'/enterprise',
    component: Layout,
    children: [
      {
        path: 'enterprise',
        component: () => import('../views/enterprise/index'),
        name: '企业管理',
        meta: { title: '企业管理', noCache: true}
      }
    ]
  },
  {
    path:'/customer',
    component: Layout,
    children: [
      {
        path: 'customer',
        component: () => import('../views/customer/index'),
        name: '客户管理',
        meta: { title: '客户管理', noCache: true}
      }
    ]
  },
  {
    path:'/company',
    component: Layout,
    children: [
      {
        path: 'company',
        component: () => import('../views/company/index'),
        name: '公司管理',
        meta: { title: '公司管理', noCache: true}
      }
    ]
  },
  {
    path:'/agent',
    component: Layout,
    children: [
      {
        path: 'agent',
        component: () => import('../views/agent/index'),
        name: '代理管理',
        meta: { title: '代理管理', noCache: true}
      }
    ]
  },
  {
    path:'/enduser',
    component: Layout,
    children: [
      {
        path: 'enduser',
        component: () => import('../views/enduser/index'),
        name: '终端用户管理',
        meta: { title: '终端用户管理', noCache: true}
      }
    ]
  },
  {
    path:'/org',
    component: Layout,
    children: [
      {
        path: 'org',
        component: () => import('../views/org/index'),
        name: '组织类型管理',
        meta: { title: '组织类型管理', noCache: true}
      }
    ]
  },
  {
    path:'/home',
    component: Layout,
    children: [
      {
        path: 'employee',
        component: () => import('../views/employee/index'),
        name: '用户管理',
        meta: { title: '用户管理', noCache: true}
      }
    ]
  },

  {
    path:'/admin-device',
    component: Layout,
    children: [
      {
        path: 'device',
        component: () => import('../views/device/admin-device'),
        name: '设备管理',
        meta: { title: '设备管理', noCache: true}
      }
    ]
  },
  {
    path:'/device-type',
    component: Layout,
    children: [
      {
        path: 'device-type',
        component: () => import('../views/device/device-type'),
        name: '设备类型管理',
        meta: { title: '设备类型管理', noCache: true}
      }
    ]
  }
]
export default new Router({
  mode: 'history',
  base:__dirname,
  routes:constantRouterMap
})
