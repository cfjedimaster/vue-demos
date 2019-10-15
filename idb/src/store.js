import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cats:[]
  },
  mutations: {

  },
  actions: {
    deleteCat(context, cat) {
      console.log('store is being asked to delete '+cat.id);
      context.state.cats = context.state.cats.filter(c => {
        return c.id != cat.id;
      });
    },
    getCats(context) {
      console.log('ran');
      context.state.cats.push({name:'default cat', age:1, id: 1});
      context.state.cats.push({ name: 'cat deux', age: 2, id: 2 });
      console.log(context.state.cats);
    }
  }
})
