<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
        <h2>IDB Sound Board</h2>


    </v-app-bar>

    <v-content class="mx-10 my-10">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
