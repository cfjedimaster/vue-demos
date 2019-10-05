
<script>
import { Line } from 'vue-chartjs';

export default {
	extends: Line,
	name: 'PageViewsChart',
	props: {
		views:Array
	},
	data() {
		return {
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
				legend: { display: false }
			}
		}
	},
	computed: {
		chartData() {
			let result = {
				labels:[],
				datasets:[]
			};
			let ds = {
				label:'Page Views',
				data:[]
			};
			this.views.forEach(v => {
				// first, convert v.date into a nice date
				let date = new Date(v.date);
				result.labels.push(new Intl.DateTimeFormat('en-US').format(date));
				let views = v.views;
				ds.data.push(views);
			});

			// https://stackoverflow.com/questions/29447579/chart-js-add-gradient-instead-of-solid-color-implementing-solution
			let ctx = this.$refs.canvas.getContext('2d');
			let gradient = ctx.createLinearGradient(0, 0, 0, 400);
			gradient.addColorStop(0, 'rgba(93,188,210,1)');   
			gradient.addColorStop(1, 'rgba(93,188,210,0.2)');
			ds.backgroundColor = gradient;

			result.datasets.push(ds);
						
			return result;
		}
	},
	mounted() {
		this.renderChart(this.chartData, this.chartOptions);
	}
}
</script>

<style scoped>
</style>
