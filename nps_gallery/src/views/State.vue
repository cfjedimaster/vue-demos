<template>

  <v-container>
      <h3>National Parks for {{state}}</h3>

      <i v-if="loading">Please stand by - loading data.</i>

      <v-row>
        <v-col cols="4" v-for="(park,idx) in parks" :key="idx">
          <Park :park="park" />
        </v-col>
      </v-row>
  </v-container>

</template>

<script>
import Park from '../components/Park';

export default {
  components: { Park },
  data() {
    return {
      state:'',
      abbr:''
    }
  },
  computed: {
    loading() {
      return !this.parks.length;
    },
    parks() {
      return this.$store.state.selectedParks;
    }
  },
  async created() {
    // clear selecion
    this.$store.commit('clearSelection');

    this.state = this.$route.params.state;
    this.abbr = this.$route.params.abbr;
    this.$store.dispatch('loadParks', this.abbr);
  }
}
</script>