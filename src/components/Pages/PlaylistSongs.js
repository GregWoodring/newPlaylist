import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePageHeader } from '../../reducers/routingReducer';
import { getPlaylistSongs, changeCurrentPlaylistSong, getPlaylistInfo } from '../../reducers/playlistReducer'

import SongDisplay from '../Display/SongDisplay';
import SongList from '../SongList/SongList';

class PlaylistSongs extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        let playlistId = +this.props.match.params.playlist_id
        this.props.getPlaylistInfo(playlistId)
        this.props.getPlaylistSongs(playlistId);
    }

    render(){
        console.log('current playlist:', this.props.currentPlaylist);
        let header = this.props.currentPlaylist ? this.props.currentPlaylist.playlist_name : '...fetching';
        this.props.changePageHeader(header);
        return (
            <div className='playlist-songs'>
                <SongDisplay 
                    currentSong={this.props.currentSong}
                />
                <SongList 
                    list={this.props.playlistSongsList}
                    changeCurrentSong={this.props.changeCurrentPlaylistSong}
                />
            </div>
        )
    }
    
}

function mapStateToProps(state){
    return{
        currentPlaylist: state.playlists.currentPlaylist,
        playlistSongsList: state.playlists.playlistSongsList,
        currentSong: state.playlists.currentPlaylistSong
    }
}


export default connect(mapStateToProps, 
    { 
        getPlaylistSongs, 
        changeCurrentPlaylistSong, 
        changePageHeader,
        getPlaylistInfo
    })(PlaylistSongs);