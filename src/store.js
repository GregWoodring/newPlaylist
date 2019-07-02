import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './reducers/userReducer';
import recentlyPlayedReducer from './reducers/recentlyPlayedReducer';
import routingReducer from './reducers/routingReducer';
import playlistReducer from './reducers/playlistReducer';
import searchReducer from './reducers/searchReducer';

const rootReducer = combineReducers({
    user: userReducer,
    recentlyPlayed: recentlyPlayedReducer,
    routing: routingReducer,
    playlists: playlistReducer,
    search: searchReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));