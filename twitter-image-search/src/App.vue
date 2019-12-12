<template>
  <v-app>
    <v-app-bar app dark>
      <v-toolbar-title>Twitter Image Search</v-toolbar-title>
    </v-app-bar>

    <v-content class="ma-5">

      <p>
      This tool provides an "image only" view of a Twitter account. Simply enter the username of an account 
      and you'll see the most recent pictures they've embedded into their Tweets. You can click an individual
      image for a close up view.          
      </p>

      <div v-if="!authId">
        <v-btn @click="login">Authenticate with Twitter</v-btn>
      </div>
      <div v-else>
        
          <v-row>
            <v-col cols="12" sm="3">
              <v-text-field v-model="user" required label="Username"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn @click="getImages">Get Images</v-btn>
            </v-col>
          </v-row>

        <div v-if="loading">
          <p>
            <i>Loading...</i>
          </p>
        </div>

        <v-container fluid v-if="images">
          <v-row>
            <v-col class="d-flex child-flex" cols="3" v-for="(img,idx) in images" :key="idx" >
              <v-img :src="img" max-width="350" max-height="500" />
            </v-col>
          </v-row>
        </v-container>

      </div>

    </v-content>
  </v-app>
</template>

<script>
import bearer from '@bearer/js';

const BEARER_KEY = 'pk_development_e38bd15803c95f9c09e64a0da804e181299dc477dd05751651';

export default {
  name: 'App',
  data: () => ({
      authId: null,
      client: null,
      images: [],
      user: 'oneperfectshot',
      loading: false
  }),
  mounted() {
    this.client = bearer(BEARER_KEY);
  },
  methods: {
    login() {
      this.client
        .connect("twitter")
        .then(data => {
          console.log("auth", data);
          this.authId = data.authId;
        })
        .catch(console.error);
    },
    getImages() {
      this.images = [];
      this.loading = true;
      let account = this.user;
//      if(account.charAt(0) == '@') account = account;
      console.log(`loading images for ${account} and my auth is ${this.authId}`);
      this.client
        .integration("twitter")
        .auth(this.authId)
        .get(
          `search/tweets.json?q=from%3A${account}+filter%3Amedia&count=100&tweet_mode=extended`
        )
        .then(({ data }) => {
          this.loading = false;
          console.log(`Got ${data.statuses.length} tweets`);
          // in theory not needed since we asked for stuff with media
          console.log(data.statuses[0]);
          let filtered = data.statuses.filter(t => {
            return (
              t.entities && t.entities.media && t.entities.media.length > 0
            );
          });
          console.log(`Filtered to ${filtered.length} tweets with media`);
          filtered.forEach(t => {
            t.entities.media.forEach(m => {
              this.images.push(m.media_url_https);
            });
          });
        })
        .catch(err => {
          console.log("Error: ", err);
        });
    }
  }

};
</script>
