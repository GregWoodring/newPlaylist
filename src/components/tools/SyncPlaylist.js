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
    return(
        <div className={type}>
            <button
                onClick={() => {
                    setType(syncing);
                    axios.get(`/api/sync_playlist/${props.playlistId}`).then(res => {
                        if(res.data){
                            setType(synced);
                        } else {
                            setType(notSynced);
                        }
                        props.getUserPlaylists(true);
                    }).catch(err => {
                        console.log(err);
                    });
                }}
            >
                <FontAwesomeIcon icon={faSync} />
            </button>
        </div>
    )
}

export default connect(null, { getUserPlaylists })(SyncPlaylist);