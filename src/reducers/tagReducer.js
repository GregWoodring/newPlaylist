import axios from 'axios';

let initialState = {
    pinnedTags: [],
    fetchingPinnedTags: false
}

export default function reducer(state = initialState, action){
    let { type, payload } = action;

    switch(type){
        case GET_PINNED_TAGS + '_PENDING':
            return {...state, fetchingPinnedTags: true}
        case GET_PINNED_TAGS + '_FULFILLED':
            return {...state, fetchingPinnedTags: false, pinnedTags: payload.data}
        case UPDATE_PINNED_TAGS:
            return {...state, pinnedTags: payload }
        default:
            return state;
    }
}

const GET_PINNED_TAGS = 'GET_PINNED_TAGS';
const UPDATE_PINNED_TAGS = 'UPDATE_PINNED_TAGS';

export function getPinnedTags(){
    let data = axios.get('/api/get_pinned_tags');

    return{
        type: GET_PINNED_TAGS,
        payload: data
    }
}

export function updatePinnedTags(data){
    return{
        type: UPDATE_PINNED_TAGS,
        payload: data
    }
}

