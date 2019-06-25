import axios from 'axios';


let initialState = {
    fetchingPlaylists: false
}

export default function reducer(state = initialState, action){
    let { type, payload } = action;

    switch(type){
        case GET_USER_PLAYLISTS + '_PENDING':
            return {...state, fetchingPlaylists: true}
        case GET_USER_PLAYLISTS + '_FETCHING':
            console.log(payload);
            return {...state, fetchingPlaylists: false}
        default:
            return state;
    }
}

const GET_USER_PLAYLISTS = 'GET_USER_PLAYLISTS';

export const getUserPlaylists = async () => {
    let data = await axios.get('/api/get_playlists');
    return {
        type: GET_USER_PLAYLISTS,
        payload: data
    }
}