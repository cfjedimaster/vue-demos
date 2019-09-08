import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import api from './api/nps';

export default new Vuex.Store({
  state: {
    states:{
      "AL": "Alabama",
      "AK": "Alaska",
      "AZ": "Arizona",
      "AR": "Arkansas",
      "CA": "California",
      "CO": "Colorado",
      "CT": "Connecticut",
      "DE": "Delaware",
      "FL": "Florida",
      "GA": "Georgia",
      "HI": "Hawaii",
      "ID": "Idaho",
      "IL": "Illinois",
      "IN": "Indiana",
      "IA": "Iowa",
      "KS": "Kansas",
      "KY": "Kentucky",
      "LA": "Louisiana",
      "ME": "Maine",
      "MD": "Maryland",
      "MA": "Massachusetts",
      "MI": "Michigan",
      "MN": "Minnesota",
      "MS": "Mississippi",
      "MO": "Missouri",
      "MT": "Montana",
      "NE": "Nebraska",
      "NV": "Nevada",
      "NH": "New Hampshire",
      "NJ": "New Jersey",
      "NM": "New Mexico",
      "NY": "New York",
      "NC": "North Carolina",
      "ND": "North Dakota",
      "OH": "Ohio",
      "OK": "Oklahoma",
      "OR": "Oregon",
      "PA": "Pennsylvania",
      "RI": "Rhode Island",
      "SC": "South Carolina",
      "SD": "South Dakota",
      "TN": "Tennessee",
      "TX": "Texas",
      "UT": "Utah",
      "VT": "Vermont",
      "VA": "Virginia",
      "WA": "Washington",
      "WV": "West Virginia",
      "WI": "Wisconsin",
      "WY": "Wyoming"
    }, 
    parks:{

    },
    selectedParks:[]
  },
  mutations: {
    cache(state, args) {
      console.log('storing cache for '+args.abbr+ ' and '+args.parks.length + ' parks');
      state.parks[args.abbr] = args.parks;
    },
    clearSelection(state) {
      state.selectedParks = [];
    },
    select(state, parks) {
      state.selectedParks = parks
    }
  },
  actions: {
    async loadParks(context, abbr) {
      // check the cache
      if(context.state.parks[abbr]) {
        console.log('woot a cache exists');
        context.commit('select', context.state.parks[abbr]);
      } else {
        console.log('no cache, sad face');
        let results = await api.getParks(abbr);
        context.commit('cache', {abbr:abbr, parks:results});
        context.commit('select', context.state.parks[abbr]);
      }
    }
  }
})
