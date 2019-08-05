import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import { updatePlaylistSongTags } from '../../reducers/playlistReducer';
// import { updateRecentlyPlayedTags } from '../../reducers/recentlyPlayedReducer';


import './InputTag.scss';

let InputTag = props => {
    let [tag, setTag] = useState('');
    
    return(
        <div className='input-tag'>
            <input 
                pattern='[A-Za-z]'
                type='text' 
                placeholder='Enter Tag' 
                maxLength='255'
                value={tag}
                onChange={e => {
                    let regex = new RegExp(/^[A-Za-z]+$/);
                    if(regex.test(e.target.value) || e.target.value === '' || e.target.value === ' '){
                        setTag(e.target.value); 
                    }
                }} />
            <button
                onClick={() => {
                    if(tag){
                        setTag('');
                        axios.post('/api/song_tag', {
                            tagDescription: tag,
                            songId: props.songId
                        }).then(res =>{
                            // if(props.pageHeader === 'Recently Played'){
                            //     props.updateRecentlyPlayedTags(props.songId, res.data) 

                            // } else {
                            //     props.updatePlaylistSongTags(props.songId, res.data);
                            // }
                        })
                    }
                }}
            >Tag</button>
        </div>
    )
}

// function mapStateToProps(state){
//     return {
//         pageHeader: state.routing.pageHeader
//     }
// }

export default connect(null)(InputTag);