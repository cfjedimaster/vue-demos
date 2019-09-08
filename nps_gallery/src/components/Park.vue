<template>
    <!-- flexcard tip, https://github.com/vuetifyjs/vuetify/issues/4160 -->
    <v-card height="100%" class="flexcard">

      <v-img
        v-if="park.image"
        class="white--text"
        height="200px"
        :src="park.image"
      >
        <v-card-title class="align-end fill-height"><span v-html="park.name"></span></v-card-title>
      </v-img>
      <v-card-title v-else><span v-html="park.name"></span></v-card-title>


      <v-card-text class="grow">
        {{ park.description }}
      </v-card-text>

      <v-card-actions>
        <v-btn text :href="park.url" target="_new">Learn More</v-btn>
      </v-card-actions>
    </v-card>

</template>

<script>
export default {
  props: ['park' ],
  data: () => ({
  }),
};
</script>

<style scoped>
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>