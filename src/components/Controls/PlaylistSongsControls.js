import React from 'react';

import SyncPlaylist from '../tools/SyncPlaylist';

let PlaylistSongsControls = props => {
    return(
        <div className='playlist-songs-controls'>
            <SyncPlaylist
                playlistId={props.playlist.playlistId} />
        </div>

    )
}