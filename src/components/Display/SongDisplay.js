import React, { Component } from 'react';
import { connect } from 'react-redux';


import './SongDisplay.scss'

//will be passed a song on mount and will alter the song based on the current song
//changing in the redux store
class SongDisplay extends Component{
    //I need to have a listener on state changing (I think?) 
    //in order to capture when the current song changes


    //will render picture of song, song name, artist(s) names, album names 
    //(not play time)
    render(){
        return(
            <div className="song-display">
                <div>
                    <img src={this.props.image_url} alt='AlbumCover'/>
                </div>
                <div>
                    <h1>Song Name</h1>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        imageUrl: state.recentlyPlayed.currentSong ? state.recentlyPlayed.currentSong.image_url : '',
        // songName: state.recentlyPlayed.currentSong.song_name
    }
}

export default connect(mapStateToProps)(SongDisplay);