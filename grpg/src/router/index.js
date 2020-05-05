import Vue from 'vue'
import VueRouter from 'vue-router'
import Title from '../views/Title.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Title',
    component: Title
  },
  {
    path: '/setup',
    name: 'Setup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "setup" */ '../views/Setup.vue')
  },
    {
    path: '/game',
    name: 'Game',
    component: () => import(/* webpackChunkName: "game" */ '../views/Game.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
