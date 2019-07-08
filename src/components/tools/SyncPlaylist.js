import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import { syncPlaylist } from '../../reducers/playlistReducer';
import { connect } from 'react-redux';

import './SyncPlaylist.scss'

let SyncPlaylist = props => {
    const [type, setType] = useState(props.type)
    let syncType = 'fetch-control '
    switch(type){
        case 'synced':
            syncType += 'fetch-control-synced';
            break;
        case 'syncing':
                syncType += 'fetch-control-syncing';
            break;
        case 'notSynced':
                syncType += 'fetch-control-not-synced';
            break;
        default:
            break;
    }
    return(
        <div className={syncType}>
            <button
                onClick={() => {
                    props.syncPlaylist(props.playlistId);
                    setType('syncing');
                }}
            >
                <FontAwesomeIcon icon={faSync} />
            </button>
        </div>
    )
}

export default connect(null, { syncPlaylist })(SyncPlaylist);