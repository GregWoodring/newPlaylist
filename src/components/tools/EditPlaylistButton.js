import React from 'react';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import './EditPlaylistButton.scss';


let EditPlaylistButton = props => {
    return(
        <div className='edit-playlist-button'>
            <Link to={`/main/edit_playlist/${props.playlistId}`}>
                <FontAwesomeIcon icon={faEdit} />
            </Link>
        </div>
    )
}

export default EditPlaylistButton;