import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import store from './store'

Vue.use(Router)

const router = new Router({
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
});

router.beforeEach((to, from, next) => {
  if(!store.state.token &&
    (to.name === 'analytics' || to.name === 'sites')) {
      next('/');
  }
  next();
});

export default router;
