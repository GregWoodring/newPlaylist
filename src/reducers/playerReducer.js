import axios from "axios";

const initialState = {
    player: {},
    currentlyPlayingSong: null,
    deviceId: null,
    isPlaying: false,
    deviceOnline: false
}

export default function reducer(state = initialState, action){
    let { type, payload } = action;

    switch(type){
        case GET_PLAYER:
            return { ...state, player: payload };
        case SET_DEVICE_ID:
            console.log('device id', payload);
            return { ...state, deviceId: payload };
        case GET_CURRENTLY_PLAYING + '_FULFILLED':
            console.log(payload)
            return { ...state, 
                currentlyPlayingSong: payload.data.song,
                isPlaying: payload.data.play };
        case SET_PLAY_PAUSE:
            return { ...state, isPlaying: payload };
        case SET_DEVICE_ONLINE:
            return {...state, deviceOnline: payload };
        default:
            return state;
    }
}

const GET_PLAYER = 'GET_PLAYER';
const GET_CURRENTLY_PLAYING = 'GET_CURRENTLY_PLAYING';
const SET_DEVICE_ID = 'SET_DEVICE_ID';
const SET_PLAY_PAUSE = 'SET_PLAY_PAUSE';
const SET_DEVICE_ONLINE = 'SET_DEVICE_ONLINE';

export function getPlayer(player, deviceId){
    return{
        type: GET_PLAYER,
        payload: {player, deviceId}
    }
}

export function getCurrentlyPlaying(){
    let data = axios.get('/api/get_current_playback')
    return {
        type: GET_CURRENTLY_PLAYING,
        payload: data
    }
}

export function setDeviceId(deviceId){
    return{
        type: SET_DEVICE_ID,
        payload: deviceId
    }
}

export function setPlayPause(play){
    return{
        type: SET_PLAY_PAUSE,
        payload: play
    }
}

export function setDeviceOnline(online){
    return{ 
        type: SET_DEVICE_ONLINE,
        payload: online
    }
}

