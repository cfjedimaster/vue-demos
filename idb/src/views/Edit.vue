<template>
  <div>

    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field v-model="cat.name" label="Name" required />
          </v-col>
          <v-col>
            <v-text-field v-model="cat.age" label="Age" required type="numeric" min="0" max="30" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="green" @click="save">Save Cat</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

  </div>
</template>

<script>

export default {
  data() {
    return {
      cat:null
    }
  },
  created() {
    if(this.$route.params.cat) {
      this.cat = this.$route.params.cat;
    } else {
      this.cat = { name:'', age: 0 };
    }
  },
  methods: {
    async save() {
      await this.$store.dispatch('saveCat', this.cat);
      console.log('back');
      this.$router.push('/');
    }
  }
};
</script>