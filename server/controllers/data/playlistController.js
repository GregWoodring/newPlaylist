const axios = require('axios');


module.exports = {
    importUserPlaylists: async (req, res) => {
        try{
            let db = req.app.get('db');
            let { user } = req.session;

            //build axios request object
            let request = {
                method:'GET',
                url: `https://api.spotify.com/v1/users/${user.spotify_id}/playlists?limit=50`,
                headers: {
                    'Authorization' : `Bearer ${user.access_token}`
                }
            }
            //call for list of playlists
            let data = await axios(request);
            let totalPlaylists = data.total;
            let items = data.data.items;

            let nextUrl = data.next;
            for(let i=50; i<totalPlaylists; i + 50){
                request.url = nextUrl;
                let newData = await axios(request);
                items.push(newData.data.items);
                nextUrl = data.next;
            }


            await items.forEach(async item => {
                let returnObj = await db.import_playlist(JSON.stringify(item), user.userid);

                //all of the information about the next call is the same, other than the url
                //which I return from the database
                request.url = returnObj[0].tracks_href;
                let tracks = await axios(request);

                try{
                   //it seems that errors won't get pushed to the console unless massive is assigning
                   //the return value from the database to something 
                    let songID = await db.import_playlist_tracks(returnObj[0].playlist_id, JSON.stringify(tracks.data.items));
                } catch(err){
                    console.log(err);
                }
            })

            

            //console.log('data:', data.data);

            console.log('imported');
            res.send('imported').status(200);
        } catch(err){
            console.log(err);
            res.send(err).status(500);
        }

    }
}