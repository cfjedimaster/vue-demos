import Vue from 'vue'
import Vuex from 'vuex'

import idb from '@/api/idb';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cats:[]
  },
  mutations: {

  },
  actions: {
    async deleteCat(context, cat) {
      console.log('store is being asked to delete '+cat.id);
      await idb.deleteCat(cat); 
    },
    async getCats(context) {
      context.state.cats = [];
      let cats = await idb.getCats();
      cats.forEach(c => {
        context.state.cats.push(c);
      });
    },
    async saveCat(context, cat) {
      await idb.saveCat(cat);
    }
  }
})
