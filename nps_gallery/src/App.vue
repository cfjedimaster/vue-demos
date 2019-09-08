<template>

  <v-app>

    <v-app-bar app>
      <v-toolbar-title class="title"><v-btn to="/" text>NPS Gallery</v-btn></v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer app>
      <span>Created by <a href="https://www.raymondcamden.com">Raymond Camden</a>, data from the <a href="https://www.nps.gov/subjects/digital/nps-data-api.htm">NPS API</a>.</span>
    </v-footer>
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
  created () {
      this.$vuetify.theme.dark = true
  },
};
</script>
