import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'

import { getUserPlaylists } from '../../reducers/playlistReducer';
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

                </div> : null}
        </div>
    )
}

export default connect(null, { getUserPlaylists })(SyncPlaylist);