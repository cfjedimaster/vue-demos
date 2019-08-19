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

//how much each upgrade adds
const HOLD_UPGRADE = 10;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default new Vuex.Store({
  state: {
    name:'',
    port:null,
    money:100000,
    turn:0,
    holdSize:100,
    hold:[],
    prices: [],
    damage:0,
    randomMessage:'',
    newPortIndex:null
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
    /*
    A random event is one of the following:
      Nothing (ie nothing happened, no event
      Storm sends you to X port
      Storm damages you Y percentage points
      Pirates attack - steal items + Y damage

    Also note we skip random events for the first ten turns or so

    */
    generateRandomEvent(state, info) {
      state.randomMessage = '';
      state.offerUpgrade = false;

      if(state.turn < 10) return;

      let rand = getRandomInt(0, 100);

      //nothing
      if(rand < 60) return;

      if(rand >= 60 && rand < 70) {
        console.log('storm redirection');
        let newPort = null;

        while(!newPort || newPort.name === info.destination.name) {
          state.newPortIndex = getRandomInt(0, PORTS.length);
          newPort = PORTS[state.newPortIndex];
        }
        state.randomMessage = 'A storm has blown you off course to ' + newPort.name;
        console.log(state.randomMessage);
      }

      if(rand >= 70 && rand < 80) {
        let damage = getRandomInt(1, 12);
        console.log('Storm damages you for '+damage);
        state.randomMessage = 'A violent storm damages your ship!';
        state.damage += damage;
      }

      if(rand >= 80 && rand < 90) {
        //note, if your hold is empty, we ignore everything;
        //now get the hold and filter to items with stuff
        let heldItems = state.hold.filter(h => {
          return h.quantity > 0;
        });
        if(heldItems.length === 0) return;

        console.log('pirates attack and damage and steal shit');
        //first, do damange, bit less than storm to be nice
        let damage = getRandomInt(1, 7);
        console.log('Storm damages you for ' + damage);

        console.log('state.hold with items',JSON.stringify(heldItems));
        //select the index to steal
        let stealIndex = getRandomInt(0, heldItems.length);
        console.log('going to steal from '+JSON.stringify(heldItems[stealIndex]));
        let stealAmt = getRandomInt(1, heldItems[stealIndex].quantity + 1);
        console.log('stealing '+stealAmt);
        let target = -1;
        for(let i=0;i<state.hold.length;i++) {
          if(heldItems[stealIndex].name === state.hold[i].name) target = i;
        }

        state.randomMessage = 'Pirates attack your ship and steal some cargo!';
        state.damage += damage;
        state.hold[target].quantity -= stealAmt;

      }

      if(rand >= 90) {
        state.offerUpgrade = true;
      }
      
    },
    newTurn(state) {
      state.turn++;
      state.prices = [];
      GOODS.forEach(g => {
        let goodPrice = getRandomInt( g.salesRange[0], g.salesRange[1] );
        state.prices.push({name:g.name, price: goodPrice });
      });

    },
    purchase(state, order) {
      console.log('try to buy '+order.good.name + ' amt '+order.qty);
      let total = order.good.price * order.qty;
      if(total <= state.money) {
        state.hold.forEach((h,i) => {
          console.log('h is '+h);
          if(h.name === order.good.name) {
            state.hold[i].quantity += order.qty;
            state.money -= total;
          }
        });
      }
    },
    repair(state, {total, repairCost}) {
      console.log('going to do a repair of '+total+ ' of  '+repairCost);
      console.log('current damage is '+state.damage);
      //what percent is total of state.
      let perc = total / repairCost;
      console.log('that perc is '+perc);
      let repaired = Math.ceil(perc * state.damage);
      console.log('total repaired is '+repaired);
      state.damage -= repaired;
      //sanity check
      if(state.damage < 0) state.damage = 0;
      state.money -= total;
    },
    sale(state, order) {
      console.log('try to sell '+order.good.name + ' amt '+order.qty);
      let total = order.good.price * order.qty;
      let holdIndex = -1;
      for(let i=0;i<state.hold.length;i++) {
        if(order.good.name === state.hold[i].name) {
          holdIndex = i;
          // do you have enough?
          if(state.hold[i].quantity < order.qty) return;
        }
      }
      state.hold[holdIndex].quantity -= order.qty;
      state.money += total;
    },
    setName(state, name) {
      state.name = name;
    },
    setPort(state, idx) {
      state.port = PORTS[idx];
    },
    upgrade(state, { cost }) {
      console.log('doing an upgrade');
      state.money -= cost;
      state.holdSize += HOLD_UPGRADE;
      state.offerUpgrade = false;
    }
  },
  getters: {
    gameDate(state) {
      let years = Math.floor((state.turn-1)/12);
      let month = (state.turn-1) % 12;
      return `${MONTHS[month]} ${BASE_YEAR + years}`;
    },
    goods() {
      return GOODS.map(g => { return g.name });
    },
    ports() {
      return PORTS.map(p => { return p.name });
    },
    rank(state) {
      // your final score is just based on money, cuz life
      if(state.money < 10000) return 'Deck Hand';
      if(state.money < 50000) return 'Ensign';
      if (state.money < 100000) return 'Lieutenant';
      if (state.money < 1000000) return 'Commander';
      //below is 10 million, just fyi ;)
      if (state.money < 10000000) return 'Captain';
      //below is 100 million, just fyi ;)
      if (state.money < 100000000) return 'Admiral';
      return 'Grand Admiral';
    },
    repairCost(state) {
      // the cost to repair is based on the size of your ship and how much damage;
      let cost = state.holdSize * state.damage * (1 + getRandomInt(1,10)/10);
      return Math.floor(cost);
    },
    shipUsedSpace(state) {
      let used = 0;
      state.hold.forEach(h => {
        used += h.quantity;
      });
      return used;
    },
    upgradeCost(state) {
      // the cost to upgrade is based on the size of your ship;
      let cost = state.holdSize * 200 * (1 + getRandomInt(5,10)/10);
      return Math.floor(cost);
    }
  },
  actions: {

  }
})
