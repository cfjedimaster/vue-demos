<template>
  <div>
  Login page.
  <button @click="login">Click me to login</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
	login() {
		this.$store.commit('setLogin', true);
    if(this.$store.state.lastPath) {
      let next = this.$store.state.lastPath;
      this.$store.commit('setLastPath', '');
      this.$router.replace(next);
    } else {
      this.$router.replace({name:'Home'});
    }
	}
  }
}
</script>
