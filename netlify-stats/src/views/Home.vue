<template>
	<div class="home">

		<b-jumbotron bg-variant="dark" text-variant="white" header="Netlify Stats">

			<p>
				This application demonstrates a custom client built upon Netlify's Analytics service. In
				order to use this demo, you must be a Netlify user and have at least one site that makes
				use of Analytics.
			</p>

			<p>
				<b-button @click="login">Login</b-button>
			</p>

		</b-jumbotron>
			

	</div>
</template>

<script>
import netlify from '@/api/netlify';

export default {
	
	name: 'home',
	methods:{
		login() {
			console.log('do redirect');
			let url = netlify.getUrl(this.$store.state.clientId);
			document.location.href = url;
		}
	}
}
</script>
