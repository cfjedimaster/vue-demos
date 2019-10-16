<template>

  <v-container>
    <v-row>
      <v-col cols="4" v-for="(cat,idx) in cats" :key="idx">
        <Cat :cat="cat" @delete="deleteCat" @edit="editCat" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="addCat">Add Cat</v-btn>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import Cat from '@/components/Cat';

export default {
  components: {
    Cat
  },
  computed: {
    cats() {
      return this.$store.state.cats;
    }
  },
  created() {
    this.$store.dispatch('getCats');
  },
  methods: {
    addCat() {
      this.$router.push({ name: 'edit' });
    },
    async deleteCat(cat) {
      console.log('delete', cat.id);
      await this.$store.dispatch('deleteCat', cat);
      this.$store.dispatch('getCats');
    },
    editCat(cat) {
      console.log('edit', cat.id);
      this.$router.push({ name: 'edit', params: {cat: cat} });
    }
  }
};
</script>
