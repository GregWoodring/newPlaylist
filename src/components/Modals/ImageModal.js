import React, { Component } from 'react';
import toDataURL from '../../functions/toDataUrl';

import './ImageModal.scss';

class ImageModal extends Component{
    constructor(props){
        super(props);

        this.state = {  
            imageUrl: this.props.passedImageUrl,
            image: undefined,
            urlInput: ''
        }
    }

    handleUploadFile = e => {
        console.log('i tried')
        if(!e.target.files || e.target.files.length < 1) {
            console.log('not file');
            return;
        }
        let type = e.target.files[0].type;
        type = type.split('/');
        if(type[0] !== 'image') {
            console.log('problem')
            alert('Please Select an image file');
            e.target.value = null;
            return;
        }

        let src = URL.createObjectURL(e.target.files[0]);
        console.log('src:', src);
        this.setState({
            imageUrl: src
        });

        toDataURL(src, this.handleToDataURL, 'image/jpeg');
    }

    handleUrl = () => {
        let onloadCallBack = () => {
            console.log('hello')
            this.setState({
                imageUrl: this.state.urlInput
            });
            toDataURL(this.state.urlInput, this.handleToDataURL, 'image/jpeg');
        }
        let image = new Image();
        image.onload = onloadCallBack;
        image.onerror = function(){alert('Invalid image')};
        image.src = this.state.urlInput;
    }

    

    handleToDataURL = dataUrl => {
        this.setState({
            image: dataUrl
        })
    }

    handleUploadImage = () => {
        if(this.state.image){
            this.props.upload(this.state.imageUrl, this.state.image);
            this.props.toggleModal();
        } else {
            alert('Invalid Image');
        }
    }

    

    render(){
        return(
            <div className='image-modal'>
                <div className='inner-modal'>
                    <div className='title'>
                        <h1>Choose an Image</h1>
                    </div>
                    <img src={this.state.imageUrl} alt='Playlist Cover'/>
                    <div className='image-inputs'>
                        <div className='image-file'>
                            <label>Upload File:</label>
                            <input
                                className='image-file-input' 
                                type='file'
                                onChange={e => this.handleUploadFile(e)}
                                />
                        </div>
                        <div className='url-input'>
                            <label>Image Url:</label>
                            <div className='input-bar'>
                                <input 
                                type='text' 
                                placeholder='Image Url'
                                value={this.state.urlInput}
                                onChange={e => this.setState({urlInput: e.target.value})}
                                />
                            <button 
                                onClick={this.handleUrl}
                                >Submit</button>
                            </div>
                        </div>
                        
                    </div>
                    <div className='buttons'>
                            <button
                                onClick={this.handleUploadImage}
                                >Upload Image</button>
                            <button
                                onClick={() => this.props.toggleModal()} 
                                >Cancel</button>
                        </div>
                </div>
                
            </div>
        )
    }
}

export default ImageModal;