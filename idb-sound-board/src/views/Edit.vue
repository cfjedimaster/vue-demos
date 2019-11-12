<template>
  <div>
    <v-text-field label="Sound Name" required v-model="title" />
    <v-btn class="mr-4">
      <v-icon>mdi-record</v-icon>
      Record Sound
    </v-btn>
    <v-btn class="mr-4">
      <v-icon>mdi-play</v-icon>
      Play Sound
    </v-btn>
    <v-btn color="primary" @click="save" :disabled="cantSave">Save</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title:''
    }
  },
  computed: { 
    cantSave() {
      //check title and recording
      if(this.title === '') return true;
      return false;
    }
  },
  methods: {
    async save() {
      console.log('save it');
      let sound = {
        title: this.title
      };
      await this.$store.dispatch('saveSound', sound);
      this.$router.push('/');
      
    }
  }
}
</script>

