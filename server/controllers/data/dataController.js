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
        
    }
}