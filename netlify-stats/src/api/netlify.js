
export default {

    getUrl(clientid) {
		let redirect_url = window.location.href + 'callback';
		let url = `https://app.netlify.com/authorize?client_id=${clientid}&response_type=token&redirect_uri=${redirect_url}`;
		return url;
	},

	async getPages(token, site, from, to) {

		let url = `https://analytics.services.netlify.com/v1/${site}/pages?from=${from}&to=${to}&timezone=-0500&limit=15`;
		let response = await fetch(url,{ 
			headers: new Headers({
			  'Authorization': 'Bearer '+ token, 
			})
		});
		let result = await response.json();
		return result.data;
	},

	async getSites(token) {

		let url = `https://api.netlify.com/api/v1/sites`;
		let response = await fetch(url,{ 
			headers: new Headers({
			  'Authorization': 'Bearer '+ token, 
			})
		});
		return await response.json();

	},

	async getSources(token, site, from, to) {

		console.log('getSources');		
		let url = `https://analytics.services.netlify.com/v1/${site}/sources?from=${from}&to=${to}&timezone=-0500&limit=15`;
		let response = await fetch(url,{ 
			headers: new Headers({
			  'Authorization': 'Bearer '+ token, 
			})
		});
		let result = await response.json();
		return result.data;
	}

}