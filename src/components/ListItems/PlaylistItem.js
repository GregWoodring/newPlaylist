import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import SyncPlaylist from '../tools/SyncPlaylist';
import './PlaylistItem.scss';

let PlaylistItem = props => { 

    const [sycning, setSyncing] = useState(false);
    let syncStatus = props.playlist.in_sync ? 'synced' : 'notSynced';
    if(props.playlist.sycning) syncStatus = 'syncing';
    return(
        <div 
            style={props.passedStyle}
            className="playlist-item"
            
        >
            <div 
                className='playlist-info-side'
                onClick={() => props.click(props.playlist)}>
                <div>
                    <img src={props.playlist.images && props.playlist.images.length > 0 ?
                            props.playlist.images[0].image_url 
                            : 'https://www.theyearinpictures.co.uk/images//image-placeholder.png'}
                            alt='playlist_art'/>
                </div> 
                <div className='playlist-info'>
                    <p>{props.playlist.playlist_name}</p>
                    <p>Total Songs: {props.playlist.total_songs}</p>
                </div>
            </div>

            <SyncPlaylist 
                type={syncStatus}
                playlistId={props.playlist.playlist_id}
                />
        </div>
    )
}

export default PlaylistItem;