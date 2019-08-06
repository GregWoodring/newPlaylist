try{
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
require('dotenv').config();

let { PORT } = process.env

//controllers
const authController = require('./controllers/auth/authController');
const dataController = require('./controllers/data/dataController');
const playlistController = require('./controllers/data/playlistController');

//middleware
const authMiddleware = require('./controllers/middleware/authMiddleware')

const { connectionString, session_secret } = require('../secret.js');

let app = express();

app.use( express.static( `${__dirname}/../build` ) );
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


//Auth
app.get('/auth/spotify', authController.oAuth);
app.get('/auth/check_login', authController.check_login);
app.post('/auth/logout', authController.logout);
app.get('/api/get_access_token', authMiddleware.userOnly, authMiddleware.reAuth, authController.getAccessToken)

//Recently Played
app.get('/api/recently_played', authMiddleware.userOnly, authMiddleware.reAuth, dataController.getRecentlyPlayed);
app.get('/api/get_current_playback', authMiddleware.userOnly, authMiddleware.reAuth, dataController.getCurrentPlayback);

//Search
app.get('/api/search_songs/:text', authMiddleware.userOnly, authMiddleware.reAuth, dataController.searchSongs);
app.post('/api/next_previous_search_result', authMiddleware.userOnly, authMiddleware.reAuth, dataController.getNextPrevious);

//Playlists
app.get('/api/import_playlists', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.importUserPlaylists);
app.get('/api/get_playlists', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.getPlaylists);
app.get('/api/playlist_songs/:playlist_id', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.getPlaylistSongs);
app.get('/api/get_playlist_info/:playlist_id', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.getPlaylistInfo);
app.get('/api/sync_playlist/:playlist_id', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.importPlaylistTracks);
app.post('/api/create_playlist', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.createPlaylist);
app.put('/api/edit_playlist/:playlist_id', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.editPlaylistDetails);
app.post('/api/post_playlist_image/:playlist_id', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.postPlaylistImage);
app.post('/api/add_song_to_playlist',  authMiddleware.userOnly, authMiddleware.reAuth, playlistController.addSongsToPlaylist);
app.post('/api/add_songs_by_id/:playlist_id', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.generatePlaylistByTags);
app.post('/api/remove_songs_local/:playlist_id', authMiddleware.userOnly, authMiddleware.reAuth, playlistController.removeSongsLocal);

//Tags and Pins
app.post('/api/song_tag', authMiddleware.userOnly, authMiddleware.reAuth, dataController.addSongTag);
app.get('/api/song_tag/:song_id', authMiddleware.userOnly, authMiddleware.reAuth, dataController.getSongTags);
app.get('/api/get_pinned_tags', authMiddleware.userOnly, authMiddleware.reAuth, dataController.getPinnedTags);
app.delete('/api/remove_pinned_tag/:tag_id', authMiddleware.userOnly, authMiddleware.reAuth, dataController.removePinnedTag);
app.post('/api/pin_tag/:tag_id', authMiddleware.userOnly, authMiddleware.reAuth, dataController.pinTag);
app.delete('/api/remove_song_tag/:song_tag_id', authMiddleware.userOnly, authMiddleware.reAuth, dataController.removeSongTag);
app.get('/api/get_user_tags', authMiddleware.userOnly, authMiddleware.reAuth, dataController.getUsersTags);



app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})

} catch(err){
    console.log('Error in index.js: ' + err);
}