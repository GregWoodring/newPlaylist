import axios from 'axios';

let initialState = {
    fetchingPlaylists: false,
    fetchingSongs: false,
    fetchingPlaylistInfo: false,
    playlistList: [],
    playlistSongsList: [],
    currentPlaylistSong: null,
    currentPlaylist: null
}

export default function reducer(state = initialState, action){
    let { type, payload } = action;

    switch(type){
        case IMPORT_USER_PLAYLISTS + '_PENDING':
            return {...state, fetchingPlaylists: true}
        case IMPORT_USER_PLAYLISTS + '_FULFILLED':
            return {...state, fetchingPlaylists: false}
        case GET_USER_PLAYLISTS + '_PENDING':
            return {...state, fetchingPlaylists: true}
        case GET_USER_PLAYLISTS + '_FULFILLED':
            if(state.currentPlaylist){
                return {...state, playlistList: payload.data, fetchingPlaylists: false}
            } else {
                return {...state, playlistList: payload.data, fetchingPlaylists: false, currentPlaylist: payload.data[0]}
            }
        case CHANGE_CURRENT_PLAYLIST:
            return {...state, currentPlaylist: payload}
        case GET_PLAYLIST_SONGS + '_PENDING':
            return {...state, fetchingSongs: true}
        case GET_PLAYLIST_SONGS + '_FULFILLED':
            return {...state, fetchingSongs: false, playlistSongsList: payload.data, currentPlaylistSong: payload.data[0]}
        case CHANGE_CURRENT_PLAYLIST_SONG:
            return {...state, currentPlaylistSong: payload }
        case GET_PLAYLIST_INFO + '_PENDING':
            return {...state, fetchingPlaylistInfo: true}
        case GET_PLAYLIST_INFO + '_FULFILLED':
            return {...state, fetchingPlaylistInfo: false, currentPlaylist: payload.data[0]}
        case CREATE_NEW_PLAYLIST:
            return {...state, currentPlaylist: payload}
        default:
            return state;
    }
}

const IMPORT_USER_PLAYLISTS = 'IMPORT_USER_PLAYLISTS';
const GET_USER_PLAYLISTS = 'GET_USER_PLAYLISTS';
const CHANGE_CURRENT_PLAYLIST = 'CHANGE_CURRENT_PLAYLIST';
const GET_PLAYLIST_SONGS = 'GET_PLAYLIST_SONGS';
const CHANGE_CURRENT_PLAYLIST_SONG = 'CHANGE_CURRENT_PLAYLIST_SONG';
const GET_PLAYLIST_INFO = 'GET_PLAYLIST_INFO';
const CREATE_NEW_PLAYLIST = 'CREATE_NEW_PLAYLIST';

export const importUserPlaylists = () => {
    let data = axios.get('/api/import_playlists');
    return {
        type: IMPORT_USER_PLAYLISTS
    }
}

export const getUserPlaylists = () => {
    let data = axios.get('/api/get_playlists');
    return {
        type: GET_USER_PLAYLISTS,
        payload: data
    }
}

export const changeCurrentPlaylist = playlist => {
    return {
        type: CHANGE_CURRENT_PLAYLIST,
        payload: playlist
    }
}

export const getPlaylistSongs = playlistId => {
    let data = axios.get(`/api/playlist_songs/${playlistId}`);
    return {
        type: GET_PLAYLIST_SONGS,
        payload: data
    }
}

export const changeCurrentPlaylistSong = item => {
    return {
        type: CHANGE_CURRENT_PLAYLIST_SONG,
        payload: item
    }
}

export const getPlaylistInfo = playlistId => {
    let data = axios.get(`/api/get_playlist_info/${playlistId}`);
    return {
        type: GET_PLAYLIST_INFO,
        payload: data
    }
}

export const createNewPlaylist = () => {
    return {
        type: CREATE_NEW_PLAYLIST,
        payload: {
            playlist_id: null,
            playlist_name: 'New Playlist',
            public_playlist: true,
            tracks_href: null,
            spotify_uri: null,
            images: [],
            total_songs: 0,
            description: ''
        }
    }
}