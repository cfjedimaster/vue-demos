<template>
  <div>
    <h1>Daily Financial Report</h1>

    <p v-if="message">
      <strong>{{message}}</strong>
    </p>

    <p>For day {{day}}, you sold {{glassesSold}} glasses of lemonade.</p>

    <p>
      You earned {{income | money}} and had expenses of {{expenses | money}}
      for a net profit of {{ profit | money }}.
    </p>

    <p>You currently have {{ assets | money }}.</p>

    <router-link to="/game" tag="button">Next Day</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    // we update our assets now, nto before, so i don't have to worry about the
    // display changing for a spli second. could be better?
    this.$store.commit("updateAssets");
  },
  computed: {
    assets() {
      return this.$store.state.assets / 100;
    },
    day() {
      return this.$store.state.day;
    },
    glassesSold() {
      return this.$store.state.glassesSold;
    },
    income() {
      return this.$store.state.income / 100;
    },
    expenses() {
      return this.$store.state.expenses / 100;
    },
    profit() {
      return this.income - this.expenses;
    },
    message() {
      return this.$store.state.message;
    }
  },
  methods: {}
};
</script>

<style>
</style>
