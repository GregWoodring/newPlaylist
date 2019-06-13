const axios = require('axios');

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

            axios(requestObj).then(async result => {
                let items = result.data.items;
                let data = await req.app.get('db').import_recently_played_bulk(JSON.stringify(items), userId)
                res.send(data).status(200);
            }).catch(err => {
                console.log(err);
                res.send('Server Error: ' + err).status(500);
            })
        } catch(err){
            console.log(err);
            res.send('Server Error: ' + err).status(500);
        }
        
    }
}