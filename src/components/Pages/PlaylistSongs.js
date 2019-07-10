import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePageHeader } from '../../reducers/routingReducer';
import { getPlaylistSongs, changeCurrentPlaylistSong, getPlaylistInfo } from '../../reducers/playlistReducer'

import SongDisplay from '../Display/SongDisplay';
import SongList from '../SongList/SongList';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

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
        let header = this.props.currentPlaylist ? this.props.currentPlaylist.playlist_name : '...fetching';
        this.props.changePageHeader(header);
        return (
            <div>
                {this.props.fetchingSongs ? 
                    <LoadingScreen /> :
                    <div className='playlist-songs'>
                        <SongDisplay 
                            playlist={this.props.currentPlaylist}
                            control='playlist-songs'
                            currentSong={this.props.currentSong}
                            defaultImg={this.props.currentPlaylist && this.props.currentPlaylist.image_arr ? this.props.currentPlaylist.image_arr[0].image_url : null}
                            />
                        <SongList 
                            list={this.props.playlistSongsList}
                            changeCurrentSong={this.props.changeCurrentPlaylistSong}
                            />
                    </div>
                }
            </div>
        )
    }
    
}

function mapStateToProps(state){
    return{
        currentPlaylist: state.playlists.currentPlaylist,
        playlistSongsList: state.playlists.playlistSongsList,
        currentSong: state.playlists.currentPlaylistSong,
        fetchingSongs: state.playlists.fetchingSongs
    }
}


export default connect(mapStateToProps, 
    { 
        getPlaylistSongs, 
        changeCurrentPlaylistSong, 
        changePageHeader,
        getPlaylistInfo
    })(PlaylistSongs);