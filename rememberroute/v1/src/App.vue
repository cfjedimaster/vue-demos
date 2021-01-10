<template>
  <div id="app">
    <div id="nav" v-if="showNav">
      <router-link to="/">Home</router-link> |
      <router-link to="/products">Products</router-link> | 
      <router-link to="/users">Users</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  computed: {
    showNav() {
      return this.$store.state.loggedin;
    }
  }
}
</script>