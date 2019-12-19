import Vue from 'vue'
import Vuex from 'vuex'

import sudokuModule from '@/api/sudoku.js';

Vue.use(Vuex);

/*
difficulty: easy,medium,hard,very-hard,insane,inhuman
*/

export default new Vuex.Store({
  state: {
    difficulties: ["easy", "medium", "hard", "very-hard", "insane", "inhuman"],
    grid: null,
    origString:null,
    selected:null,
    wonGame:false
  },
  mutations: {
    initGrid(state, difficulty) {
      state.wonGame = false;
      if(!difficulty) difficulty = state.difficulties[0];
      state.origString = sudokuModule.sudoku.generate(difficulty);
      console.log('original string', state.origString);

      let candidates = sudokuModule.sudoku.get_candidates(state.origString)
      state.grid = sudokuModule.sudoku.board_string_to_grid(state.origString);

      let solution = sudokuModule.sudoku.solve(state.origString);
      let solvedGrid = sudokuModule.sudoku.board_string_to_grid(solution);

      // change . to "", also store a ob instead of just numbers
      for(let i=0;i<state.grid.length;i++) {
        for(let x=0;x<state.grid[i].length;x++) {

          let newVal = {
            value:parseInt(state.grid[i][x],10),
            locked:true,
            candidates:candidates[i][x],
            selected:false,
            solution:parseInt(solvedGrid[i][x],10),
            error:false
          };
          if(state.grid[i][x] === '.') {
            newVal.value = '';
            newVal.locked = false;
          }
          state.grid[i][x] = newVal;
        }
      }
    },
    setNumber(state, x) {
      if(!state.selected) return;
      let row = state.grid[state.selected.x];
      row[state.selected.y].value = x;
      // highlight incorrect answers
      if(x !== state.grid[state.selected.x][state.selected.y].solution) {
        row[state.selected.y].error = true;
      } else {
        row[state.selected.y].error = false;
      }
      console.log(state.grid[state.selected.x][state.selected.y].solution);
      Vue.set(state.grid, state.selected.x, row);
      /*
      did we win? this feels like it should be it's own method
      */
      let won = true;
      for(let i=0;i<state.grid.length;i++) {
        for(let x=0;x<state.grid[i].length;x++) {
          if(state.grid[i][x].value !== state.grid[i][x].solution) won = false;
        }
      }
      if(won) state.wonGame = true;
    },
    setSelected(state, pos) {
      if(state.grid[pos.x][pos.y].locked) return;
      for(let i=0;i<state.grid.length;i++) {
       let row = state.grid[i];
       for(let x=0;x<row.length;x++) {
         if((i !== pos.x || x !== pos.y) && row[x].selected) { 
           row[x].selected = false;
         }
         if(i === pos.x && x === pos.y) {
           row[x].selected = true;
           state.selected = pos;
         }
       }
       Vue.set(state.grid, i, row);
     }
    }
  },
  actions: {
  }
})
