import React, { Component } from 'react';
import './SongItem.scss'

let SongItem = props => {
    return(
        <div className="song-item">
            <div>
                <h4>Song: </h4>
                <p>{props.songName}</p>
            </div>
            <div>
                <h4>Album: </h4>
                <p>{props.albumName}</p>
            </div>
            <div>
                <h4>Artists: </h4>
                <p>{props.artistNames}</p>
            </div>
            <div>
                <h4>Played At: </h4>
                <p>{props.playedAt}</p>
            </div>
        </div>
    )
}

export default SongItem;

