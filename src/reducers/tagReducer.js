import axios from 'axios';

let initialState = {
    pinnedTags: [],
    fetchingPinnedTags: false,
    userTags: [],
    fetchingUserTags: false
}

export default function reducer(state = initialState, action){
    let { type, payload } = action;

    switch(type){
        case GET_PINNED_TAGS + '_PENDING':
            return {...state, fetchingPinnedTags: true }
        case GET_PINNED_TAGS + '_FULFILLED':
            return {...state, fetchingPinnedTags: false, pinnedTags: payload.data }
        case UPDATE_PINNED_TAGS:
            return {...state, pinnedTags: payload }
        case GET_USER_TAGS + '_PENDING':
            return {...state, fetchingUserTags: true }
        case GET_USER_TAGS + '_FULFILLED':
            return {...state, fetchingUserTags: false, userTags: payload.data }
        default:
            return state;
    }
}

const GET_PINNED_TAGS = 'GET_PINNED_TAGS';
const UPDATE_PINNED_TAGS = 'UPDATE_PINNED_TAGS';
const GET_USER_TAGS = 'GET_USER_TAGS';

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

export function getUserTags(){
    let data = axios.get('/api/get_user_tags');
    return {
        type: GET_USER_TAGS,
        payload: data
    }
}

