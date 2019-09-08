const fetch = require('node-fetch');

const NPS_KEY = process.env.NPS_KEY;


module.exports = async (req, res) => {

    let state = req.query.state;
    let httpResult = await fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=100&fields=images&api_key=${NPS_KEY}`);
    let results = await httpResult.json();
    res.json(results);

};