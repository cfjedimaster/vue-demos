import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/callback',
      name: 'callback',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "callback" */ './views/Callback.vue')
    },
    {
      path: '/sites',
      name: 'sites',
      component: () => import(/* webpackChunkName: "sites" */ './views/Sites.vue')
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: () => import(/* webpackChunkName: "analytics" */ './views/Analytics.vue')
    }
  ]
})
