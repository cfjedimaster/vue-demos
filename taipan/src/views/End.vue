<template>
	<div>
		<h2>Your Game Has Ended</h2>
		<p>
			Your final tally:
			The date was {{ date }}.<br/>
			You had {{ money | num }} in funds.<br/>
			Your ship size was {{ holdSize }}.<br/>
			And your rank was {{ rank }}.
		</p>

		<p>
			<a href="/">Play again?</a>
		</p>
	</div>
</template>

<script>
export default {
	computed: {
		captain() {
			return this.$store.state.name;
		},
		damage() {
			return this.$store.state.damage;
		},
		date() {
			return this.$store.getters.gameDate;
		},
		holdSize() {
			return this.$store.state.holdSize;
		},
		money() {
			return this.$store.state.money;
		},
		rank() {
			return this.$store.getters.rank;
		}
	},
}
</script>