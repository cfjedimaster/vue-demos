import Vue from "vue";
import App from "./App.vue";

import router from "./routes";
import store from "./store";

Vue.config.productionTip = false;

Vue.filter("money", value => {
  if (!window.Intl) return value;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
