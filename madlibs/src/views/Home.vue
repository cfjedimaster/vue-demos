<template>
  <div>
    <h1>MadLibs</h1>
    <p @click="newMadLib">
    Press any key to continue.
    </p>
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
