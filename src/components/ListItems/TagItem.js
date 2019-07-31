import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { connect } from 'react-redux';
import { updatePinnedTags } from '../../reducers/tagReducer';

import './TagItem.scss';
/*
state
 - isAdded: tag exists on passed Song

props:
 - songId: id for song passed in

 songTagItem: {
     - is_pinned: tag is Pinned
     - can_pin: User has less than 5 pinned tags
     - song_tag_id: 
     - tag_id:
     - tag_description: 
 } --- This object will be null if not an added tag

 pinnedTagItem: {

 } --- This will be null if it's an added tag

If isAdded then show removeTag Button else show addTag button
If isPinned show removePin Button else if isPinned and canPin then show PinButton


*/


let TagItem = props => {
    const [isAdded, setAdded] = useState(props.isAdded)
    const [isPinned, setPinned] = useState(props.isPinned);

    return(
        <div className='tag-item'>
            <p>#{props.songTagItem.tag_description}</p>
            <div className='tag-controls'>
                {
                    isAdded ? 

                        
                        <button className='remove-tag'
                            onClick={ () => {
                                axios.delete(`/api/remove_song_tag/${props.songTagItem.song_tag_id}`).then(res => console.log(res));
                                setAdded(false);
                            }} >
                            <FontAwesomeIcon icon={faMinus} />
                        </button> 
                        :
                        
                        <button className='add-tag'
                            onClick={ () => {
                                axios.post('/api/song_tag', {
                                    tagDescription: props.songTagItem.tag_description,
                                    songId: props.songId
                                }).then(res => {
                                    //console.log(res); -- Need to update in reducer from here, use reducer function in this spot
                                    setAdded(true)})
                                .catch(err =>  console.log(err));

                            }} >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                        
                        
                }
                {
                    isPinned ?
                    (!props.songTagItem.default_tag ? 
                    <button className='remove-pinned-tag'
                        onClick={()=>{
                            axios.delete(`/api/remove_pinned_tag/${props.songTagItem.tag_id}`).then( res => {
                                console.log(res);
                                props.updatePinnedTags(res.data);
                                setPinned(false);
                            })
                        }}
                    >
                        <FontAwesomeIcon icon={faThumbtack} />
                    </button> : null)
                    :
                    <button className='pin-tag'
                        onClick={()=>{
                            axios.post(`/api/pin_tag/${props.songTagItem.tag_id}`).then( res => {
                                console.log(res);
                                props.updatePinnedTags(res.data);
                                setPinned(true);
                            })
                        }}
                    >
                        <FontAwesomeIcon icon={faThumbtack} />
                    </button>
                }
            </div>
        </div>
    )
}

export default connect(null, { updatePinnedTags })(TagItem)