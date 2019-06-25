import axios from 'axios';


let initialState = {
    fetchingPlaylists: false,
    playlistList: []
}

export default function reducer(state = initialState, action){
    let { type, payload } = action;

    switch(type){
        case IMPORT_USER_PLAYLISTS + '_PENDING':
            return {...state, fetchingPlaylists: true}
        case IMPORT_USER_PLAYLISTS + '_FULFILLED':
            return {...state, fetchingPlaylists: false}
        case GET_USER_PLAYLISTS + '_PENDING':
            return {...state, fetchingPlaylists: true}
        case GET_USER_PLAYLISTS + '_FULFILLED':
            console.log(payload)
            return {...state, playlistList: payload, fetchingPlaylists: false}
        default:
            return state;
    }
}

const IMPORT_USER_PLAYLISTS = 'IMPORT_USER_PLAYLISTS';
const GET_USER_PLAYLISTS = 'GET_USER_PLAYLISTS';

export const importUserPlaylists = () => {
    let data = axios.get('/api/import_playlists');
    return {
        type: IMPORT_USER_PLAYLISTS
    }
}

export const getUserPlaylists = () => {
    let data = axios.get('/api/get_playlists');
    return {
        type: GET_USER_PLAYLISTS,
        payload: data
    }
}