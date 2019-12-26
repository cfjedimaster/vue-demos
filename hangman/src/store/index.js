import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const MAX_MISSES = 8;

export default new Vuex.Store({
  state: {
    word: '',
    pickedLetters:[],
    words:[],
    misses: 0,
    gameOver:false,
    won:false
  },
  mutations: {
    addLetter(state, letter) {
      if(state.pickedLetters.indexOf(letter) >= 0) return;
      state.pickedLetters.push(letter);
      state.pickedLetters.sort();
      if(state.word.indexOf(letter) === -1) state.misses++;
    },
    gameOver(state, won) {
      state.gameOver = true;
      state.won = won;
    },
    initGame(state, word) {
      state.word = word;
      state.misses = 0;
      state.gameOver = false;
      state.won = false;
      state.pickedLetters = [];
    },
    setWords(state, words) {
      state.words = words;
    }
  },
  getters: {
    hangman(state) {
      if(state.misses === 0) return "images/h0.png";
      if(state.misses === 1) return "images/h1.png";
      if(state.misses === 2 || state.misses === 3) return "images/h2.png";
      if(state.misses === 4) return "images/h3.png";
      if(state.misses === 5) return "images/h4.png";
      if(state.misses === 6 || state.misses === 7) return "images/h5.png";
      return "images/h6.png";
    },
    maskedWord(state) {
      let maskedWord = '';
      for(let i=0;i<state.word.length;i++) {
        let char = state.word.charAt(i);
        if(state.pickedLetters.indexOf(char) === -1) {
          maskedWord += '-';
        } else {
          maskedWord += char;
        }
      }
      return maskedWord;
    }
  },
  actions: {
    guess(context, letter) {
      context.commit('addLetter', letter);

      // did we win?
      if(context.getters.maskedWord === context.state.word) {
        context.commit('gameOver', true);
      }
      if(context.state.misses === MAX_MISSES) {
        context.commit('gameOver', false);
      }

    },
    async selectWord(context) {
      //did we load the words yet?
      if(context.state.words.length === 0) {
        let resp = await fetch('./words.txt');
        let text = await resp.text();
        context.commit('setWords', text.split('\n'));
      }
      let selected = context.state.words[getRandomInt(0, context.state.words.length)];
      //console.log('selected word',selected);
      context.commit('initGame', selected);
    }
  }
})
