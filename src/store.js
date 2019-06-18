import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './reducers/userReducer';
import recentlyPlayedReducer from './reducers/recentlyPlayedReducer';

const rootReducer = combineReducers({
    user: userReducer,
    recentlyPlayed: recentlyPlayedReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));