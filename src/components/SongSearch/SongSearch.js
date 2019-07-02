import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { searchBySongTitle } from '../../reducers/searchReducer';


import SongList from '../SongList/SongList';


class SongSearch extends Component{
    constructor(props){
        super(props);

        this.state = {
            searchText: '',
            searchType: 'track',
            tracks: []
        }
    }

    onSearch = () => {
        
    }
    render(){
        return (
            <div className="song-search">
                <input 
                    type="text"
                    onChange={e => {this.setState({searchText: e.target.value})}}
                    placeholder="search by song title"/>
                <button onClick={() => this.props.searchBySongTitle(this.state.searchText)}>Search</button>
                <SongList 
                    list={this.props.searchResults}
                />
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        searchResults: state.search.results
    }
}

export default connect(mapStateToProps, { searchBySongTitle })(SongSearch);