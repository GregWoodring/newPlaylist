import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './reducers/userReducer';
import recentlyPlayedReducer from './reducers/recentlyPlayedReducer';
import routingReducer from './reducers/routingReducer';

const rootReducer = combineReducers({
    user: userReducer,
    recentlyPlayed: recentlyPlayedReducer,
    routing: routingReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));