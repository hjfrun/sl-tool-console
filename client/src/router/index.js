import Vue from 'vue'
import VueRouter from 'vue-router'
import UserTable from '../views/UserTable.vue'
import UniverseOverview from '../views/UniverseOverview.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
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

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
