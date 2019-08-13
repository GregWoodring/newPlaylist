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
            
            //function returns null but unless I assign it to something it won't catch errors
            let forCatch = db.import_playlist_bulk(JSON.stringify(items), user.userid);
            res.sendStatus(200);
        } catch(err){
            console.log(err);
            res.send(err).status(500);
        }

    },

    importPlaylistTracks: async (req, res) => {
        try{
            let db = req.app.get('db');
            let { user } = req.session;
            let { playlist_id } = req.params;
            let playlist_spotify_id = await db.get_playlist_spotify_id(playlist_id, user.userid);

            let request = {
                method:'GET',
                url: `https://api.spotify.com/v1/playlists/${playlist_spotify_id[0].get_playlist_spotify_id}`,
                headers: {
                    'Authorization' : `Bearer ${user.access_token}`
                }
            }

            let playlist = await axios(request);
            let returnObj = await db.import_playlist(JSON.stringify(playlist.data), user.userid);
            //all of the information about the next call is the same, other than the url
            //which I return from the database
            request.url = returnObj[0].tracks_href;
            let tracks = await axios(request);
            let totalPlaylists = tracks.data.total;
            let items = tracks.data.items;

            let nextUrl = tracks.data.next;
            
            if(nextUrl){
                for(let i=100; i<totalPlaylists; i += 100){
                    request.url = nextUrl;
                    let newData = await axios(request);
                    items = [...items, ...newData.data.items];
                    nextUrl = newData.data.next;
                }
            }

            //    it seems that errors won't get pushed to the console unless massive is assigning
            //    the return value from the database to something 
            let songID = await db.import_playlist_tracks(returnObj[0].playlist_id, JSON.stringify(items));
            let check_sync = await db.check_playlist_sync_with_differences(+playlist_id, JSON.stringify(items));
            res.send(check_sync).status(200);

        } catch(err){
            console.log('Problem importing playlist tracks:', err);
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

    generatePlaylistByTags: async (req, res) => {
        try{
            let db = req.app.get('db');
            let user = req.session.user;

            let playlistId = req.params.playlist_id;
            let includeTags = req.body.includeList;
            let excludeTags = req.body.excludeList;

            let data = await db.generate_playlists_tag_based(
                user.userid,
                playlistId,
                includeTags,
                excludeTags
            );
            console.log(data);
            res.send(data).status(200);
        } catch(err){
            console.log(err);
            res.send(err).status(500);
        }
    },

    getPlaylistInfo: async (req, res) => {
        try {
            let db = req.app.get('db');
            let user = req.session.user;
            
            if(!req.params.playlist_id || isNaN(req.params.playlist_id))
                throw new Error('invalid playlist id in get playlist: '+ req.params.playlist_id);

            let data = await db.get_playlist_info(+req.params.playlist_id, +user.userid);
            res.send(data).status(200);
        } catch(err){
            console.log(err).status(500);
            res.send(err).status(500);
        }
    },

    createPlaylist: async (req, res) => {
        try{
            let db = req.app.get('db');
            let user = req.session.user;

            let data = {
                name: req.body.name,
                public: req.body.public
            }

            let url = `https://api.spotify.com/v1/users/${user.spotify_id}/playlists`
            let requestObj = {
                url,
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${user.access_token}`
                },
                data
            }
            let response = await axios(requestObj);
            let info = await db.import_playlist(JSON.stringify(response.data), +user.userid);
            res.send(`${info[0].playlist_id}`).status(200);


        } catch(err){
            console.log(err);
            res.send(err).status(500);
        }

    },

    postPlaylistImage: async (req, res) => {
        try{
            let db = req.app.get('db');
            let user = req.session.user;
            let playlist_id = req.params.playlist_id;
            if(!playlist_id || isNaN(playlist_id)){
                throw new Error('Invalid playlist id provided, cannot update playlist image');
            }

            let playlist_spotify_id = await db.get_playlist_spotify_id(playlist_id, user.userid);
            if(playlist_spotify_id.length < 1){
                throw new Error('Invalid playlist, cannot update playlist image ' + JSON.stringify(playlist_spotify_id));
            }

            let body = req.body.image;

            let url = `https://api.spotify.com/v1/playlists/${playlist_spotify_id[0].get_playlist_spotify_id}/images`
            let requestObj = {
                url,
                method: 'PUT',
                headers: {
                    'Authorization' : `Bearer ${user.access_token}`,
                    'Content-Type' : 'image/jpeg'
                },
                data: body
            }

            let response = await axios(requestObj);

        } catch(err){
            console.log('Error in post playlist image:', err);
            res.send(err).status(500);
        }

    },

    editPlaylistDetails: async (req, res) => {
        try{
            let db = req.app.get('db');
            let user = req.session.user;
            let playlist_id = req.params.playlist_id;
            let { name, public_playlist } = req.body;

            if(!playlist_id || isNaN(playlist_id)){
                throw new Error('Invalid playlist id provided, cannot update playlist image');
            }

            let playlist_spotify_id = await db.get_playlist_spotify_id(+playlist_id, user.userid);
            let url = `https://api.spotify.com/v1/playlists/${playlist_spotify_id[0].get_playlist_spotify_id}`
            let requestObj = {
                url,
                method: 'PUT',
                headers: {
                    'Authorization' : `Bearer ${user.access_token}`,
                    'Content-Type' : 'application/json'
                },
                data: JSON.stringify({
                    name,
                    public: public_playlist
                })
            }

            let response = await axios(requestObj);

            requestObj = {
                url: `https://api.spotify.com/v1/playlists/${playlist_spotify_id[0].get_playlist_spotify_id}`,
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${user.access_token}`
                }
            }
            let playlist = await axios(requestObj);
            console.log(playlist.data);
            let info = await db.import_playlist(JSON.stringify(playlist.data), +user.userid);
            console.log('info', info);
            res.send(info);
        } catch(err){
            console.log('Erorr in edit playlist:', err);
            res.send(err).status(500);
        }

    },

    addSongsToPlaylist: async (req, res) =>{
        try{
            let db = req.app.get('db');
            let user = req.session.user;

            let songsArr = req.body.songsArr;
            let playlistId = req.body.playlistId;
            let skipImport = req.body.skipImport;

            let uris = songsArr.map((item, index) => item.spotify_uri);
            if(!skipImport){
                await songsArr.forEach(async (item, index) => {
                    //Songs from search are not imported automatically due to space concerns, they will not have a property
                    //song_id and will have an original. This will import the song and set the object in the songs array to be
                    //what was originally sent from spotify, for importing purposes.
                    
                    if(!item.song_id && item.original){
                        songsArr[index] = {track: songsArr[index].original};
                        await db.import_song(JSON.stringify(item.original)).then(res => {
                            console.log('hit this')
                            
                        }).catch(err => {
                            throw new Error(`Error importing song ${songsArr[index].song_name}. Error: ${err}`);
                        });
                    }

                })
            }



            let playlist_spotify_id = await db.get_playlist_spotify_id(playlistId, user.userid);
            playlist_spotify_id = playlist_spotify_id[0].get_playlist_spotify_id;

            let requestObj = {
                url: `https://api.spotify.com/v1/playlists/${playlist_spotify_id}/tracks`,
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${user.access_token}`,
                    'Content-Type' : 'application/json'
                },
                data: uris
            }

            let response = await axios(requestObj);

            if(!skipImport){
                db.import_playlist_tracks(playlistId, JSON.stringify(songsArr)).then(dbRes => {
                    res.sendStatus(201);
                }).catch(err => {
                    throw new Error(`Error importing playlist tracks after posting to spotify Error: ${err}`);
                });
            } else {
                res.sendStatus(200);
            }

        } catch(err){
            console.log('Error adding tracks to playlist Error: ' + err);
            res.send(err).status(500);
        }



    },

    removeSongsLocal: async (req, res) => {
        try{
            let db = req.app.get('db');
            let user = req.session.user;
            let playlistId = req.params.playlist_id;
            let songsArr = req.body.songsArr;
            let data = await db.remove_songs_from_playlist(user.userid, playlistId, songsArr);
            res.send(data).status(200);
            
        } catch(err){
            console.log('Error in removeSongsLocal: ', err);
            res.send(err).status(500);
        }
    },


    // postPlaylistImage: async (req, res) => {
    //     try{
    //         let db = req.app.get('db');
    //         let user = req.session.user;
    //         let playlist_id = req.params.playlist_id;
    //         let uris = req.body.tracks;

    //         let playlist_spotify_id = await db.get_playlist_spotify_id(playlist_id, user.userid);
    //         if(playlist_spotify_id.length < 1){
    //             throw new Error('Invalid playlist, cannot update playlist image ' + JSON.stringify(playlist_spotify_id));
    //         }

    //         let url = `https://api.spotify.com/v1/playlists/${playlist_spotify_id[0].get_playlist_spotify_id}/tracks`
    //         let requestObj = {
    //             url,
    //             method: 'PUT',
    //             headers: {
    //                 'Authorization' : `Bearer ${user.access_token}`,
    //                 'Content-Type' : 'image/jpeg'
    //             },
    //             body: {
    //                 uris
    //             }
    //         }

    //         let response = await axios(requestObj);

    //     } catch(err){
    //         console.log(err);
    //         res.send(err).status(500);
    //     }
    // }

}