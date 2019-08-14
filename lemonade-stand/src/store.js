import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/*
forecast posibilities and their impacts on sales
*/
const FORECASTS = [
  {
    label: "Sunny",
    salesRange: [60, 90],
    chanceOfRain: 10
  },
  {
    label: "Cloudy",
    salesRange: [40, 60],
    chanceOfRain: 40
  },
  {
    label: "Storms",
    salesRange: [20, 40],
    chanceOfRain: 70
  },
  {
    label: "Heat Wave",
    salesRange: [70, 100],
    chanceOfRain: 5
  },
  {
    label: "Partly Cloudy",
    salesRange: [50, 70],
    chanceOfRain: 20
  }
];

const SIGN_COST = 15;
const RAIN_PENALTY = 33;

// Credit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default new Vuex.Store({
  state: {
    day: 0,
    assets: 200,
    forecast: null,
    signCost: SIGN_COST,
    errors: [],
    message: "",
    glassesSold: null,
    expenses: null,
    income: null
  },
  mutations: {
    doSales(state, salesData) {
      console.log("Attempting to do sales with " + JSON.stringify(salesData));
      // reset errors
      state.errors = [];
      if (salesData.glasses <= 0)
        state.errors.push(
          "You must enter a positive number of glasses to sell."
        );

      if (salesData.signs < 0)
        state.errors.push("You can only buy a positive number of signs.");
      if (salesData.cost < salesData.costOfLemonade)
        state.errors.push(
          "You can't sell glasses for less than they are worth."
        );

      let totalCost =
        salesData.glasses * salesData.costOfLemonade +
        salesData.signs * state.signCost;
      console.log("totalCost", totalCost);

      if (totalCost > state.assets)
        state.errors.push(
          `Your cost (${totalCost / 100}) is more than you have.`
        );

      if (state.errors.length > 0) return;

      /*
        Ok, so a few things here. We have a forecast, and that gives us a range of sales, 
        ie on sunny days you can expect to sell 60-100% of your inventory. 

        The # of signs though has an impact, 1 to 0 signs will reduce your chance. Many signs
        will help, but to a max (the user doesnt know)

        Finally, we have a random chance of rain that is higher with cloudy and partly cloudy, 
        rain reduces your sales range too. We could add more things like construction on the street, etc

        Nope, not finally, cost of lemonade impacts sales too
      */

      //Ok, first get the range
      let range = state.forecast.salesRange;
      console.log("current range is " + range);

      //now determine signs bonus
      let signsBonus = 0;
      if (salesData.signs === 0) signsBonus = -20;
      else if (salesData.signs === 1) signsBonus = -10;
      else if (salesData.signs <= 4) signsBonus = 10;
      else if (salesData.signs <= 6) signsBonus = 15;
      else if (salesData.signs > 6) signsBonus = 20;

      console.log("bonus from signs is " + signsBonus);

      //now determine cost bonus
      let costBonus = 0;
      if (salesData.cost < 10) costBonus = 25;
      else if (salesData.cost < 30) costBonus = 15;
      else if (salesData.cost < 50) costBonus = 10;
      else if (salesData.cost < 75) costBonus = 10;
      else if (salesData.cost < 100) costBonus = 0;
      else costBonus = -10;

      console.log("bonus from col is " + costBonus);

      //now do we have rain?
      let didItRain = getRandomInt(0, 100) < state.forecast.chanceOfRain;
      console.log("did it rain?", didItRain);

      //ok, get our percent sold
      let [bottom, top] = state.forecast.salesRange;
      let percentSold = getRandomInt(bottom, top);

      console.log("initial percent sold", percentSold);

      //modify range based on signsBonus and didItRain
      percentSold += signsBonus;
      percentSold += costBonus;
      if (didItRain) percentSold -= RAIN_PENALTY;

      console.log("now percent sold is ", percentSold);
      //figure our glasses sold
      let glassesSold = Math.floor((percentSold / 100) * salesData.glasses);
      let moneyEarned = glassesSold * salesData.cost;
      console.log("you sold " + glassesSold + " and earned " + moneyEarned);

      //save the data
      state.glassesSold = glassesSold;
      state.income = moneyEarned;
      state.expenses = totalCost;
      if (didItRain) state.message = "It rained!";
    },
    generateForecast(state) {
      let prediction = FORECASTS[getRandomInt(0, FORECASTS.length - 1)];
      state.forecast = prediction;
      //also clear previous message
      state.message = "";
      state.day++;
    },
    updateAssets(state) {
      state.assets += state.income - state.expenses;
    }
  },
  getters: {
    costOfLemonade(state) {
      if (state.day > 2) return 4;
      return 2;
    },
    forecast(state) {
      return state.forecast.label;
    },
    hasErrors(state) {
      return state.errors.length > 0;
    }
  }
});
