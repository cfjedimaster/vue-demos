import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

Vue.config.productionTip = false

Vue.filter("num", value => {
  if (!window.Intl) return value;
  return new Intl.NumberFormat("en-US", {
    style: "decimal"
  }).format(value);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
