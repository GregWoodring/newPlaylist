const axios = require('axios');
const qs = require('qs');

let { redirect_uri, client_id, client_secret, scope } = require('../../../secret');


module.exports = {
    login: (req, res) => {
        console.log('hit endpoint');
        res.redirect(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`)
    },

    oAuth: (req, res) => {
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
        axios.post('https://accounts.spotify.com/api/token', qs.stringify(body), config).then(res => {
            let { access_token,  expires_in, refresh_token } = res.data;
            let request = {
                method:'GET',
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization' : `Bearer ${access_token}`
                }
            }
            axios(request).then(res => {
                let { id, display_name, email, /* url */ birthdate, country, /*followers*/ href } = res.data
                let url = res.data.external_urls.spotify;
                let followers = res.data.followers.total;
    
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
                    //console.log(result[0])
                    req.session.user = result[0]
                    await req.session.save();
                    console.log(req.session);
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
        res.send('reached endpoint!');
    }
}