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
            let userId = req.session.user.userid;

            tagDescription = tagDescription.toLowerCase();
            let regex = new RegExp(/^[A-Za-z]+$/);
            if(!regex.test(tagDescription))
                throw new Error('Invalid input for tagDescription')

            let data = await db.insert_song_tag(
                tagDescription,
                songId,
                userId
            )

            res.send(data).status(200);
        } catch(err){
            console.log('Error adding song tag: ' + err)
            res.send(err).status(500);
        }
    },

    removeSongTag: async (req, res) => {
        try{
            let db = req.app.get('db');
            let user = req.session.user;
            let songTagId = req.params.song_tag_id;

            let data = db.remove_song_tag(songTagId, user.userid);
            res.send(data).status(200);
        } catch(err){
            console.log('Error removing tag' ,err);
            res.send(err).status(500);
        }
    },

    getSongTags: async (req, res) => {
        try{
            let db = req.app.get('db');
            let { song_id : songId } = req.params;
            let userId = req.session.user.userid;
            if(!songId){
                
            }

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

    getPinnedTags: async (req, res) => {
        try{
            let db = req.app.get('db');
            let user = req.session.user;

            let data = await db.get_pinned_tags(user.userid);
            res.send(data).status(200);
        } catch(err){
            console.log('Error getting Pinned Tags: '+ err);
            res.send(err).status(500);
        }
    },

    removePinnedTag: async (req, res) => {
        try{
            let db = req.app.get('db');
            let user = req.session.user;
            let tagId = req.params.tag_id;

            let data = await db.remove_pinned_tag(user.userid, tagId);

            res.send(data).status(200);
        } catch(err){
            console.log(err);
            res.send(err).status(500);
        }
    },

    pinTag: async (req, res) => {
        try{
            let db = req.app.get('db');
            let user = req.session.user;
            let tagId = req.params.tag_id;

            let data = await db.pin_tag(user.userid, tagId);
            res.send(data).status(200);


        } catch(err) {
            console.log(err);
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
            
            let requestObj = {
                url,
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${accessToken}`
                }
            }

            let data = await axios(requestObj);
            let pagingObj = cleanSearchResults(data);
            res.send(pagingObj).status(200);
        } catch(err){
            console.log(err);
            res.send(err).status(500);
        }
    },

    getUsersTags: async (req, res) => {
        try{
            let db = req.app.get('db');
            let user = req.session.user;

            let data = await db.get_user_tags(user.userid);
            res.send(data).status(200);
        } catch(err){
            console.log(err);
            res.send(err).status(500);
        }
    },

    getCurrentPlayback: async (req, res) => {
        try{
            let user = req.session.user;
            let db = req.app.get('db');

            let url = 'https://api.spotify.com/v1/me/player';
            let requestObj = {
                url,
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${user.access_token}`
                }
            }

            let data = await axios(requestObj);
            let [song] = await db.get_or_import_song(JSON.stringify(data.data.item));
            // song = song.data;
            res.send({
                song,
                play:  data.data.is_playing,
                deviceId: data.data.device.id
            }).status(200);

        } catch(err){
            console.log(err);
            res.send(err).status(500);
        }
    }

    
    
}

function cleanSearchResults(data){
    try{
        let items = data.data.tracks.items;
        items = items.map(item => cleanSongItem(item));

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

function cleanSongItem(item){
    try{
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
        obj.spotify_uri = item.uri;
        obj.original = item;
        return obj;
    } catch(err){
        throw err;
    }
}