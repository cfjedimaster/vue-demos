<template>
	<div>
		<p>
			The date is {{ date }}, Captain {{captain}}. You are currently docked at {{ port }}.
		</p>

		<div class="container">
			<Stats />
			<Hold />
			<Prices />
		</div>

		<p v-if="canUpgrade">
			<strong>Good News!</strong> You can upgrade your ship for {{ upgradeCost }}.
			<span v-if="money < upgradeCost">Unfortunately you do not have the funds.</span>
			<span v-else><button @click="doUpgrade">Purchase Upgrade</button></span>
		</p>

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
import Stats from '@/components/Stats.vue'

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
		Hold, Prices, Stats
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
		canUpgrade() {
			return this.$store.state.offerUpgrade;
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
		},
		upgradeCost() {
			return this.$store.getters.upgradeCost;
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
		doUpgrade() {
			this.$store.commit('upgrade', { cost: this.upgradeCost });
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

<style scoped>
.container {
	display: grid;
	grid-template-columns: 33% 33% 33%
}
</style>