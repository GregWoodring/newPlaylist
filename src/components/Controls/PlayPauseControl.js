import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { getCurrentlyPlaying } from '../../reducers/playerReducer';
import axios from 'axios';

import './PlayPauseControl.scss';

let PlayPauseControl = props => {
    return(
    <div className='control-container' style={props.passedStyle ? props.passedStyle : {}}>
        {((props.currentlyPlayingURI === props.song.spotify_uri)
            && props.isPlaying) ? 
        <FontAwesomeIcon icon={faPause} 
            onClick={async () => {
                let token = await axios.get('/api/get_access_token');
                token = token.data;
                
                let requestObj = {
                    url: `https://api.spotify.com/v1/me/player/pause?device_id=${props.deviceId}`,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                axios(requestObj);
                props.getCurrentlyPlaying();
            }}
        />
        :
        <FontAwesomeIcon 
            icon={faPlay} 
            onClick={async () => {
                let token = await axios.get('/api/get_access_token');
                token = token.data;
                
                let requestObj = {
                    url: `https://api.spotify.com/v1/me/player/play?device_id=${props.deviceId}`,
                    method: 'PUT',
                    data: { "uris": [props.song.spotify_uri]},
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                axios(requestObj);
                props.getCurrentlyPlaying();
                
            }}
        />
        }
    </div>
)
}

function mapStateToProps(state){
    return {
        currentlyPlayingURI: state.player.currentlyPlayingSong ? state.player.currentlyPlayingSong.spotify_uri : null,
        player: state.player.player,
        deviceId: state.player.deviceId,
        isPlaying: state.player.isPlaying
    }
}

export default connect(mapStateToProps, { getCurrentlyPlaying })(PlayPauseControl);