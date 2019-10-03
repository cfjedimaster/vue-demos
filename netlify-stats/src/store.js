import Vue from 'vue'
import Vuex from 'vuex'

const CLIENTID = '51cc9a0eea87fa640e8a4d66c1d58ab9becd489f94087f1748b0db15fee622e2';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clientId:CLIENTID,
    site:null,
    token:null
  },
  mutations: {
    storeSite(state, s) {
      state.site = s;
    },
    storeToken(state, t) {
      state.token = t;
    }
  },
  actions: {

  }
})
