const app = new Vue({
	el:'#app',
	data: {
		cells:[],
		width: 10,
		height: 10,
		empty: "0",
		alive: "+",
		speed:10000
	},
	created() {
		// .fill didn't seem to work with []
		for(let i=0;i<this.height; i++) {
			this.cells[i] = [];
			for(let j=0;j<this.width;j++) {
				let cell = Math.random() > 0.8 ? this.alive : this.empty;
				this.cells[i][j] = cell;
			}
		}
		// Start life...
		//setInterval(this.cycle, this.speed);
		// run once until im done debugging :)
		this.cycle();
	},
	methods: {
		cycle() {
			console.log('cycle');
			for(let i=0;i<this.height; i++) {
				for(let j=0;j<this.width;j++) {
					// apply ROL
					let liveNeighbors = this.getLiveNeighbors(i, j);
				}
			}
	
		},
		getLiveNeighbors(x, y) {

		}
	}
});