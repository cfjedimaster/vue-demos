import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedin:false
  },
  mutations: {
    setLogin(state, status) {
      state.loggedin = status;
    }
  },
  actions: {
  },
  modules: {
  }
})
