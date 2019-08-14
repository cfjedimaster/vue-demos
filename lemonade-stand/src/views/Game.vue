<template>
  <div>
    <h1>Forecast: {{ forecast}}</h1>
    <p>On day {{ day }} the cost of lemonade is {{ costOfLemonade }} cents each.</p>
    <p>You currently have {{ assets | money }} in cash.</p>
    <p>
      How many glasses of lemonade do you wish to make?
      <input
        type="number"
        v-model.number="numGlasses"
        min="0"
      >
    </p>
    <p>
      How many advertising signs ({{costOfSigns}} cents each) do you wish to make?
      <input
        type="number"
        v-model.number="numSigns"
        min="0"
      >
    </p>
    <p>
      What price (in cents) do you wish to charge for lemonade?
      <input
        type="number"
        v-model.number="pricePerGlass"
        min="0"
      >
    </p>

    <div v-if="hasErrors">
      <strong>Oh oh! Please fix these errors!</strong>
      <ul>
        <li v-for="e in errors">{{e}}</li>
      </ul>
    </div>

    <button @click="initiateSales">Start Selling!</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numGlasses: 0,
      numSigns: 0,
      pricePerGlass: 0
    };
  },
  created() {
    console.log('created');
    this.$store.commit("generateForecast");
  },
  computed: {
    assets() {
      return this.$store.state.assets / 100;
    },
    day() {
      return this.$store.state.day;
    },
    costOfLemonade() {
      return this.$store.getters.costOfLemonade;
    },
    costOfSigns() {
      return this.$store.state.signCost;
    },
    errors() {
      return this.$store.state.errors;
    },
    forecast() {
      return this.$store.getters.forecast;
    },
    hasErrors() {
      return this.$store.getters.hasErrors;
    }
  },
  methods: {
    initiateSales() {
      // try to sell - note we pass the getter value cuz Mutations can't use Getters (weird!)
      this.$store.commit("doSales", {
        glasses: this.numGlasses,
        signs: this.numSigns,
        cost: this.pricePerGlass,
        costOfLemonade: this.costOfLemonade
      });
      if(!this.hasErrors) this.$router.replace("/report");
    }
  }
};
</script>

<style>
</style>
