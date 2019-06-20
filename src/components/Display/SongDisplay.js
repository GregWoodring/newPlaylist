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
        console.log('current song:', this.props.currentSong);
        console.log('image_arr: ', this.props.image_arr)
        return(
            <div className="song-display">
                <div>
                    <img src={this.props.image_arr ? this.props.image_arr[2].image_url : ''} alt='AlbumCover'/>
                </div>
                <div>
                    <h1>{this.props.currentSong ? this.props.currentSong.song_name: ''}</h1>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        image_arr: state.recentlyPlayed.currentSong ? state.recentlyPlayed.currentSong.image_arr : null,
        currentSong: state.recentlyPlayed.currentSong
    }
}

export default connect(mapStateToProps)(SongDisplay);