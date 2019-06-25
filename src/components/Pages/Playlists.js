import React from 'react';

import { connect } from 'react-redux';
import { changePageHeader } from '../../reducers/routingReducer';
import { getUserPlaylists } from '../../reducers/playlistReducer'

let Playlists = props => {
    props.changePageHeader('Playlists');
    props.getUserPlaylists();
    return (
        <div>

        </div>
    );
}

function mapStateToProps(state){
    return {
        playlistList: state.playlists.playlists
    }
}

export default connect(mapStateToProps, { changePageHeader, getUserPlaylists})(Playlists);