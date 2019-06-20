import React, { Component } from 'react';
import './SongItem.scss'

let SongItem = props => {
    let songName = songName.trim().length > 50 ? props.songName.substring(0, 47) + '...' : props.songName
    

    return(
        <div className="song-item">
            <div className="song-info">
                <div>               
                    <span>{songName}</span>
                </div>
                <div>
                    <span>{props.albumName.trim()}</span>
                    <span>-</span>
                    <span>{props.artistNames.trim()}</span>
                </div>
            </div>
            <div className="play-info">
                {convertDate(props.playedAt)}
            </div>
        </div>
    )
}

export default SongItem;

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

