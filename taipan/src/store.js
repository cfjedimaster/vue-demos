import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
starting year for the game
*/
const BASE_YEAR = 1900;

const MONTHS = ["January", "February", "March", "April", "May", "June",
             "July", "August", "September", "October", "November", "December"];

/*
Ports. For now ports just have names but I may add boosts later, like port
X for good Y is good.
*/
const PORTS = [
  {
    name:'Bespin'
  },
  {
    name:'Dagobah'
  },
  {
    name:'Naboo'
  },
  {
    name:'Coruscant'
  },
  {
    name:'New Boston'
  }
];

/*
Goods have a value range representing, generally, what they will sell for.
illegal=true means there is a chance it will be stolen
*/
const GOODS = [
  {
    name:'General',
    salesRange: [5, 20],
    illegal:false
  },
  {
    name:'Arms',
    salesRange: [60, 120],
    illegal:false
  },
  {
    name:'Silk',
    salesRange: [200, 500],
    illegal:false
  },
  {
    name:'Spice',
    salesRange: [3000, 6000],
    illegal:true
  }

];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default new Vuex.Store({
  state: {
    name:'',
    port:null,
    money:0,
    turn:0,
    holdSize:100,
    hold:[],
    prices: [],
    damage:0
  },
  mutations: {
    /*
    called for a new game
    */
    bootstrap(state) {
      state.port = PORTS[0];
      GOODS.forEach(g => {
        state.hold.push({name:g.name, quantity: 0});
      });
    },
    newTurn(state) {
      state.turn++;
      state.prices = [];
      GOODS.forEach(g => {
        let goodPrice = getRandomInt( g.salesRange[0], g.salesRange[1] );
        state.prices.push({name:g.name, price: goodPrice });
      });

    },
    setName(state, name) {
      state.name = name;
    },
    setPort(state, idx) {
      state.port = PORTS[idx];
    }
  },
  getters: {
    gameDate(state) {
      let years = Math.floor((state.turn-1)/12);
      let month = (state.turn-1) % 12;
      return `${MONTHS[month]} ${BASE_YEAR + years}`;
    },
    ports() {
      return PORTS.map(p => { return p.name });
    }
  },
  actions: {

  }
})
