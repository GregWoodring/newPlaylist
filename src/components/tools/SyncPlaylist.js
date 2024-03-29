import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'

import { getUserPlaylists, getPlaylistSongs } from '../../reducers/playlistReducer';
import { connect } from 'react-redux';

import './SyncPlaylist.scss'
const synced = 'fetch-control fetch-control-synced';
const syncing = 'fetch-control fetch-control-syncing';
const notSynced = 'fetch-control fetch-control-not-synced';

let SyncPlaylist = props => {

    const [type, setType] = useState(props.synced ? synced : notSynced);
    const [localSongs, setLocalSongs] = useState([]);
    const [spotifySongs, setSpotifySongs] = useState([])
    const [showModal, setShowModal] = useState(false);

    return(
        <div className={type}>
            <button
                className='fetch-button'
                onClick={() => {
                    setType(syncing);
                    axios.get(`/api/sync_playlist/${props.playlistId}`).then(res => {
                        if(res.data.length < 1 && res.status !== 500){
                            setType(synced);
                        } else {
                            setType(notSynced);
                            setLocalSongs(res.data.filter(item => { return item.local_true_spotify_false}));
                            setSpotifySongs(res.data.filter(item => {return !item.local_true_spotify_false}));
                            setShowModal(true);
                        }
                        props.getUserPlaylists(true);
                    }).catch(err => {
                        console.log(err);
                    });
                }}
            >
                <FontAwesomeIcon icon={faSync} />
            </button>
            {showModal ? 

                
                <div className='sync-modal'>
                    <h1>Sync Songs</h1>

                    <h3>Songs on App only</h3>
                    {localSongs.map(item => {
                        return(
                            <p className='sync-song-item'>
                                {item.song_name}
                            </p>
                        )
                    })}

                    <h3>Songs on Spotify only</h3>
                    {spotifySongs.map(item => {
                        return(
                            <p className='sync-song-item'>
                                {item.song_name}
                            </p>
                        )
                    })}
                    <button
                    onClick={() => {
                        setShowModal(false);
                        axios.post(`/api/remove_songs_local/${props.playlistId}`, {
                            songsArr: localSongs.map(item => item.song_id)
                        }).then(res => {
                            props.getPlaylistSongs(props.playlistId);
                            setType(synced);
                        });
                    }}
                    className='green-button'
                >Sync To Spotify</button>
                <button
                    onClick={() => {
                        setShowModal(false);
                        axios.post('/api/add_song_to_playlist', {
                            songsArr: localSongs,
                            playlistId: props.playlistId,
                            skipImport: true
                        }).then(res => {
                            setType(synced);
                        });
                    }}
                    className='green-button'
                >Sync To New Playlist</button>
                </div> : null}

                
        </div>
    )
}

export default connect(null, { getUserPlaylists, getPlaylistSongs })(SyncPlaylist);