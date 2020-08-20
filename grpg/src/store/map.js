export const map = {
	namespaced:true, 
	state: {
		map:null
	}, 
	mutations: {
		// utility method to set stats at once
		setMap(state, map) {
			state.map = map;
		}
	}
}