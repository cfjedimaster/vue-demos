<template>
	<div>
		<p>
			Date: {{ date }}<br/>
			Current port: {{ port }}<br/>
			Captain: {{captain}}
		</p>

		<Hold />
		<Prices />
		
		click to buy, click to sell, click to move.
	</div>
</template>

<script>
import Hold from '@/components/Hold.vue'
import Prices from '@/components/Prices.vue'

export default {
	components:{
		Hold, Prices
	},
	created() {
		console.log('created called');
		this.$store.commit('newTurn');
	},
	computed: {
		captain() {
			return this.$store.state.name;
		},
		date() {
			return this.$store.getters.gameDate;
		},
		port() {
			return this.$store.state.port.name;
		}
	}
}
</script>