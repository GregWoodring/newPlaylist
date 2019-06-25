import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './reducers/userReducer';
import recentlyPlayedReducer from './reducers/recentlyPlayedReducer';
import routingReducer from './reducers/routingReducer';
import playlistReducer from './reducers/playlistReducer';

const rootReducer = combineReducers({
    user: userReducer,
    recentlyPlayed: recentlyPlayedReducer,
    routing: routingReducer,
    playlists: playlistReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));