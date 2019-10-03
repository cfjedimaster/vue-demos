<template>
	<div>

		<h2>Sites</h2>
		<p>
			Below are your Netlify sites, filtered by those with the analytics service enabled.
		</p>

		<b-container>
			<b-row>
				<b-col cols="4">
					<b-card
						v-for="site in sites"
						:key="site.id"
						:title="site.name"
						:img-src="site.screenshot_url"
						img-top
						class="mb-2"
						>
						
						<b-card-text>
							{{ site.ssl_url }}
						</b-card-text>

						<b-button @click="select(site)" variant="primary">Select</b-button>
					</b-card>
				</b-col>
			</b-row>
		</b-container>

	</div>
</template>

<script>
import netlify from '@/api/netlify';

export default {
	data() {
		return {
			sites:[]
		}
	},
	async created() {
		let sites = await netlify.getSites(this.$store.state.token);
		this.sites = sites.filter(s => {
			console.log(s.capabilities.analytics);
			return typeof s.capabilities.analytics !== 'undefined';
		});
	},
	methods: {
		select(site) {
			console.log('Selected', site);
			this.$store.commit('storeSite', site);
			this.$router.push('analytics');
		}
	}
}
</script>