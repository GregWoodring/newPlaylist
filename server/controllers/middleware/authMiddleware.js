const axios = require('axios');
const secret = require('../../../secret');
const qs = require('qs');

module.exports = {
    userOnly: (req,res,next) => {
        console.log(req.session);
        if(req.session.user){
            console.log('user logged in');
            next();
        } else {
            res.send('Please log in').status(401);
        }
    },

    reAuth: (req, res, next) => {
        let db = req.app.get('db');


        let expireTime = new Date(req.session.user.updated_at);
        expireTime.setHours(expireTime.getHours() + 1);
        let currentTime = new Date();
        let difference = expireTime - currentTime;

        if(difference <= 0){
            let body = {
                grant_type: 'refresh_token',
                refresh_token: req.session.user.refresh_token
            }

            let config = {
                headers: {
                    'Authorization': `Basic ${secret.base64}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            axios.post('https://accounts.spotify.com/api/token', qs.stringify(body), config).then(result => {
                console.log(result);
            }).catch(err => {
                console.log(err);
            })
        } else {
            next();
        }
    }
}