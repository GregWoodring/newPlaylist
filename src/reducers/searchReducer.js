import axios from 'axios';

let initialState = {
    results: [],
    fetchingSearch: false,
    currentPlaylistId: null
}

export default function reducer(state = initialState, action){

    let { type, payload } = action;
    switch(type){
        case SEARCH_BY_SONG_TITLE + '_PENDING':
            return {...state, fetchingSearch: true}
        case SEARCH_BY_SONG_TITLE + '_FULFILLED':
            console.log('search returned:', payload)
            return {...state, fetchingSearch: false, results: payload.data.items}
        default: 
            return state;
    }
}

const SEARCH_BY_SONG_TITLE = 'SEARCH_BY_SONG_TITLE';

export const searchBySongTitle = text => {
    let data = axios.get(`/api/search_songs/${text}`);

    return {
        type: SEARCH_BY_SONG_TITLE,
        payload: data
    }
}