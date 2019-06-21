const axios = require('axios');


module.exports = {
    getUserPlaylists: async (req, res) => {
        try{
            let db = req.app.get('db');
            let { user } = req.session;

            let data = await axios.get(`https://api.spotify.com/v1/users/${user.userid}/playlists`);
        } catch(err){
            console.log(err);
            res.send(err).status(500);
        }

    }
}