import Vue from 'vue'
import VueRouter from 'vue-router'
import UserTable from '../views/UserTable.vue'

import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/',
        name: 'user',
        component: UserTable
      },
      {
        path: '/universe-overview',
        name: 'universe-overview',
        component: () => import(/* webpackChunkName: "universe-overview" */ '../views/UniverseOverview.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !sessionStorage.token) {
    return next({ name: 'login', params: { message: 'Please login first' } })
  }
  next()
})

export default router
