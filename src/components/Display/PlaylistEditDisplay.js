import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getPlaylistInfo, postPlaylistImage } from '../../reducers/playlistReducer';
import { connect } from 'react-redux';
import './PlaylistEditDisplay.scss';
import ImageModal from '../Modals/ImageModal';


class PlaylistEditDisplay extends Component{
    constructor(props){
        super(props);

        this.state = {
            playlist_name: this.props.currentPlaylist ? this.props.currentPlaylist.playlist_name : 'New Playlist',
            public: this.props.currentPlaylist ? this.props.currentPlaylist.public_playlist : false,
            newPlaylist: !this.props.match.params.playlist_id,
            showModal: false,
            imageUrl: this.props.currentPlaylist && this.props.currentPlaylist.images && this.props.currentPlaylist.images[0] ? 
                this.props.currentPlaylist.images[0].image_url : 'https://www.theyearinpictures.co.uk/images//image-placeholder.png'
        }
    }

    createPlaylist = async () => {
        console.log('click')
        let data = await axios.post('/api/create_playlist', {
            name: this.state.playlist_name,
            public: this.state.public
        });
        this.props.getPlaylistInfo(data.data);
        this.props.history.push(`/main/edit_playlist/${data.data}`);
        this.setState({
            newPlaylist: false
        })
    }

    editPlaylist = async () => {
        console.log(this.props.match.params.playlist_id)
        let data = await axios.put(`/api/edit_playlist/${this.props.match.params.playlist_id}`, {
            name: this.state.playlist_name,
            public: this.state.public
        });
        this.props.getPlaylistInfo(this.props.match.params.playlist_id);
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    uploadImage = (imageUrl, image) => {
        this.setState({
            imageUrl
        });
        this.props.postPlaylistImage(image, this.props.match.params.playlist_id);
        
    }

    render(){
        
        return(
            <div className='playlist-edit-display'>
                {/* {this.state.showModal ? <ImageModal 
                    passedImageUrl={this.state.imageUrl}
                    toggleModal={this.toggleModal}
                    upload={this.uploadImage}/> : null}
                <div className='playlist-image'>
                    <img  src={this.state.imageUrl} alt='playlist cover' />
                    <div>
                        <button 
                        onClick={() => {this.setState({showModal: true})}}
                        >Add Image</button>
                        
                    </div>
                </div> */}
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
                    <button 
                        className='create-button'
                        onClick={this.state.newPlaylist ? this.createPlaylist : this.editPlaylist}>
                        {this.state.newPlaylist ? 'Create Playlist' : 'Update Playlist'}
                    </button>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
    }
}


export default connect(mapStateToProps, { getPlaylistInfo, postPlaylistImage })(withRouter(PlaylistEditDisplay));

function toDataURL(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
  }
  