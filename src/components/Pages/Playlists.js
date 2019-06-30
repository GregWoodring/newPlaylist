import React, { Component } from 'react';

import { connect } from 'react-redux';
import { changePageHeader } from '../../reducers/routingReducer';
import { getUserPlaylists } from '../../reducers/playlistReducer';

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
        console.log('fetching...', this.props.fetchingPlaylists)
        return (
            <div>
                {!this.props.fetchingPlaylists ? 
                <PlaylistList
                    list={this.props.playlistList}
                /> : null
            }
                
            </div>
        );
    }
    
}

function mapStateToProps(state){
    return {
        playlistList: state.playlists.playlistList,
        fetchingPlaylists: state.playlists.fetchingPlaylists
    }
}

export default connect(mapStateToProps, { changePageHeader, getUserPlaylists })(Playlists);