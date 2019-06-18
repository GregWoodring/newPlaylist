import axios from 'axios'


const initialState = {
    displayName: '',
    loggingIn: false,
    loggedIn: false

}

export default function reducer(state = initialState, action){
    let { type, payload } = action;

    switch(type){
        case CHECK_LOGIN + '_FULFILLED':
            return {...state, loggedIn: payload}
        case LOGIN_SPOTIFY + '_PENDING':
            return {...state, loggingIn: true}; 
        case LOGIN_SPOTIFY + '_FULFILLED':
            return {...state, loggingIn: false};
        default:
            return state;
    }
}

const CHECK_LOGIN = 'CHECK_LOGIN';
export const checkLogin = () => {
    let data = axios.get('/auth/check_login').then(res => res.data);
    return {
        type: CHECK_LOGIN,
        payload: data
    }
}

const LOGIN_SPOTIFY = 'LOGIN_SPOTIFY';

export const loginUser = code => {
    let data = axios.post(`/auth/spotify?code=${code}`).then(res => data);
    console.log('login data:', data);
    return {
        type: LOGIN_SPOTIFY
    }
}