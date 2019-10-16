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
      if(context.state.cats.length === 0) {
        context.state.cats.push({name:'default cat', age:1, id: 1});
        context.state.cats.push({ name: 'cat deux', age: 2, id: 2 });
      }
    },
    async saveCat(context, cat) {
      if(cat.id) {
        context.state.cats.forEach(c => {
          if(c.id === cat.id) {
            c.name = cat.name;
            c.age = cat.age;
          }
        });
      } else {
        cat.id = context.state.cats.length+1;
        context.state.cats.push(cat);
      }
    }
  }
})
