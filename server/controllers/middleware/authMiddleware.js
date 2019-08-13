const axios = require('axios');
const secret = require('../../../secret');
const qs = require('qs');

module.exports = {
    userOnly: (req,res,next) => {
        try{
            if(req.session.user){
                next();
            } else {
                res.send('Please log in').status(401);
            }
        } catch(err){
            console.log(err);
            res.send(err).status(500);
        }
    },

    reAuth: (req, res, next) => {
        try{
            let db = req.app.get('db');
            let userid = req.session.user.userid;

        

            let expireTime = new Date(req.session.user.updated_at);
            expireTime.setHours(expireTime.getHours() + 1);
            let currentTime = new Date();
            let difference = expireTime - currentTime;
            
            
            if(difference <= 1000 * 60 * 5){ //if token is 55 minutes old get a new one, 
                                                //done asynchronously so it won't interrupt other request
                let body = {
                    grant_type: 'refresh_token',
                    refresh_token: req.session.user.refresh_token,
                    client_id: secret.client_id,
                    client_secret: secret.client_secret
                }

                let config = {
                    headers: {
                        //'Authorization': `Basic ${secret.base64}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }

                axios.post('https://accounts.spotify.com/api/token', qs.stringify(body), config).then(result => {
                    db.update_user_access(
                        userid,
                        result.data.access_token,
                        result.data.expires_in
                    ).then(result => {
                        req.session.user = result[0];
                    }).catch(err => {
                        console.log(err);
                    })
                }).catch(err => {
                    console.log(err);
                })

                if(difference > 0){
                    next();
                } else {
                    setTimeout(next, 2000); 
                    //might want to redo this with proper async wait, but 2 seconds should be long enough 
                    //to ensure that the database is updated
                }
                
            } else {
                next();
            }
        } catch(err){
            console.log(err);
            res.send(err).status(500);
        }
    }
}