const CLIENTID = '43dec225a0f844a0dff12c5be3a3f090';
const API = 'https://api.untappd.com/v4/';

// where we cache the beers
const CACHE_KEY = 'BEER_CACHE';
// where we cache the time stamp
const CACHE_KEY_TS = 'BEER_CACHE_TS';
// how many MS different, ie age of cache, one hour
const CACHE_MAX = 1000 * 60 * 60;

Vue.filter('numberFormat', d => {
    return d.toFixed(2);
});

const app = new Vue({
    el:'#app',
    data: {
        access_token:null,
        showLogin:true,
        showStats:false,
        stats: {
            totalRating:0,
            totalAbv:0,
            totalIbu:0,
            avgRating:0,
            avgAbv:0,
            avgIbu:0
        },
        styles: [],
        topBeers:[],
        worstBeers:[], 
        profile:null
    },
    async created() {
        console.log('created called');
        if(document.location.hash && document.location.hash.indexOf('access_token') >= 0) {
            this.access_token = document.location.hash.split('=')[1];
            this.showLogin = false;
            this.showStats = true;
            this.showLoading = false;
            await this.getBeers();
            this.prepareBeers();
        }
    },
    methods:{
        login() {
            console.log('attempting login');
            let redirect_url = 'http://localhost:3333';
            let url = `https://untappd.com/oauth/authenticate/?client_id=${CLIENTID}&response_type=token&redirect_url=${redirect_url}`;
            document.location.href=url;
        },
        async getBeers() {
            
            /*
            Untappd has kinda tight limits on API calls so we need to cache.
            */

            this.showLoading = true;
            console.log('get mah beers!');
            let beers = [];
            let profile = {};

            if(!this.hasCache()) {

                // get my info first
                let meRequest = await fetch(API + `user/info?access_token=${this.access_token}`);
                let profileData = await meRequest.json();
                profile = profileData.response.user;
console.log('profile', profile);
                let hasMore = true;
                // x is used as a sanity check and to keep us under the limit of 100. I use 90 so I have some wiggle room
                let x = 0;
                let rootUrl = API + `user/beers/?access_token=${this.access_token}&limit=50`;
                let thisUrl = rootUrl;
                while(hasMore && x < 20) {
                    console.log(thisUrl);
                    let result = await fetch(thisUrl);
                    let data = await result.json();
                    beers = beers.concat(data.response.beers.items);
                    if(data.response.pagination.next_url && data.response.pagination.next_url !== '') { 
                        thisUrl = rootUrl + `&offset=${data.response.pagination.offset}`;
                    } else {
                        hasMore = false;
                    }
                    x++;
                }
                console.log('all done');
                console.log(beers.length);
                this.setCache(beers, profile);
            } else {
                console.log('got from cache');
                let cache = this.getCache();
                beers = cache.beers; 
                profile = cache.profile;
            }
            console.log('ready for next');
            this.beers = beers;
            this.profile = profile;
            this.showLoading = false;
        },
        prepareBeers() {
            console.log('Im now going to do some data massaging so we can render');
            this.$set(this.stats, 'totalUnique', this.beers.length);
            console.log(this.beers[0]);
            let myStyles = {};
            for(let i=0;i < this.beers.length; i++) {

                let beerCheckin = this.beers[i];
                this.$set(this.stats, 'totalRating', this.stats.totalRating += beerCheckin.user_auth_rating_score);
                this.$set(this.stats, 'totalAbv', this.stats.totalAbv += beerCheckin.beer.beer_abv);
                this.$set(this.stats, 'totalIbu', this.stats.totalIbu += beerCheckin.beer.beer_ibu);

                if(!myStyles[beerCheckin.beer.beer_style]) myStyles[beerCheckin.beer.beer_style] = 0;
                myStyles[beerCheckin.beer.beer_style]++;
            }

            // do averages
            this.$set(this.stats, 'avgRating', this.stats.totalRating / this.stats.totalUnique);
            this.$set(this.stats, 'avgAbv', this.stats.totalAbv / this.stats.totalUnique);
            this.$set(this.stats, 'avgIbu', this.stats.totalIbu / this.stats.totalUnique);

            this.topBeers = this.beers.sort((a, b) => {
                if(a.user_auth_rating_score > b.user_auth_rating_score) return -1;
                if(a.user_auth_rating_score < b.user_auth_rating_score) return 1;
                return 0;
            }).slice(0,10)
            .map(b => {
                return this.mapBeer(b);
            });

            /*
            Filtering zeros as I think those are false positives
            */ 
            this.worstBeers = this.beers.filter(b => {
                return b.user_auth_rating_score !=0;
            })            
            .sort((a, b) => {
                if(a.user_auth_rating_score > b.user_auth_rating_score) return 1;
                if(a.user_auth_rating_score < b.user_auth_rating_score) return -1;
                return 0;
            }).slice(0,10)
            .map(b => {
                return this.mapBeer(b);
            });

            // Convert my hash into an array of objects
            let stylesArray = [];
            for(let key in myStyles) {
                stylesArray.push({name:key, value:myStyles[key]});
            }

            stylesArray = stylesArray.sort((a, b) => {
                if(a.value < b.value) return 1;
                if(a.value > b.value) return -1;
                return 0;
            }).slice(0,25);
            this.styles = stylesArray;

        },
        hasCache() {
            let cache = localStorage.getItem(CACHE_KEY);
            if(!cache) return false;
            let cache_ts = localStorage.getItem(CACHE_KEY_TS);
            if(!cache_ts) return false;
            let duration = new Date().getTime() - cache_ts;
            return duration < CACHE_MAX;
        },
        getCache() {
            return JSON.parse(localStorage.getItem(CACHE_KEY));
        },
        setCache(beers, profile) {
            localStorage.setItem(CACHE_KEY, JSON.stringify({beers, profile}));
            localStorage.setItem(CACHE_KEY_TS, new Date().getTime());
        },
        mapBeer(b) {
            /*
            Untappd returns a beer checkin object that contains the beer object, the brewery object, and your rating. 
            I want to make this simpler in the HTML so there is just one top level object and you can do beer.brewery for example.
            */
           let result = b.beer;
           result.brewery = b.brewery;
           result.brewery.url = `https://untappd.com/${result.brewery.brewery_page_url}`;
           result.first_had = b.first_had;
           result.rating = b.user_auth_rating_score;
           result.url = `https://untappd.com/b/${result.beer_slug}/${result.bid}`;
           return result;
        }
    }
});