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
    this.cat = this.$route.params.cat;
  },
  methods: {
  }
};
</script>