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
                //res.sendStatus(500);
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

    }
}