const axios = require('axios');
const authController = require('../auth/authController')

module.exports = {
    getRecentlyPlayed: (req,res) => {
        try{
            let accessToken = req.session.user.access_token
            let userId = req.session.user.userid;
            let requestObj = {
                url: 'https://api.spotify.com/v1/me/player/recently-played?limit=50',
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${accessToken}`
                }
            }

            axios(requestObj).then(result => {
                let items = result.data.items;
                let db = req.app.get('db');
                
                db.import_recently_played_bulk(JSON.stringify(items), userId).then(result => {
                    db.get_recently_played_display(userId).then(result => {
                        res.send(result).status(200);
                    }).catch(err => {
                        console.log(err)
                        res.send(err).status(500);
                    })
                }).catch(err => {
                    console.log(err);
                    res.send(err).status(500);
                })
                        
                
            }).catch(err => {
                console.log(err);
                authController.logout(req, res);
            })
        } catch(err){
            console.log(err);
            res.sendStatus(500);
        }
        
    },

    addSongTag: async (req, res) => {
        try{
            let db = req.app.get('db');
            let { tagDescription, songId } = req.body;
            let userId = 1 //req.session.user.userid;
            await db.insert_song_tag(
                tagDescription,
                songId,
                userId
            )

            res.sendStatus(200);
        } catch(err){
            console.log('Error adding song tag: ' + err)
            res.send(err).status(500);
        }
    },

    getSongTags: async (req, res) => {
        try{
            let db = req.app.get('db');
            let { song_id : songId } = req.params;
            let userId = 1 //req.session.user.userid;

            let data = await db.get_song_tags(
                songId,
                userId
            );

            res.send(data).status(200);
        } catch(err){
            console.log('Error getting song tags: ' + err);
            res.send(err).status(500);
        }

    },

    searchSongs: async (req, res) => {
        try{
            let accessToken = req.session.user.access_token
            let text = req.params.text;
            let requestObj = {
                url: `https://api.spotify.com/v1/search?q=${text}&type=track&limit=50`,
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${accessToken}`
                }
            }

            let data = await axios(requestObj);
           
            let pagingObj = cleanSearchResults(data);
            res.send(pagingObj).status(200);

        } catch(err){
            console.log('dataController.searchSongs error:', err);
            res.send(err).status(500);
        }
            
    },

    getNextPrevious: async (req, res) => {
        try{
            let accessToken = req.session.user.access_token
            let url = req.body.url;
            console.log(url);
            
            let requestObj = {
                url,
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${accessToken}`
                }
            }

            let data = await axios(requestObj);
            let pagingObj = cleanSearchResults(data);
            console.log(pagingObj);
            res.send(pagingObj).status(200);
        } catch(err){
            console.log(err);
            res.send(err);
        }
    }

    
    
}

function cleanSearchResults(data){
    try{
        let items = data.data.tracks.items;
        items = items.map(item => {
            let obj = {};
            obj.song_name = item.name;
            obj.images_arr = item.album.images;
            obj.release_date = item.album.release_date;
            obj.artist_names = '';
            item.artists.forEach((artist, index) => {
                if(+item.artists.length -1 === +index){
                    obj.artist_names += artist.name;
                } else {
                    obj.artist_names += artist.name + ', ';
                }
            });
            obj.album_name = item.album.name;
            obj.original = item;
            return obj;
        });

        return {
            items,
            next: data.data.tracks.next,
            previous: data.data.tracks.previous,
            limit: data.data.tracks.limit,
            offset: data.data.tracks.offset,
            total: data.data.tracks.total
        }
    } catch(err){
        throw err;
    }
}