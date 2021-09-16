Vue.config.productionTip = false;
Vue.config.devtools = false;

const KEY = 'hXCaxJelmAanwzYWbAQxtA((';

const url = `https://api.stackexchange.com/2.3/search?order=desc&sort=activity&site=stackoverflow&key=${KEY}`;
const unansweredUrl = `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=activity&site=stackoverflow&accepted=true&key=${KEY}`;

const Q_FILTER = '!DIzhTJ62V9COaWFYY';

const app = new Vue({
	el:'#app', 
	data: {
		tags:'',
		working: false,
		buttonText: 'Generate Report',
		reportReady:false,
		report:null
	}, 
	created() {
		let qp = new URLSearchParams(window.location.search);
		let f = qp.get('tags');
		if(f) this.tags = qp.get('tags');
	},
	computed:{
		submitDisabled() {
			this.updateURL();
			return this.tags == '' || this.working;
		}
	}, 
	methods:{
		async generateReport() {
			this.working = true;
			this.reportReady = false;
			this.report = null;
			// get all stuff and _then_ copy to report
			let data = {};
			data.allTime = await getAggregateData(this.tags);
			data.last7 = await getAggregateData(this.tags, 7);
			data.last30 = await getAggregateData(this.tags, 30);

			data.questions = await getQuestions(this.tags, 10);
			/*
			make a nicer date for questions
			*/
			data.questions.forEach(q => {
				q.dateAsked = niceDate(new Date(q.creation_date * 1000));
			});
			// all done
			this.report = data;
			this.reportReady = true;
			this.working = false;
		},
		updateURL() {
			let qp = new URLSearchParams();
			if(this.tags !== '') qp.set('tags', this.tags);
			history.replaceState(null, null, "?"+qp.toString());
		}
	}
})

async function getAggregateData(tags, ageInDays) {
  let result = {};
  let startFilter='';

  if(ageInDays) {
	let now = new Date();
	now.setDate(now.getDate() - ageInDays);
	startFilter = `&fromdate=${Math.floor(now.getTime()/1000)}`;
	//console.log(now, startFilter);
  }
  
  // get total
  let resp = await fetch(`${url}&tagged=${tags}&filter=total${startFilter}`);
  let data = await resp.json();
  result.total = data.total;
  
  /*
  In my testing, despite the docs for search/advanced saying that tagged
  was OR, it acted like an an AND. So we need to do N calls for each
  */
  let tagArr = tags.split(';');
  requests = tagArr.map(async t => {
	let resp = await fetch(`${unansweredUrl}&tagged=${t}&filter=total${startFilter}`);
	return await resp.json();
  });
  result.unanswered = 0;
  let unAnsweredData = await Promise.all(requests);
  unAnsweredData.map(u => result.unanswered += u.total);
  return result;
}

/*
I'm a generic method to get the most recent questions.
*/
async function getQuestions(tags, total=10) {
	let resp = await fetch(`${url}&tagged=${tags}&sort=creation&pagesize=${total}&filter=${encodeURIComponent(Q_FILTER)}`);
	let data = await resp.json();
	return data.items;
}

function niceDate(s) {

	if(!window.Intl) return s;
	// convert to date
	if(!(s instanceof Date)) {
		let orig = s;
		s = new Date(s);
		if(s == 'Invalid Date') return orig;
	}

	return new Intl.DateTimeFormat().format(s);
}