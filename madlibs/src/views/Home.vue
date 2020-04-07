<template>
  <div>
    <h1 class="header">MadLibs</h1>
    <div style="text-align: center">
      <button @click="newMadLib">
      Let's Start!
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  methods: {
    newMadLib() {
      this.$router.replace('/prompt');
    }
  }
}
</script>

<style scoped>
.header {
  font-family: 'Luckiest Guy', cursive;
  font-size: 12em;
  text-align: center;
}

button {
  background-color:pink; 
  width: 220px;
  height: 120px;
  font-size: 30px;
}
</style>
