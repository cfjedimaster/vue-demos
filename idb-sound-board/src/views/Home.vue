<template>
  <div>
    <v-list class="mb-10" v-if="sounds.length">
      <template v-for="(sound,i) in sounds">
        <!--         
          This madness because both v-list and v-divider need a key, and they can't use
          the same key. So this seems dumb.
        -->
        <v-list-item :key="JSON.stringify(sound)" @click="play(sound)">
          <v-list-item-title>{{sound.title}}</v-list-item-title>
          <v-list-item-icon @click="deleteSound(sound)">
            <v-icon>mdi-delete</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-divider :key="i"></v-divider>
      </template>
    </v-list><div v-else class="mb-10">No sounds yet!</div>
    <p>
    <v-btn to="/edit" dark>Record New Sound</v-btn>
    </p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  }, 
  data() {
    return {
    }
  },
  computed: {
    sounds() {
      return this.$store.state.sounds;
    }
  },
  created() {
    this.$store.dispatch('loadSounds');
  },
  methods: {
    async deleteSound(sound) {
      await this.$store.dispatch('deleteSound', sound);
      this.$store.dispatch('loadSounds');
    },
    play(s) {
      let player = new window.Audio();
      player.src = window.URL.createObjectURL(s.blob);
      player.play();
    }
  }
}
</script>
