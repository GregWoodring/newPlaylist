try{
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

let { SERVER_PORT } = process.env

//controllers
const authController = require('./controllers/auth/authController');
const dataController = require('./controllers/data/dataController');
const playlistController = require('./controllers/data/playlistController');


//middleware
const authMiddleware = require('./controllers/middleware/authMiddleware')

const { connectionString, 
    session_secret,
    client_id,
    redirect_uri,
    scope,
    client_secret
 } = require('../secret.js');

 

let app = express();

app.use(express.json());
app.use(session({
    cookie: {
        maxAge: 1000*60*60*24*30, //30 days
    },
    resave: false,
    // saveUninitialized: false,
    secret: session_secret,
    store: new pgSession({
        conObject: connectionString
    })
}));

massive(connectionString).then(db => {
    app.set('db', db);
    console.log('database connected');
}).catch(err => {
    console.log('database connection error: '+ err)
});

//app.post('/auth/login-spotify', authController.login);
app.get('/auth/spotify', authController.oAuth);
app.get('/auth/check_login', authController.check_login);
app.post('/auth/logout', authController.logout);

app.get('/api/recently_played', authMiddleware.userOnly, authMiddleware.reAuth, dataController.getRecentlyPlayed);

app.post('/api/song_tag', authMiddleware.userOnly, authMiddleware.reAuth, dataController.addSongTag);
app.get('/api/song_tag/:song_id', authMiddleware.userOnly, authMiddleware.reAuth, dataController.getSongTags);

app.get('/api/import_playlists', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.importUserPlaylists);
app.get('/api/get_playlists', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.getPlaylists);
app.get('/api/playlist_songs/:playlist_id', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.getPlaylistSongs);
app.get('/api/get_playlist_info/:playlist_id', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.getPlaylistInfo);
app.get('/api/sync_playlist/:playlist_id', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.importPlaylistTracks)
app.get('/api/search_songs/:text', authMiddleware.userOnly, authMiddleware.reAuth, dataController.searchSongs);
app.post('/api/next_previous_search_result', authMiddleware.userOnly, authMiddleware.reAuth, dataController.getNextPrevious);

app.post('/api/create_playlist', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.createPlaylist);
app.put('/api/edit_playlist/:playlist_id', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.editPlaylistDetails);
app.post('/api/post_playlist_image/:playlist_id', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.postPlaylistImage);

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})

} catch(err){
    console.log('Error in index.js: ' + err);
}