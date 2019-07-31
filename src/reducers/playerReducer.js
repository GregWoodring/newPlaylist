const initialState = {
    player: {},
    currentlyPlayingURI: null,
    deviceId: null,
    isPlaying: false
}

export default function reducer(state = initialState, action){
    let { type, payload } = action;

    switch(type){
        case GET_PLAYER:
            return { ...state, player: payload };
        case SET_DEVICE_ID:
            console.log('device id', payload);
            return { ...state, deviceId: payload };
        case SET_CURRENTLY_PLAYING:
            return { ...state, currentlyPlayingURI: payload };
        case SET_PLAY_PAUSE:
            return { ...state, isPlaying: payload };
        default:
            return state;
    }
}

const GET_PLAYER = 'GET_PLAYER';
const SET_CURRENTLY_PLAYING = 'SET_CURRENTLY_PLAYING';
const SET_DEVICE_ID = 'SET_DEVICE_ID';
const SET_PLAY_PAUSE = 'SET_PLAY_PAUSE';

export function getPlayer(player, deviceId){
    return{
        type: GET_PLAYER,
        payload: {player, deviceId}
    }
}

export function setCurrentlyPlaying(uri){
    return {
        type: SET_CURRENTLY_PLAYING,
        payload: uri
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

