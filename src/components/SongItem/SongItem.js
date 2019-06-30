import React from 'react';
import { connect } from 'react-redux';

import './SongItem.scss'

let SongItem = props => {
    //let songName = props.songName.trim().length > 50 ? props.songName.substring(0, 47) + '...' : props.songName
    

    return(
        <div 
            style={props.passedStyle}
            className="song-item"
            onClick={() => props.click(props.song)}>
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
            </div> : null
            }
            <div className="controls">
                <div>
                    <i className="fa fa-ellipsis-v"></i>
                </div>
            </div>
        </div>
    )
}

export default SongItem;

function convertDate(date){
    date = new Date(date);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear() - 2000;
    let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    hours = hours === 0 ? 12 : hours;
    let minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    let amPM = date.getHours > 11 && date.getHours !== 0 ? 'AM' : 'PM';

    return `${month}/${day}/${year} ${hours}:${minutes} ${amPM}`;
}

