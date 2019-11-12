import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import idb from '@/api/idb';

export default new Vuex.Store({
  state: {
    sounds:[]
  },
  mutations: {
  },
  actions: {
    async deleteSound(context, sound) {
      console.log('store is being asked to delete '+sound.id);
      await idb.deleteSound(sound); 
    },
    async loadSounds(context) {
      console.log('loadSounds');
      context.state.sounds = [];
      let sounds = await idb.getSounds();
      sounds.forEach(s => {
        context.state.sounds.push(s);
      });
    },
    async saveSound(context, sound) {
      await idb.saveSound(sound);
    }
  },
  modules: {
  }
})
