import Vue from 'vue'
import Vuex from 'vuex'

import { player } from './player';
import { map } from './map';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    player,
    map
  }
})
