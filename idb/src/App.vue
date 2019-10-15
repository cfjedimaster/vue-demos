<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>CAT</span>
        <span class="font-weight-light">DB</span>
      </v-toolbar-title>

    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
  created () {
    this.$vuetify.theme.dark = true
  }
};
</script>
