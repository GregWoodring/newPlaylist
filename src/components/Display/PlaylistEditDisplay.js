import React, { Component } from 'react';

import './PlaylistEditDisplay.scss'


class PlaylistEditDisplay extends Component{
    constructor(props){
        super(props);

        this.state = {
            playlist_name: this.props.currentPlaylist ? this.props.currentPlaylist.playlist_name : 'New Playlist',
            public: this.props.currentPlaylist ? this.props.currentPlaylist.public_playlist : false,
            newPlaylist: this.props.currentPlaylist && this.props.currentPlaylist.playlist_id ? false : true
        }
    }

    render(){
        let image = this.props.currentPlaylist && this.props.currentPlaylist.images.length > 0 ?  
        this.props.currentPlaylist.images[0].image_url : 
        'https://www.theyearinpictures.co.uk/images//image-placeholder.png';

        return(
            <div className='playlist-edit-display'>
                <div className='playlist-image'>
                        <img  src={image} alt='playlist cover' />
                        <div>
                            <label>Add Playlist Image</label>
                            <button>
                                Add
                            </button>
                        </div>
                    </div>
                <form>
                    <div>
                        <label>Playlist Name</label>
                        <input 
                            type='text' 
                            placeholder='playlist name' 
                            value={this.state.playlist_name}
                            onChange={e=>this.setState({playlist_name: e.target.value})}/>
                    </div>
                    <div>
                        <label>Public</label>
                        <input 
                            type='checkbox' 
                            checked={this.state.public}
                            onChange={e => {this.setState({public: e.target.checked})}}/>
                    </div>
                </form>
                <div>
                    <button className='create-button'>
                        {this.state.newPlaylist ? 'Create Playlist' : 'Update Playlist'}
                    </button>
                </div>
            </div>
        )
    }
}


export default PlaylistEditDisplay;