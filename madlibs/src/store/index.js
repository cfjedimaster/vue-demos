import Vue from 'vue'
import Vuex from 'vuex'
import marked from 'marked';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    madlibs:null,
    madlib:null,
    answers:null
  },
  getters: {
    prompts(state) {
      if(state.madlib) return state.madlib.prompts;
      return [];
    },
    render(state) {
      /*
      current bug, when i select a new madlib, this runs cuz
      prompts changes, but answers is []. Hence the new
      if below. Smells wrong though.
      */
      if(state.madlib.prompts.length != state.answers.length) return '';
      let text = state.madlib.text;
      for(let i=0;i<state.madlib.prompts.length;i++) {
        let answer = state.answers[i];
        let prompt = '{' + state.madlib.prompts[i] + '}';
        text = text.replace(prompt, '**'+answer+'**');
        //console.log(`replace ${answer} for ${prompt} in ${text}`);
      }
      return marked(text);
    }
  },
  mutations: {
    setAnswers(state, a) {
      state.answers = a;
    },
    pickMadLib(state) {
      state.madlib = state.madlibs[getRandomInt(0, state.madlibs.length)];
      state.answers = [];
    },
    setMadLibs(state, data) {
      state.madlibs = data;
    }
  },
  actions: {
    async initMadLib(context) {
      if(!context.state.madlibs) {
        console.log('need to load madlibs');
        let result = await fetch('./data.txt');
        let data = await result.text();
        let parts = data.split('---');
        parts = parts.map(p => fixRawMadLib(p));
        context.commit('setMadLibs', parts);
        context.commit('pickMadLib');
      } else context.commit('pickMadLib');

    }
  },
  modules: {
  }
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function fixRawMadLib(str) {
  let result = {};
  // first trim any potential white space around it
  result.text = str.trim();
  result.prompts = [];
  let matches = result.text.matchAll(/{.*?}/g);
  if(matches) {
    for(let match of matches) {
      let prompt = match[0];
      prompt = prompt.replace(/[{}]/g, '');
      result.prompts.push(prompt);
    }
  }

  return result;
}