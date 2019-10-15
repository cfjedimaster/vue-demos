<template>

  <div>

    <v-container>
      <v-row>
        <v-col cols="4" v-for="(cat,idx) in cats" :key="idx">
          <Cat :cat="cat" @delete="deleteCat" @edit="editCat" />
        </v-col>
      </v-row>
    </v-container>

  </div>

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
    deleteCat(cat) {
      console.log('delete', cat.id);
      this.$store.dispatch('deleteCat', cat);
    },
    editCat(cat) {
      console.log('edit', cat.id);
      this.$router.push({ name: 'edit', params: {cat: cat} });
    }
  }
};
</script>
