<template>

  <v-card>
    <v-card-title>
      {{ cat.name }}
    </v-card-title>
    <v-card-text>
      <p>
      This is the body of the cat. It is {{ cat.age }} years old.
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="red" @click="$emit('delete',cat)">Delete</v-btn>
      <v-btn @click="$emit('edit',cat)">Edit</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
export default {
  props: ['cat'], 
  data: () => ({

  }),
  created() {
    console.log('cat created');
  },
  methods: {
  }
};
</script>
