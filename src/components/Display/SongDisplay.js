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
        let image = 'https://www.theyearinpictures.co.uk/images//image-placeholder.png';
        if(this.props.currentSong && this.props.currentSong.image_arr && this.props.currentSong.image_arr[2] && this.props.currentSong.image_arr[2].image_url){
            image = this.props.currentSong.image_arr[2].image_url;
        } else if(this.props.defaultImg){
           
            image = this.props.defaultImg;
        }

        return(
            <div className="song-display">
                <div className="display-top">
                    <div>
                        <img src={image} alt='AlbumCover'/>
                    </div>
                    <div className="song-details">
                        <h1>{this.props.currentSong ? this.props.currentSong.song_name: ''}</h1>
                        <h2>{this.props.currentSong ? this.props.currentSong.album_name : ''}</h2>
                        <h2>{this.props.currentSong ? this.props.currentSong.artist_names : ''}</h2>
                    </div>
                </div>
            </div>
        )
    }
}


export default SongDisplay;