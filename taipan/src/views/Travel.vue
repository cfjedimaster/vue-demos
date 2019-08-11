<template>
	<div>
		<h1>On the sea...</h1>
		<p>
			You are on the way to {{ destination }}.
		</p>
	</div>
</template>

<script>
export default {
	computed: {
		destination() {
			return this.$route.params.destination;
		}
	},
	created() {
		console.log('created', this.$route.params);
		// The 2000 thing should be set in the state along w/ other game properties
		setTimeout(() => {
			console.log('done waiting');
			this.$store.commit('setPort', this.$route.params.destinationIndex);
			this.$router.replace('/game');
		}, 1000);
	}
}
</script>