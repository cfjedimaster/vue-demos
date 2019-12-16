import Vue from 'vue'
import Vuex from 'vuex'

import sudokuModule from '@/api/sudoku.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    grid: null,
    origGrid:null
  },
  mutations: {
    initGrid(state) {
      let string = sudokuModule.sudoku.generate('easy');
      console.log('original string', string);
      state.grid = sudokuModule.sudoku.board_string_to_grid(string);
      // change . to ""
      for(let i=0;i<state.grid.length;i++) {
        for(let x=0;x<state.grid[i].length;x++) {
          if(state.grid[i][x] === '.') state.grid[i][x] = '';
        }
      }
      //used to ensure we can't click on the initial spots
      state.origGrid = JSON.parse(JSON.stringify(state.grid));

    }
  },
  actions: {
  },
  modules: {
  }
})
