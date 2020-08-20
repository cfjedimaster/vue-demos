export const player = {
	namespaced:true, 
	state: {
		name:'ray',
		str:0,
		dex:0,
		int:0,
		gold:100,
		exp:0,
		pos: {
			x:null, 
			y:null
		}
	}, 
	mutations: {
		// utility method to set stats at once
		setStats(state, stats) {
			if(stats.str) state.str = stats.str;
			if(stats.dex) state.dex = stats.dex;
			if(stats.int) state.int = stats.int;
		},
		setName(state, name) {
			state.name = name;
		},
		setPosition(state, pos) {
			state.pos.x = pos.x;
			state.pos.y = pos.y;
		}
	}
}