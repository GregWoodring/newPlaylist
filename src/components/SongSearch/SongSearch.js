import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { searchBySongTitle } from '../../reducers/searchReducer';


import SongList from '../SongList/SongList';
import './SongSearch.scss';


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
                <div className='search-bar'>
                    <input 
                        type="text"
                        onChange={e => {this.setState({searchText: e.target.value})}}
                        placeholder="search by song title"/>
                    <button onClick={() => this.state.searchText !== '' ? this.props.searchBySongTitle(this.state.searchText) : null}>Search</button>
                </div>
                <SongList 
                    list={this.props.searchResults}
                    passedStyle={{height: '45vh'}}
                />
                <div className="nav-buttons">
                    <button>Previous</button>
                    <button>Next</button>
                </div>
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