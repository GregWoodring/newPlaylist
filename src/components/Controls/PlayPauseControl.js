import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { setCurrentlyPlaying } from '../../reducers/playerReducer';
import axios from 'axios';

import './PlayPauseControl.scss';

let PlayPauseControl = props => {
    //console.log(props.currentlyPlayingURI)
    return(
    <div className='control-container' style={props.passedStyle ? props.passedStyle : {}}>
        {props.currentlyPlayingURI === props.song.spotify_uri ? 
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
                props.setCurrentlyPlaying(null);
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
                props.setCurrentlyPlaying(props.song.spotify_uri);
                
            }}
        />
        }
    </div>
)
}

function mapStateToProps(state){
    return {
        currentlyPlayingURI: state.player.currentlyPlayingURI,
        player: state.player.player,
        deviceId: state.player.deviceId
    }
}

export default connect(mapStateToProps, { setCurrentlyPlaying })(PlayPauseControl);