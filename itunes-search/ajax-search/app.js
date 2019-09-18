Vue.filter('formatDate', function(d) {
	if(!window.Intl) return d;
	return new Intl.DateTimeFormat('en-US').format(new Date(d));
}); 

const app = new Vue({
	el:'#app',
	data:{
		term:'',
		results:[],
		noResults:false,
		searching:false
	},
	methods:{
		search:function() {
			this.results = [];
			this.searching = true;
			fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(this.term)}&limit=10&media=music`)
			.then(res => res.json())
			.then(res => {
				this.searching = false;
				this.results = res.results;
				this.noResults = this.results.length === 0;
			});
		}
	}
});