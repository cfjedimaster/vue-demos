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
		this.$router.replace({name:'Home'});
	}
  }
}
</script>
