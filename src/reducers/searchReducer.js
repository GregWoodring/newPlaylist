import axios from 'axios';

let initialState = {
    results: [],
    fetchingSearch: false,
    currentPlaylistId: null,
    nextUrl: '',
    previousUrl: ''
}

export default function reducer(state = initialState, action){

    let { type, payload } = action;
    switch(type){
        case SEARCH_BY_SONG_TITLE + '_PENDING':
            return {...state, fetchingSearch: true}
        case SEARCH_BY_SONG_TITLE + '_FULFILLED':
            return {...state, fetchingSearch: false, 
                results: payload.data.items, 
                nextUrl: payload.data.next, 
                previousUrl: payload.data.previous}
        case GET_NEXT_OR_PREVIOUS_RESULT + '_PENDING':
            console.log('pending')
            return {...state, fetchingSearch: true}
        case GET_NEXT_OR_PREVIOUS_RESULT + '_FULFILLED':
            console.log('fulfilled:',payload);
            return {...state, fetchingSearch: false,
                results: payload.data.items, 
                nextUrl: payload.data.next, 
                previousUrl: payload.data.previous}
        default: 
            return state;
    }
}

const SEARCH_BY_SONG_TITLE = 'SEARCH_BY_SONG_TITLE';
const GET_NEXT_OR_PREVIOUS_RESULT = 'GET_NEXT_OR_PREVIOUS';

export const searchBySongTitle = text => {
    let data = axios.get(`/api/search_songs/${text}`);

    return {
        type: SEARCH_BY_SONG_TITLE,
        payload: data
    }
}

export const getNextOrPreviousResult = url => {
    if(!url) return {type: 'default'};

    let data = axios.post(`/api/next_previous_search_result`, {url});
    return{
        type: GET_NEXT_OR_PREVIOUS_RESULT,
        payload: data
    }
}