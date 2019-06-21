import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Sidebar.scss';

let Sidebar = props => {

    return(
        <div className={props.showSidebar ? 'sidebar' : 'hide'}>
            <ol>
                <Link exact to='/main'><li>Recently Played</li></Link>
                <Link to='/main/playlists'><li>Playlists</li></Link>
            </ol>
        </div>
    )
}

function mapStateToProps(state){
    return{
        showSidebar: state.routing.showSidebar
    }
}

export default connect(mapStateToProps)(Sidebar);