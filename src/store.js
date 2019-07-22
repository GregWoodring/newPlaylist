import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './reducers/userReducer';
import recentlyPlayedReducer from './reducers/recentlyPlayedReducer';
import routingReducer from './reducers/routingReducer';
import playlistReducer from './reducers/playlistReducer';
import searchReducer from './reducers/searchReducer';
import tagReducer from './reducers/tagReducer';
import playerReducer from './reducers/playerReducer';

const rootReducer = combineReducers({
    user: userReducer,
    recentlyPlayed: recentlyPlayedReducer,
    routing: routingReducer,
    playlists: playlistReducer,
    search: searchReducer,
    tags: tagReducer,
    player: playerReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));