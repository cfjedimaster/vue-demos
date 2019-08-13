<template>
	<div>
		<p>
			Date: {{ date }}<br/>
			Current port: {{ port }}<br/>
			Captain: {{captain}}<br/>
			Money: {{ money | num }}<br/>
			Ship Size: {{ holdSize | num }} (In Use: {{ shipUsedSpace | num }})<br/>
			Debug keystate={{keyState }}, toBuy={{ toBuy }}
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

		<p v-if="keyState == 'Buy'">

			Buy 
				<input v-model.number="toBuyQty" type="number" min="0"> units of 
				<select v-model="toBuy">
				<option v-for="(s, i) in prices" :value="s" :key="i">{{ s.name }}</option>
				</select> 
				for {{ purchasePrice | num }}.
				<button :disabled="cantBuy" @click="buyGoods">Purchase</button>
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
			ray:null,
			toBuy:null,
			toBuyQty:0
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
		cantBuy() {
			return (
				this.toBuy === null
				||
				(this.toBuy.price * this.toBuyQty) > this.money
				||
				this.toBuyQty + this.shipUsedSpace > this.holdSize
			)
		},
		captain() {
			return this.$store.state.name;
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
		port() {
			return this.$store.state.port.name;
		},
		ports() {
			return this.$store.getters.ports;
		},
		prices() {
			return this.$store.state.prices;
		},
		purchasePrice() {
			if(!this.toBuy) return 0;
			if(this.toBuyQty < 0) this.toBuyQty = 0;
			return this.toBuy.price * this.toBuyQty;
		},
		shipUsedSpace() {
			return this.$store.getters.shipUsedSpace
		}
	},
	methods: {
		buyGoods() {
			//in theory not needed due to other checks
			if(!this.toBuy) return;
			if(this.toBuyQty <= 0) return;

			this.$store.commit('purchase', { good: this.toBuy, qty: this.toBuyQty });

		},
		doCommand(e) {
			let cmd = String.fromCharCode(e.keyCode).toLowerCase();

			/*
			How we respond depends on our state. If keyState is null, 
			it meand we aren't doing anything, so BSM are valid.
			*/
			if(!this.keyState) {

				if(cmd === 'b') {
					console.log('Buy');
					this.toBuy = null;
					this.toBuyQty = 0;
					this.keyState = 'Buy';
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

			//keystate for move
			if(this.keyState === 'Buy') {

				if(cmd === 'c') {
					this.keyState = null;
					return;
				}

				cmd = parseInt(cmd, 10);
			}

		}
		
	}
}
</script>