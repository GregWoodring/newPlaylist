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

app.get('/api/recently_played', authMiddleware.userOnly, dataController.getRecentlyPlayed);

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})