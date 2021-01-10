import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedin:false,
    lastPath:''
  },
  mutations: {
    setLogin(state, status) {
      state.loggedin = status;
    },
    setLastPath(state, path) {
      state.lastPath = path;
    }
  },
  actions: {
  }
})
