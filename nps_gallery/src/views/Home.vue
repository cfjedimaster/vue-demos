<template>
  <v-container>
      <v-row>
        <v-col cols="2" v-for="(state, abbr) of states" :key="state">
          <v-btn color="teal" width="100%" :to="{name:'state',params:{state:state, abbr:abbr}}">{{ state}}</v-btn>
        </v-col>
        <!--
        <v-btn v-for="(state,abbr) in states" :key="state" color="teal" width="250"> {{ state }}</v-btn>
        -->
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
