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
		searching:false,
		audio:null
	},
	methods:{
		search:function() {
			if(this.audio) {
				this.audio.pause();
				this.audio.currentTime = 0;
			}
			this.results = [];
			this.searching = true;
			fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(this.term)}&limit=10&media=music`)
			.then(res => res.json())
			.then(res => {
				this.searching = false;
				this.results = res.results;
				this.noResults = this.results.length === 0;
			});
		},
		play:function(s) {
			if(this.audio) {
				this.audio.pause();
				this.audio.currentTime = 0;
			}
			this.audio = new Audio(s);
			console.log(s);
			this.audio.play();
		}
	}
});