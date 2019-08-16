<template>
  <div>
    <p>
      Enter your name, captain:
      <input v-model="name">
      <button @click="setName" :disabled="!name">Continue</button>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name:'Juniper Montage'
    }
  },
  methods: {
    setName() {
      this.$store.commit('bootstrap');
      this.$store.commit('setName', this.name);
      this.$router.replace('/game');
    }
  }
}
</script>