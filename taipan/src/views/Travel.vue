<template>
	<div>
		<h1>On the sea...</h1>
		<p>
			You are on the way to {{ destination }}.
		</p>
		<p v-if="randomEvent">
			{{ randomMessage }}
		</p>

		<p v-if="damage >= 100">
			<strong>Your ship is completely destroyed!</strong>
		</p>
	</div>
</template>

<script>
export default {
	computed: {
		damage() {
			return this.$store.state.damage;
		},
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
		// if there was a special event, we need more time to read, and possibly end the game
		if(this.randomEvent) {
			timeToWait += 2000;
		}

		setTimeout(() => {
			console.log('done waiting');
			if(this.damage >= 100) {
				this.$router.replace('/end');
			} else {
				this.$store.commit('setPort', destinationIndex);
				this.$router.replace('/game');
			}
		}, timeToWait);
	}
}
</script>