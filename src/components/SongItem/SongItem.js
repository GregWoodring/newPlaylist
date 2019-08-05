import React, { useState } from 'react';
import { connect } from 'react-redux';
import convertDate from '../../functions/convertDate';
import { addSongs } from '../../reducers/playlistReducer';
import PlayPauseControl from '../Controls/PlayPauseControl';


import './SongItem.scss'

let SongItem = props => {
    const [controlsClass, setControlsClass] = useState('hide');

    return(
        <div 
            style={props.passedStyle}
            className="song-item"
            onClick={() => props.click ? props.click(props.song) : null}>
            <div className='play-controls'>
                <PlayPauseControl song={props.song} />
            </div>
            <div className="song-info">
                <div>               
                    <span
                        className="artist-names"
                    >{props.song && props.song.song_name?  props.song.song_name.trim() : ''}</span>
                </div>
                <div>
                    <span
                        className="artist-names"
                    >{props.song && props.song.album_name ? props.song.album_name.trim() : ''}</span>
                    <span>-</span>
                    <span
                        className="artist-names"
                    >{props.song && props.song.artist_names ? props.song.artist_names.trim() : ''}</span>
                </div>
            </div>
            {props.song.played_at ? 
            <div className="play-info">
                {convertDate(props.song.played_at)}
            </div> : <div className="play-info"></div>
            }
            {/* {
                props.hideControls ? null :
            <div className="controls">
                <div 
                className='green-circle'
                onClick={() => {
                    setControlsClass(controlsClass === 'control-panel open-panel' ? 'control-panel close-panel' : 'control-panel open-panel');
                }}>
                    <i className="fa fa-ellipsis-v"></i>
                </div>
                <div className={controlsClass}>
                    <ul>
                        
                        <li>
                            <button>
                                Select Playlist to Add
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            } */}{
                props.hideControls ?  null :
                <div className={props.currentPlaylist && props.currentPlaylist.playlist_id ? 'add-song-button' : 'hide'}>
                    <button onClick={() => addSongs(props.currentPlaylist.playlist_id, [props.song])}>
                        Add
                    </button>
                </div>
            }
        </div>
    )
}

function mapStateToProps(state){
    return{
        currentPlaylist: state.playlists.currentPlaylist
    }
}

export default connect(mapStateToProps, { addSongs })(SongItem);



