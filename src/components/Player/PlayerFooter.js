import React from 'react';
import { connect } from 'react-redux';
import PlayPauseControl from '../Controls/PlayPauseControl';

import './PlayerFooter.scss';

let PlayerFooter = props => {

    return (
        <div >
            {
                props.currentlyPlayingSong ? 
            <div className='player-footer'>
                <PlayPauseControl
                    song={props.currentlyPlayingSong} />
                <div className='currently-playing-info'>
                    <p>{props.currentlyPlayingSong.song_name}</p>
                    <p>{props.currentlyPlayingSong.artist_names}</p>
                    <p>{props.currentlyPlayingSong.album_name}</p>
                </div>
            </div>
            : null
            }
        </div>
    )
}

function mapStateToProps(state){
    return{
        currentlyPlayingSong: state.player.currentlyPlayingSong,
        isPlaying: state.player.isPlaying
    }
}

export default connect(mapStateToProps)(PlayerFooter);