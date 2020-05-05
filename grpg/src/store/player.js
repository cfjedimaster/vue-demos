export const player = {
	namespaced:true, 
	state: {
		name:'ray',
		str:0,
		dex:0,
		int:0,
		gold:0,
		exp:0
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
		}
	}
}