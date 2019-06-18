import axios from 'axios'

//reducer for the recently played songs screen
//Will be home screen 

const initialState = {
    recentlyPlayed: [],
    currentSong: null,
    loadingRP: false
}

export default function reducer(state = initialState, action){
    let { type, payload } = action;

    switch(type){
        case GET_CURRENT_SONG:
            return {...state, currentSong: payload.currentSong}
        case GET_RECENTLY_PLAYED +'_PENDING':
            return {...state, loadingRP: true}
        case GET_RECENTLY_PLAYED + '_FULFILLED':
                if(state.currentSong){
                    return {...state, loadingRP: false, recentlyPlayed: payload.data}
                }else{
                    return {...state, loadingRP: false, recentlyPlayed: payload.data, currentSong: payload.data[0] }
                }
        default:
            return state;
    }
}

const GET_RECENTLY_PLAYED = 'GET_RECENTLY_PLAYED';
const GET_CURRENT_SONG = 'GET_CURRENT_SONG';

export const getCurrentSong = song => {
    return {
        type: GET_CURRENT_SONG,
        payload: song
    }
}


export const getRecentlyPlayed = () => {
    let data = axios.get('/api/recently_played');
    return {
        type: GET_RECENTLY_PLAYED,
        payload: data
    }
}