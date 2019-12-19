<template>
  <div id="app">
    <h1>Sudoku</h1>
    <Grid />
    <p>
      <select v-model="difficulty"> 
      <option v-for="(difficulty,idx) in difficulties" :key="idx">{{difficulty}}</option>
      </select> <button @click="newGame">Start New Game</button>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Grid from '@/components/Grid';

export default {
  name: 'app',
  components: {
    Grid
  },
  data() {
    return {
      difficulty: null
    }
  },
  computed: mapState([
    'difficulties'
  ]),
  created() {
    this.$store.commit('initGrid');
    this.difficulty = this.difficulties[0];
  },
  methods: {
    newGame() {
      this.$store.commit('initGrid', this.difficulty);
    }
  }
}
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
