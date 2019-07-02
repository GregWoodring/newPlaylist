import React, { Component } from 'react';

import { connect } from 'react-redux';

import SongSearch from '../SongSearch/SongSearch';
import SongList from '../SongList/SongList';

class EditPlaylist extends Component{
    constructor(props){
        super(props);

        this.state = {
            playlist_name: '',
            image_url: '',
            song_search: ''
        }
    }
    render(){
        console.log(this.props.searchResults);
        return (
            <div className="edit-playlist">
                
                <SongSearch />
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        searchResults: state.search.results
    }
}

export default connect(mapStateToProps)(EditPlaylist);