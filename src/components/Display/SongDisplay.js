import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddTagButton from '../tools/AddTagButton';
import PlaylistSongsControls from '../Controls/PlaylistSongsControls';
import './SongDisplay.scss'

//will be passed a song on mount and will alter the song based on the current song
//changing in the redux store
class SongDisplay extends Component{
    //I need to have a listener on state changing (I think?) 
    //in order to capture when the current song changes


    //will render picture of song, song name, artist(s) names, album names 
    //(not play time)

    //Current plan for displays is to have a switch case
    //which will render a control panel
    //this way I can use the same display in multiple areas
    //which may have different use cases
    renderControls = () => {
        switch(this.props.control){
            case 'playlist-songs':
                if(this.props.playlist){
                    console.log('playlist: ', this.props.playlist)
                    return (
                        <PlaylistSongsControls
                            
                            playlist={this.props.playlist} />
                    );
                }
                break;
            default:
                return null;
        }
    }

    render(){
        //should probably store this image and refrence it.
        let image = 'https://www.theyearinpictures.co.uk/images//image-placeholder.png';
        if(this.props.currentSong && this.props.currentSong.image_arr && this.props.currentSong.image_arr[2] && this.props.currentSong.image_arr[2].image_url){
            image = this.props.currentSong.image_arr[2].image_url;
        } else if(this.props.defaultImg){
           
            image = this.props.defaultImg;
        }
        console.log(this.props.currentSong)

        return(
            <div className="song-display">
                <div className="display-top">
                    <div className='information-display'>
                        <div>
                            <img src={image} alt='AlbumCover' className='album-art'/>
                        </div>
                        <div className="song-details">
                            <h1>{this.props.currentSong ? this.props.currentSong.song_name: ''}</h1>
                            <h2>{this.props.currentSong ? this.props.currentSong.album_name : ''}</h2>
                            <h2>{this.props.currentSong ? this.props.currentSong.artist_names : ''}</h2>
                        </div>
                    </div>
                    <div className='conditional-controls'>
                    {
                       this.renderControls() 
                    }
                    </div>
                </div>
                <div className='controls-bottom'>
                    {this.props.currentSong ?
                    <AddTagButton 
                        song={this.props.currentSong}
                    /> : null
                    }
                </div>
            </div>
        )
    }
}


export default SongDisplay;