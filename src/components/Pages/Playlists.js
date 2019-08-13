import React, { Component } from 'react';

import { connect } from 'react-redux';
import { changePageHeader } from '../../reducers/routingReducer';
import { getUserPlaylists } from '../../reducers/playlistReducer';

import LoadingScreen from '../LoadingScreen/LoadingScreen';
import PlaylistList from '../Lists/PlaylistList';

class Playlists extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }
    componentWillMount(){
        this.props.changePageHeader('Playlists');
        this.props.getUserPlaylists();
    }

    
    render(){
        return (
            <div>
                {!this.props.fetchingPlaylists ? 
                <PlaylistList
                    list={this.props.playlistList}
                    syncingLists={this.props.syncingLists}
                    syncing={this.props.syncing}
                /> : <LoadingScreen />
            }
                
            </div>
        );
    }
    
}

function mapStateToProps(state){
    return {
        playlistList: state.playlists.playlistList,
        fetchingPlaylists: state.playlists.fetchingPlaylists,
        syncingLists: state.playlists.syncingLists,
        syncing: state.playlists.syncing
    }
}

export default connect(mapStateToProps, { changePageHeader, getUserPlaylists })(Playlists);