<template>
	<div>
		<p>
			Date: {{ date }}<br/>
			Current port: {{ port }}<br/>
			Captain: {{captain}}<br/>
			Money: {{ money | num }}<br/>
			Ship Size: {{ holdSize | num }} (In Use: {{ shipUsedSpace | num }})<br/>
			Damage: {{ damage }} (to repair, {{ repairCost }})<br/>
			Debug keystate={{keyState }}, toBuy={{ toBuy }}
		</p>

		<Hold />
		<Prices />
		
		<p v-if="!keyState">
			<b>Menu:</b> Type <code>B</code> to buy, <code>S</code> to sell, 
			<span v-if="damage"><code>R</code> to repair, </span>
			<code>M</code> to go to another port or <code>Q</code> to quit.
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

		<p v-if="keyState == 'Sell'">

			Sell 
				<input v-model.number="toSellQty" type="number" min="0"> units of 
				<select v-model="toSell">
				<option v-for="(s, i) in prices" :value="s" :key="i">{{ s.name }}</option>
				</select> 
				for {{ sellPrice | num }}.
				<button :disabled="cantSell" @click="sellGoods">Sell</button>
			<br/>
			Or <code>C</code> to cancel.
		</p>

		<p v-if="keyState == 'Repair'">

			Spend 
				<input v-model.number="toRepairQty" type="number" min="0"> on repairs. 
				<button :disabled="cantRepair" @click="doRepair">Repair</button>
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
			toBuyQty:0,
			toSell:null,
			toSellQty:0,
			toRepairQty:0
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
		cantRepair() {
			return this.toRepairQty > this.money;
		},
		cantSell() {
			if(this.toSell === null) return true;
			let avail = 0;
			for(let i=0;i<this.hold.length;i++) {
				if(this.hold[i].name === this.toSell.name) {
					avail = this.hold[i].quantity;
				}
			}
			console.log('avail is '+avail);
			return (
				this.toSellQty > avail
			)
		},
		captain() {
			return this.$store.state.name;
		},
		damage() {
			return this.$store.state.damage;
		},
		date() {
			return this.$store.getters.gameDate;
		},
		hold() {
			return this.$store.state.hold;
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
			/* disabled due to warning about unexpected side effect, which makes sense
			if(this.toBuyQty < 0) this.toBuyQty = 0;
			*/
			return this.toBuy.price * this.toBuyQty;
		},
		repairCost() {
			return this.$store.getters.repairCost;
		},
		sellPrice() {
			if(!this.toSell) return 0;
			return this.toSell.price * this.toSellQty;
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
			this.keyState = null;
		},
		sellGoods() {
			if(!this.toSell) return;
			if(this.toSellQty <= 0) return;

			this.$store.commit('sale', { good: this.toSell, qty: this.toSellQty });
			this.keyState = null;
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
					this.toSell = null;
					this.toSellQty = 0;
					this.keyState = 'Sell';
				}

				if(cmd === 'm') {
					console.log('Move');
					this.keyState = 'Move';
				}

				if(cmd === 'r') {
					console.log('Repair');
					this.keyState = 'Repair';
				}

				if(cmd === 'q') {
					this.$router.replace('/end');
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

			//keystate for buy
			if(this.keyState === 'Buy' || this.keyState === 'Sell') {

				if(cmd === 'c') {
					this.keyState = null;
					return;
				}

			}

		},
		doRepair() {
			// in theory not needed
			if(this.toRepairQty >= this.money) return;
			if(this.toRepairQty >= this.repairCost) this.toRepairQty = this.repairCost;

			this.$store.commit('repair', { total: this.toRepairQty, repairCost: this.repairCost });
			this.keyState = null;
		}

		
	}
}
</script>