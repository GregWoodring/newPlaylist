import React from 'react';

import './PlaylistItem.scss';

let PlaylistItem = props => { 
    return(
        <div 
            style={props.passedStyle}
            className="playlist-item"
            onClick={() => props.click(props.playlist)}
        >
            <div>
                <img src={props.playlist.images && props.playlist.images.length > 0 ?
                     props.playlist.images[0].image_url 
                     : 'https://www.theyearinpictures.co.uk/images//image-placeholder.png'}
                    alt='playlist_art'/>
            </div> 
            <div className='playlist-info'>
                <p>{props.playlist.playlist_name}</p>
                <p>Total Songs: {props.playlist.total_songs}</p>
            </div>
        </div>
    )
}

export default PlaylistItem;