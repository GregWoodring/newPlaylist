import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePageHeader } from '../../reducers/routingReducer';
import { getRecentlyPlayed, changeCurrentSong } from '../../reducers/recentlyPlayedReducer';

import SongDisplay from '../Display/SongDisplay';
import SongList from '../SongList/SongList';

class RecentlyPlayed extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.changePageHeader('Recently Played');
        this.props.getRecentlyPlayed();
    }
    
    render(){
        console.log('recently played props', this.props)
        return(
            <div>
                <SongDisplay 
                    currentSong={this.props.currentSong}
                />
                <SongList 
                    list={this.props.recentlyPlayed}
                    changeCurrentSong={this.props.changeCurrentSong}
                />
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        recentlyPlayed: state.recentlyPlayed.recentlyPlayed,
        currentSong: state.recentlyPlayed.currentSong
    }
}

export default connect(mapStateToProps, { changePageHeader, getRecentlyPlayed, changeCurrentSong })(RecentlyPlayed);