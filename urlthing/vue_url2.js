// hard coded for simplicity...
const ITEMS = [
	{ name: "Ray", type: "person" },
	{ name: "Lindy", type: "person" },
	{ name: "Jacob", type: "person" },
	{ name: "Lynn", type: "person" },
	{ name: "Noah", type: "person" },
	{ name: "Jane", type: "person" },
	{ name: "Maisie", type: "person" },
	{ name: "Carol", type: "person" },
	{ name: "Ashton", type: "person" },
	{ name: "Weston", type: "person" },
	{ name: "Sammy", type: "cat" },
	{ name: "Aleese", type: "cat" },
	{ name: "Luna", type: "cat" },
	{ name: "Pig", type: "cat" },
	{ name: "Cayenne", type: "dog" }
]

const app = new Vue({
	el:'#app',
	data: {
		allItems: ITEMS,
		filter:'',
		typeFilter:[]
	},
	created() {
		let qp = new URLSearchParams(window.location.search);
		let f = qp.get('filter');
		if(f) this.filter = qp.get('filter');
		let tf = qp.get('typeFilter');
		if(tf) this.typeFilter = tf.split(',');
	},
	computed: {
		items() {
			this.updateURL();
			return this.allItems.filter(a => {
				if(this.filter !== '' && a.name.toLowerCase().indexOf(this.filter.toLowerCase()) === -1) return false;
				if(this.typeFilter.length && !this.typeFilter.includes(a.type)) return false;
				return true;
			});
		}
	},
	methods:{
		updateURL() {
			let qp = new URLSearchParams();
			if(this.filter !== '') qp.set('filter', this.filter);
			if(this.typeFilter.length) qp.set('typeFilter', this.typeFilter);
			history.replaceState(null, null, "?"+qp.toString());
		}
	}
});