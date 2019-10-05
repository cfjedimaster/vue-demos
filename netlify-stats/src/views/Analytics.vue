<template>
	<div>

		<b-form class="mb-4">

			<b-row>
				<b-col sm="5">Use these fields to control the date range applied to the stats:</b-col>
				<b-col sm="2">
					<!--
					https://stackoverflow.com/a/48796672
					-->
					<b-form-input 
						:value="from && from.toISOString().split('T')[0]"
						@input.native="from = $event.target.valueAsDate"
						type="date" />
				</b-col>
				<b-col sm="2">
					<b-form-input 
						:value="to && to.toISOString().split('T')[0]"
						@input.native="to = $event.target.valueAsDate"
						type="date" />

				</b-col>
				<b-col sm="3">
					<b-button @click="setDateRange" variant="primary" :disabled="working">Update Date Range</b-button>
				</b-col>
			</b-row>


		</b-form>

		<div v-if="working"><i>Getting data...</i></div>
		<div v-if="hasStats">

			<h3>Page Views (Total: {{totalPageViews | num}})</h3>
			<PageViewsChart :views="pageViews" ></PageViewsChart>

			<h3>Pages</h3>
			<b-table :items="pages" striped hover :fields="pagesFields">
				<template v-slot:cell(path)="data">
			    	<a :href="data.item.link" target="_new">{{ data.item.path}}</a>
      			</template>
				<template v-slot:cell(count)="data">
			    	{{ data.item.count | num }}
      			</template>
			</b-table>

			<h3>Sources</h3>
			<b-table :items="sources" striped hover>
				<template v-slot:cell(count)="data">
			    	{{ data.item.count | num }}
      			</template>
			</b-table>

		</div>
	</div>
</template>

<script>
import netlify from '@/api/netlify';
import PageViewsChart from '@/components/PageViewsChart';

export default {
	components: {
		PageViewsChart
	},
	data() {
		let today = new Date();
		let lastWeek = new Date();
		lastWeek.setDate(today.getDate() - 7);
		return {
			from:lastWeek,
			to:today,
			working:false,
			hasStats:false,
			sources:null,
			pages:null,
			pagesFields:['path','count'],
			pageViews:[],
			totalPageViews:null
		}
	},
	created() {
		this.setDateRange();
	},
	computed:{
		site() {
			return this.$store.state.site;
		}
	},
	methods: {
		async setDateRange() {
			console.log('update our dates and refresh data');
			this.working = true;
			this.hasStats = false;
			
			let sources = await netlify.getSources(this.$store.state.token, this.$store.state.site.site_id, this.from.getTime(), this.to.getTime());
			// remove direct traffic
			this.sources = sources.filter(a => a.path !== '');

			let pages = await netlify.getPages(this.$store.state.token, this.$store.state.site.site_id, this.from.getTime(), this.to.getTime());
			this.pages = pages.map(p => {
				p.link = this.site.ssl_url + p.path;
				return p;
			});

			this.pageViews = await netlify.getPageViews(this.$store.state.token, this.$store.state.site.site_id, this.from.getTime(), this.to.getTime());
			this.totalPageViews = this.pageViews.reduce((acc, cur) => acc + cur.views,0);
			console.log(JSON.stringify(this.pageViews[0]));
			this.working = false;
			this.hasStats = true;

		}
	}
}
</script>