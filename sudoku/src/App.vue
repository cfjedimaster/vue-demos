<template>
  <div id="app">
    <h1>Sudoku</h1>
    <Grid />
  </div>
</template>

<script>
import Grid from '@/components/Grid';

export default {
  name: 'app',
  components: {
    Grid
  },
  created() {
    this.$store.commit('initGrid');
  }
}
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
