<template>
	<div>
		<p>
			Date: {{ date }}<br/>
			Current port: {{ port }}<br/>
			Captain: {{captain}}<br/>
			Debug keystate={{keyState }}
		</p>

		<Hold />
		<Prices />
		
		<p v-if="!keyState">
			<b>Menu:</b> Type <code>B</code> to buy, <code>S</code> to sell, or
			<code>M</code> to go to another port.
		</p>
		<p v-if="keyState == 'Move'">
			Move to 
				<span v-for="(p, i) in ports" :key="i">{{ i+1 }}) {{ p }} </span>
			<br/>
			Or <code>C</code> to cancel.
		</p>
	</div>
</template>

<script>
import Hold from '@/components/Hold.vue'
import Prices from '@/components/Prices.vue'

export default {
	data() {
		return {
			keyState:null,
			ray:null
		}
	},
	components:{
		Hold, Prices
	},
	created() {
		this.$store.commit('newTurn');
		window.addEventListener('keypress', this.doCommand);
	},
	destroyed() {
		window.removeEventListener('keypress', this.doCommand);
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
		},
		ports() {
			return this.$store.getters.ports;
		}
	},
	methods: {
		doCommand(e) {
			let cmd = String.fromCharCode(e.keyCode).toLowerCase();

			/*
			How we respond depends on our state. If keyState is null, 
			it meand we aren't doing anything, so BSM are valid.
			*/
			if(!this.keyState) {

				if(cmd === 'b') {
					console.log('Buy');
				}

				if(cmd === 's') {
					console.log('Sell');
				}

				if(cmd === 'm') {
					console.log('Move');
					this.keyState = 'Move';
				}

				return;
			}

			//keystate for move
			if(this.keyState === 'Move') {

				if(cmd === 'c') {
					this.keyState = null;
					return;
				}

				cmd = parseInt(cmd, 10);
				for(let i=0;i<this.ports.length;i++) {
					if(cmd-1 === i) {
						console.log('going to move to '+this.ports[i]);
						this.$router.replace({ name:'travel', 
						params: { 
							destination: this.ports[i],
							destinationIndex: i
						} });
					}
				}
			}
		}
		
	}
}
</script>