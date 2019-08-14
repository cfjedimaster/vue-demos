<template>
	<div>
		<h1>On the sea...</h1>
		<p>
			You are on the way to {{ destination }}.
		</p>
		<p v-if="randomEvent">
			{{ randomMessage }}
		</p>
	</div>
</template>

<script>
export default {
	computed: {
		destination() {
			return this.$route.params.destination;
		},
		randomEvent() {
			return this.randomMessage !== '';
		},
		randomMessage() {
			return this.$store.state.randomMessage;
		}
	},
	created() {
		// check for random event
		this.$store.commit('generateRandomEvent', {destination: this.$route.params.destination});

		// this feels icky
		let destinationIndex = this.$route.params.destinationIndex;
		if(this.$store.state.newPortIndex) {
			destinationIndex = this.$store.state.newPortIndex;
		}

		let timeToWait = 1000;
		// if there was a special event, we need more time to read
		if(this.randomEvent) {
			timeToWait += 2000;
		}
		// The 2000 thing should be set in the state along w/ other game properties
		setTimeout(() => {
			console.log('done waiting');
			this.$store.commit('setPort', destinationIndex);
			this.$router.replace('/game');
		}, timeToWait);
	}
}
</script>