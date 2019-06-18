import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecentlyPlayed } from '../../reducers/recentlyPlayedReducer';


import SongItem from '../SongItem/SongItem'

import './SongList.scss'

class SongList extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }
    componentWillMount(){
        this.props.getRecentlyPlayed()
    }



    render(){
        console.log(this.props)
        return(
            <div className="song-list">
                {this.props.recentlyPlayed.map(item => {
                    return (
                        <SongItem
                            songName={item.song_name}
                            albumName={item.albumName}
                            artistName={item.artist_name}
                            playedAt={item.played_at}
                        />
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        recentlyPlayed: state.recentlyPlayed.recentlyPlayed
    }
    
}

export default connect(mapStateToProps, { getRecentlyPlayed })(SongList)