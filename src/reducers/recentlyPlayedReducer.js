import axios from 'axios'

//reducer for the recently played songs screen
//Will be home screen 

const initialState = {
    recentlyPlayed: [],
    currentSong: null,
    loadingRP: false
}

export default function reducer(state = initialState, action){
    let { type, payload, meta } = action;

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
        case CHANGE_CURRENT_SONG:
            return {...state, currentSong: payload}
        case UPDATE_RP_SONG_TAGS:
            let newRecentlyPlayedList = [...state.recentlyPlayed];
            newRecentlyPlayedList[newRecentlyPlayedList.findIndex(item => +item.song_id === +meta)].tags_arr = payload;
            return {...state, recentlyPlayed: newRecentlyPlayedList }
        default:
            return state;
    }
}

const GET_RECENTLY_PLAYED = 'GET_RECENTLY_PLAYED';
const GET_CURRENT_SONG = 'GET_CURRENT_SONG';
const CHANGE_CURRENT_SONG = 'CHANGE_CURRENT_SONG';
const UPDATE_RP_SONG_TAGS = 'UPDATE_RP_SONG_TAGS';

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

export const changeCurrentSong = song => {
    return {
        type: CHANGE_CURRENT_SONG,
        payload: song
    }
}

export const updateRecentlyPlayedTags = (songId, tagsArr) =>{
    return {
        payload: tagsArr,
        type: UPDATE_RP_SONG_TAGS,
        meta: songId
    }
}