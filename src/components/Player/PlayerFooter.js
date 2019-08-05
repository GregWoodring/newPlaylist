import React, {useState} from 'react';
import { connect } from 'react-redux';
import PlayPauseControl from '../Controls/PlayPauseControl';
import { getCurrentlyPlaying } from '../../reducers/playerReducer';
import AddTagButtonPopup from '../tools/AddTagButtonPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './PlayerFooter.scss';

let PlayerFooter = props => {
    const [showFooter, setShowFooter] = useState(true);
    return (
        <div>
            {
                props.currentlyPlayingSong && showFooter ? 
            <div className='player-footer'>
                <div className='play-pause-control-footer'>
                    <PlayPauseControl
                        song={props.currentlyPlayingSong} />
                </div>
                <div className='currently-playing-info'>
                    <p>{props.currentlyPlayingSong.song_name}</p>
                    <p>{props.currentlyPlayingSong.artist_names}</p>
                    <p>{props.currentlyPlayingSong.album_name}</p>
                </div>
                <div className='footer-controls'>
                    <AddTagButtonPopup 
                        song={props.currentlyPlayingSong} />
                    <div 
                        className='collapse-footer'
                        onClick={() => {setShowFooter(false)}}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                </div>
            </div>
            : <div 
                className='player-footer-fetch'
                onClick={() => {
                    props.getCurrentlyPlaying();
                    setShowFooter(true);
                }}>
                <p>...</p>
            </div>
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

export default connect(mapStateToProps, { getCurrentlyPlaying })(PlayerFooter);