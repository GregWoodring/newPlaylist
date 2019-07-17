import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPlaylistInfo, createNewPlaylist } from '../../reducers/playlistReducer';
import { changePageHeader } from '../../reducers/routingReducer';

import SongSearch from '../SongSearch/SongSearch';
import PlaylistEditDisplay from '../Display/PlaylistEditDisplay';

import './EditPlaylist.scss';

class EditPlaylist extends Component{
    constructor(props){
        super(props);

        this.state = {
            playlist_name: '',
            image_url: '',
            song_search: ''
        }
    }

    componentWillMount(){
        if(this.props.match.params.playlist_id){
            this.props.getPlaylistInfo(this.props.match.params.playlist_id);
        } else {
            this.props.createNewPlaylist();
        }
    }

    

    render(){
        if(this.fetchingPlaylistInfo){
            this.props.changePageHeader('...fetching')
        } else {
            this.props.changePageHeader(this.props.currentPlaylist ? this.props.currentPlaylist.playlist_name : 'New Playlist');
        }

        if(!this.props.currentPlaylist && !this.props.fetchingPlaylistInfo) this.props.createNewPlaylist();
        
        return (
            <div className="edit-playlist">
                {this.props.currentPlaylist ? 
                <PlaylistEditDisplay 
                    currentPlaylist={this.props.currentPlaylist}
                /> : null
                }
                <SongSearch />
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        searchResults: state.search.results,
        currentPlaylist: state.playlists.currentPlaylist,
        fetchingPlaylistInfo: state.playlists.fetchingPlaylistInfo
    }
}

export default connect(mapStateToProps, { 
    getPlaylistInfo, 
    createNewPlaylist, 
    changePageHeader 
})(EditPlaylist);