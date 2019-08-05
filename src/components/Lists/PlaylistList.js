import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changePageHeader } from '../../reducers/routingReducer';
import { changeCurrentPlaylist, syncPlaylist } from '../../reducers/playlistReducer';

import PlaylistItem from '../ListItems/PlaylistItem';

import './PlaylistList.scss';

class PlaylistList extends Component{
    constructor(props){
        super(props);

        this.state = {
            filterText: ''
        }
    }

    
    openPlaylist = playlist => {
        this.props.changePageHeader(playlist.playlist_name);
        this.props.changeCurrentPlaylist(playlist);
        this.props.history.push(`/main/playlists/${playlist.playlist_id}`);
    }


    renderRow = () => {
        return this.props.list.filter(item => {
            return item.playlist_name ? item.playlist_name.toLowerCase().includes(this.state.filterText) : false;
        }).map(item => {
            return(
                <PlaylistItem
                        key={item.playlist_id}
                        playlist={item}
                        click={this.openPlaylist}
                        syncing={this.props.syncing}
                    />
            )
        })
    }

    


    render(){
        return(
            
            <div className='playlist-list'>
                <div className='playlist-search-container'>
                    <input 
                        type='text' 
                        placeholder='Search Playlists' 
                        className='filter-input'
                        onChange={e => this.setState({filterText: e.target.value.toLowerCase()})} />
                </div>
                {this.renderRow()}
            </div>
        )
    }
    
}



export default connect(null, { changePageHeader, changeCurrentPlaylist, syncPlaylist })(withRouter(PlaylistList));