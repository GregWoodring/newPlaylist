import React, { useState, useRef } from 'react';

import './AddTagButton.scss';
import InputTag from '../tools/InputTag';
import CurrentTagList from '../Lists/CurrentTagList';
import PreviousTagsList from '../Lists/PreviousTagsList';
import { connect } from 'react-redux';
import { getUserTags } from '../../reducers/tagReducer';


let AddTagButton = props => {
    let [modalState, setModalState] = useState('hide');
    const [tagList, setTagList] = useState(props.song.tags_arr);

    return(
        <div 
            className='add-tag-button'
            
        >
            <div 
            className='clickable'
            onClick={() => {
                setModalState(modalState === 'add-tag-modal open' ? 'add-tag-modal close' : 'add-tag-modal open')
            }}>
            <h4>Add Tag</h4>
            </div>
            <div className={modalState}>
                    <div className='existing-tags-list'>
                        <PreviousTagsList 
                            song={props.song}
                            tagList={tagList}
                            addRemoveTag={(newTagList) => {setTagList(newTagList)}}
                        />
                        <CurrentTagList 
                            song={props.song}
                            tagList={tagList}
                        />
                    </div>
                    

                <InputTag 
                    songId={props.song.song_id}
                    addRemoveTag={(newTagList) => {setTagList(newTagList)}}                    
                    />
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        userTags: state.tags.userTags
    }
}

export default connect(mapStateToProps, { getUserTags })(AddTagButton)