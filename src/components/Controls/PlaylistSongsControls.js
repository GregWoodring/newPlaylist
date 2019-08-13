import React from 'react';

import SyncPlaylist from '../tools/SyncPlaylist';
import EditPlaylistButton from '../tools/EditPlaylistButton';
import PlayPauseControl from './PlayPauseControl';

import './PlaylistSongsControls.scss';

let PlaylistSongsControls = props => {
    return(
        <div className='playlist-songs-controls'>
            <SyncPlaylist
                synced={props.playlist.in_sync}
                playlistId={props.playlist.playlist_id} 
            />
            <EditPlaylistButton 
                playlistId={props.playlist.playlist_id}
            />{
                props.song ? 
                <PlayPauseControl
                    song={props.song} 
                    passedStyle={{
                        margin: '.25em 2em',
                        height: '2.5em',
                        width: '2.5em'
                    }} 
                /> : null
            }
        </div>

    )
}

export default PlaylistSongsControls;