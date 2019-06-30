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
            let totalPlaylists = data.data.total;
            let items = data.data.items;

            let nextUrl = data.data.next;
            if(nextUrl){
                for(let i=50; i<totalPlaylists; i += 50){
                    request.url = nextUrl;
                    let newData = await axios(request);
                    items = [...items, ...newData.data.items];
                    nextUrl = newData.data.next;
                }
            }
            
            

            await items.forEach(async item => {
                try{
                    let returnObj = await db.import_playlist(JSON.stringify(item), user.userid);

                    //all of the information about the next call is the same, other than the url
                    //which I return from the database
                    // request.url = returnObj[0].tracks_href;
                    // let tracks = await axios(request);
                    // let totalPlaylists = tracks.data.total;
                    // let items = tracks.data.items;

                    // let nextUrl = tracks.data.next;
                    
                    // if(nextUrl){
                    //     console.log('next:', nextUrl);
                    //     for(let i=100; i<totalPlaylists; i += 100){
                    //         request.url = nextUrl;
                    //         let newData = await axios(request);
                    //         items = [...items, ...newData.data.items];
                    //         nextUrl = newData.data.next;
                    //     }
                    // }

                   //it seems that errors won't get pushed to the console unless massive is assigning
                   //the return value from the database to something 
                    //let songID = await db.import_playlist_tracks(returnObj[0].playlist_id, JSON.stringify(items));
                } catch(err){
                    console.log(err);
                }
            })
            res.sendStatus(200);
        } catch(err){
            console.log(err);
            res.send(err).status(500);
        }

    },

    getPlaylists: async (req, res) => {
        try{
            let db = req.app.get('db');
            let user = req.session.user;

            let data = await db.get_playlists_display(user.userid);
            res.send(data).status(200);
        } catch(err){
            console.log(err);
            res.send(err).status(500);
        }
    },

    getPlaylistSongs: async (req,res) => {
        try{
            let db = req.app.get('db');
            let user = req.session.user;

            let data = await db.get_playlist_songs(+req.params.playlist_id, +user.userid);
            res.send(data).status(200);
        } catch(err){
            console.log('Error getting playlist:', err);
            res.send(err).status(500);
        }

    },

    getPlaylistInfo: async (req, res) => {
        try {
            let db = req.app.get('db');
            let user = req.session.user;

            let data = await db.get_playlist_info(+req.params.playlist_id, +user.userid);
            res.send(data).status(200);
        } catch(err){
            console.log(err).status(500);
            res.send(err).status(500);
        }
    }
}