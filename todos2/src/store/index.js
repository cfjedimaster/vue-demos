import Vue from 'vue'
import Vuex from 'vuex'

import idb from '@/api/idb';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    sortedToDos(state) {
      return state.todos.slice().sort((a,b) => {
        if(!a.done && b.done) return -1;
        if(a.done && b.done) return 0;
        if(a.done && !b.done) return 1;
      });
    }
  },
  mutations: {
    addToDo(state, todo) {
      state.todos.unshift(todo);
    },
    clearToDos(state) {
      state.todos = [];
    },
    toggleToDo(state, id) {
      state.todos = state.todos.map(t => {
        if(t.id === id) t.done = !t.done;
        return t;
      });
    }

  },
  actions: {
    async loadToDos(context) {
      context.commit('clearToDos');
      context.state.todos = [];
      let todos = await idb.getToDos();
      todos.forEach(t => {
        context.commit('addToDo', t);
      });
    },
    async saveToDo(context, todo) {
      await idb.saveToDo(todo);
      context.dispatch('loadToDos');
    },
    async toggleToDo(context, todo) {
      todo.done = !todo.done;
      await idb.saveToDo(todo);
      context.dispatch('loadToDos');
    }
  }
})
