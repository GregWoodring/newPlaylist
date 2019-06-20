import React from 'react';
import { connect } from 'react-redux';
import { changeCurrentSong } from '../../reducers/recentlyPlayedReducer'
import './SongItem.scss'

let SongItem = props => {
    //let songName = props.songName.trim().length > 50 ? props.songName.substring(0, 47) + '...' : props.songName
    

    return(
        <div 
            className="song-item"
            onClick={() => props.changeCurrentSong(props.song)}>
            <div className="song-info">
                <div>               
                    <span
                        className="artist-names"
                    >{props.song.song_name}</span>
                </div>
                <div>
                    <span
                        className="artist-names"
                    >{props.song.album_name.trim()}</span>
                    <span>-</span>
                    <span
                        className="artist-names"
                    >{props.song.artist_names.trim()}</span>
                </div>
            </div>
            <div className="play-info">
                {convertDate(props.song.played_at)}
            </div>
            <div className="controls">
                <div>
                    <i className="fa fa-ellipsis-v"></i>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { changeCurrentSong })(SongItem);

function convertDate(date){
    date = new Date(date);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    let minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    let amPM = date.getHours > 11 ? 'AM' : 'PM';

    return `${month}/${day}/${year} ${hours}:${minutes} ${amPM}`;
}

