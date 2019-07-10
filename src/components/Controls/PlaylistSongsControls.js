import React from 'react';

import SyncPlaylist from '../tools/SyncPlaylist';
import EditPlaylistButton from '../tools/EditPlaylistButton'

import './PlaylistSongsControls.scss';

let PlaylistSongsControls = props => {
    return(
        <div className='playlist-songs-controls'>
            <SyncPlaylist
                synced={props.playlist.in_sync}
                playlistId={props.playlist.playlistId} />
            <EditPlaylistButton 
                playlistId={props.playlist.playlist_id}
            />
        </div>

    )
}

export default PlaylistSongsControls;