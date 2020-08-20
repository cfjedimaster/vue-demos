<template>
	<div>
	<h2>Setup</h2>
	<p>
	Enter a name: <input v-model="newName">
	</p>

	<p>
	Your default stats. STR is strength and affects how hard you hit. 
	DEX is dexterity and impacts your ability to dodge or hit an opponent. 
	INT is intelligence and impacts your use of magic.
	</p>
	<p>
	STR: {{ str }}<br/>
	DEX: {{ dex }}<br/>
	INT: {{ int }}<br/>
	<button @click="reroll">Reroll</button>
	</p>

	<p>
	<button @click="start" :disabled="cantContinue">Start Game!</button>
	</p>
	</div>
</template>

<script>
import { dice } from '@/utils/dice';
import { mapMaker } from '@/utils/mapMaker';

const MAP_WIDTH = 100;
const MAP_HEIGHT = 100;

export default {
	data() {
		return {
			newName:'gorf',
			str: '',
			dex: '',
			int: ''
		}
	}, 
	created() {
		this.reroll();
	},
	computed: {
		cantContinue() {
			return this.newName == ''
		}
	},
	methods: {
		reroll() {
			this.str = dice.roll('3d6');
			this.dex = dice.roll('3d6');
			this.int = dice.roll('3d6');
		},
		start() {
			this.$store.commit('player/setName', this.newName);
			this.$store.commit('player/setStats', { str: this.str, dex: this.dex, int: this.int });
			let mapData = mapMaker.create(MAP_WIDTH, MAP_HEIGHT);
			this.$store.commit('map/setMap', mapData.map);
			// my position is always one lower than town
			let myPos = {
				x:mapData.town.x,
				y:++mapData.town.y
			};
			console.log('myPos', myPos);
			this.$store.commit('player/setPosition', { x:myPos.x, y:myPos.y });

			this.$router.replace('game');
		}
	}
}
</script>
