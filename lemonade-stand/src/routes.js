import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./views/Home";
import Game from "./views/Game";
import Report from "./views/Report";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/game",
    component: Game
  },
  {
    path: "/report",
    component: Report
  }
];

export default new VueRouter({
  routes
});
