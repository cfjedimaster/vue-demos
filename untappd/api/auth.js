const fetch = require('node-fetch');

module.exports = async (req, res) => {

	const CLIENTID = process.env.UT_CLIENTID;
	const CLIENTSECRET = process.env.UT_CLIENTSECRET;
	const REDIRECT_URL = process.env.UT_REDIRECT_URL;

	let code = req.query.code;
	
	let response = await fetch(`https://untappd.com/oauth/authorize/?client_id=${CLIENTID}&client_secret=${CLIENTSECRET}&response_type=code&redirect_url=${REDIRECT_URL}&code=${code}`);
	let data = await response.json();
	res.writeHead(302, { Location: '/#access_token='+data.response.access_token });
	res.end();

}