<template>
  <div id="app">

    <b-container>
      <b-navbar type="dark" variant="dark" class="mb-3">
        <b-navbar-brand href="/">Netlify Stats</b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav v-if="loggedIn">
            <b-nav-item to="/sites">Sites</b-nav-item>
          </b-navbar-nav>
        </b-collapse>

      </b-navbar>

      <router-view/>

    </b-container>

  </div>
</template>

<script>

export default {
	data() {
		return {
		}
	},
	computed:{
		loggedIn() {
			return this.$store.state.token;
		}
	}
}
</script>