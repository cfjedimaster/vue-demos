const NPS_API = '/api/npswrapper';


export default {

    async getParks(state) {
        return new Promise(async (resolve, reject) =>{
          let results = await fetch(NPS_API+`?state=${state}`);
          let parks = await results.json();
          /*
            API returns park.images[], we want to change this to park.image to simplify it
          */
          let parkData = parks.data.map(p => {
            if(p.images && p.images.length > 0) {
                p.image = p.images[0].url;
            }
            return p;
          });
          resolve(parkData);  
        });
    }

}