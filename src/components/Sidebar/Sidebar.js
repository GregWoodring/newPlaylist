import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { changeCurrentPlaylist } from '../../reducers/playlistReducer';
import { toggleSidebar } from '../../reducers/routingReducer';
import { withRouter } from 'react-router-dom';
import useDetectOutsideClick from '../../customHooks/detectOutsideClick';

import './Sidebar.scss';

let Sidebar = props => {
    const wrapperRef = useRef(null);
    useDetectOutsideClick(wrapperRef, () => {props.toggleSidebar(false)})
    return(
        <div 
            className={props.showSidebar ? 'sidebar open-left' : 'hide'}
            ref={wrapperRef}
            >
            <ol>
                <li onClick={() => {
                    props.changeCurrentPlaylist(null);
                    props.history.push(props.match.url)
                    props.toggleSidebar(false);
                    
                }}>Recently Played</li>
                <li onClick={() => {
                    props.changeCurrentPlaylist(null);
                    props.history.push(props.match.url + '/playlists')
                    props.toggleSidebar(false);
                }}>Playlists</li>
                <li onClick={() => {
                    props.changeCurrentPlaylist(null);
                    props.history.push(props.match.url + '/edit_playlist');
                    props.toggleSidebar(false);
                }}>Add Playlist</li>
            </ol>
        </div>
    )
}

function mapStateToProps(state){
    return{
        showSidebar: state.routing.showSidebar
    }
}

export default connect(mapStateToProps, { changeCurrentPlaylist, toggleSidebar })(withRouter(Sidebar));