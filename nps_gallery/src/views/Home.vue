<template>
  <v-container>
      <v-row>
        <v-col cols="2" v-for="(state, abbr) of states" :key="state">
          <v-btn color="teal" width="100%" :to="`/state/${state}/${abbr}`">{{ state}}</v-btn>
        </v-col>
      </v-row>
  </v-container>
</template>


<script>
  export default {
    data: () => ({
      
    }),
    computed: {
      states() {
        return this.$store.state.states;
      }
    },
  }
</script>
