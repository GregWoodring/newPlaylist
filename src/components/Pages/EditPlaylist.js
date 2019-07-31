import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPlaylistInfo, createNewPlaylist } from '../../reducers/playlistReducer';
import { changePageHeader } from '../../reducers/routingReducer';

import SongSearch from '../SongSearch/SongSearch';
import PlaylistEditDisplay from '../Display/PlaylistEditDisplay';

import './EditPlaylist.scss';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import GeneratePlaylistByTags from '../Controls/GeneratePlaylistByTags';

class EditPlaylist extends Component{
    constructor(props){
        super(props);

        this.state = {
            playlist_name: '',
            image_url: '',
            song_search: '',
            generate_menu: 'search'
        }
    }

    componentWillMount(){
        if(this.props.match.params.playlist_id){
            this.props.getPlaylistInfo(this.props.match.params.playlist_id);
        } else {
            this.props.createNewPlaylist();
        }
    }

    renderMenu = () => {
        switch(this.state.generate_menu){
            case 'search':
                return (<SongSearch />);
            case 'by-tag':
                return (<GeneratePlaylistByTags 
                    playlistId={this.props.match.params.playlist_id}
                />);
            default: 
                return <LoadingScreen />
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
                <div className='construct-playlist-menu-container' >
                    {/* <div className='construct-playlist-menu-header'>Add Songs To Playlist</div> */}
                    <div className='construct-playlist-menu'>
                        <button 
                            onClick={() => this.setState({generate_menu: 'search'})}
                        >
                            Search Song
                        </button>
                        <button
                            onClick={() => this.setState({generate_menu: 'by-tag'})}
                        >
                            Generate by Tags
                        </button>
                    </div>
                </div>
                {
                    this.renderMenu()
                }
                
                
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