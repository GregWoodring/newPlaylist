import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeCurrentPlaylist } from '../../reducers/playlistReducer';

import './Sidebar.scss';

let Sidebar = props => {

    return(
        <div className={props.showSidebar ? 'sidebar' : 'hide'}>
            <ol>
                <Link exact to='/main'><li onClick={() => props.changeCurrentPlaylist(null)}>Recently Played</li></Link>
                <Link to='/main/playlists'><li onClick={() => props.changeCurrentPlaylist(null)}>Playlists</li></Link>
                <Link to='/main/edit_playlist'><li onClick={() => props.changeCurrentPlaylist(null)}>Add Playlist</li></Link>
            </ol>
        </div>
    )
}

function mapStateToProps(state){
    return{
        showSidebar: state.routing.showSidebar
    }
}

export default connect(mapStateToProps, { changeCurrentPlaylist })(Sidebar);