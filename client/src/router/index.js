import Vue from 'vue'
import VueRouter from 'vue-router'
import UserTable from '../views/UserTable.vue'
import UniverseOverview from '../views/UniverseOverview.vue'
import About from '../views/About.vue'

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
    name: 'main',
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
        component: UniverseOverview
      },
      {
        path: '/about',
        name: 'about',
        component: About
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && sessionStorage.token !== 'admin-login') {
    return next('/login')
  }
  next()
})

export default router
