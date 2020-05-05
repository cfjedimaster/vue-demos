<template>
  <div>
    <h1>G.R.P.G</h1>
    <p @click="next">
    Welcome to the Generic Role Playing Game. Hit any key to continue.
    </p>
  </div>
</template>

<script>

export default {
  name: 'Title',
  methods: {
    next() {
      this.$router.replace('setup');
    }
  }
}
</script>

<style scoped>
div {
  width: 100%;
  text-align: center;
}
</style>
