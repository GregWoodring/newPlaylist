import React, { useState } from 'react';
import axios from 'axios';


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
                        })
                    }
                }}
            >Tag</button>
        </div>
    )
}

export default InputTag;