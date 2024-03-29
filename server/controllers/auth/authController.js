const axios = require('axios');
const qs = require('qs');

let { redirect_uri, client_id, client_secret, scope } = require('../../../secret');


module.exports = {
    login: (req, res) => {
        res.send(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`).status(200)
    },

    logout: (req, res) => {
        try{
            delete req.session.user;
            res.redirect('/');
        } catch(err){
            console.log(err);
            res.send(err).status(500);
        }
    },

    oAuth: (req, res) => {
        try{
            let body =  {
                grant_type : 'authorization_code',
                code: req.query.code,
                redirect_uri,
                client_id,
                client_secret,
                scope
            };
        
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            axios.post('https://accounts.spotify.com/api/token', qs.stringify(body), config).then(result => {
                let { access_token,  expires_in, refresh_token } = result.data;
                let request = {
                    method:'GET',
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization' : `Bearer ${access_token}`
                    }
                }
                axios(request).then(result => {
                    let { id, display_name, email, /* url */ birthdate, country, /*followers*/ href } = result.data
                    let url = result.data.external_urls.spotify;
                    let followers = result.data.followers.total;
                    
                    req.app.get('db').create_or_update_user(
                        id,
                        display_name,
                        email,
                        url,
                        birthdate,
                        country,
                        followers,
                        href,
                        access_token,
                        expires_in,
                        refresh_token
                    ).then(async result => {
                        //res.send(result);
                        req.session.user = result[0];
                        res.redirect(process.env.NODE_ENV === 'development' ?  'http://localhost:3000' : 'http://newplaylist.gregwoodring.com/')
                    }).catch(err => {
                        //res.send(`Error ${err}`).status(500);
                        console.log(err)
                    });
        
                }).catch(err => {
                    console.log(err);
                    res.send(`Error ${err}`).status(500)
                });
                
            }).catch(err => {
                console.log(err)
                res.send(`Error ${err}`).status(500);
            });
        } catch(err){
            console.log(err);
            res.send(err);
        }
    },
    
    check_login: (req, res) => {
        try{
            if(req.session.user){
                res.send(true).status(200);
            } else {
                res.send(false).status(200);
            }
        } catch(err){
            console.log('Error Checking Login:', err)
            res.send(err).status(500);
        }
        
            
    },

    getAccessToken: (req, res) => {
        try{
            res.send(req.session.user.access_token).status(200);
        } catch(err){
            console.log('Error getting access token:', err);
            res.send(err).status(500);
        }
    }
    
}