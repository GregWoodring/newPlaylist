import React, { useState, useEffect } from 'react';

import './AddTagButton.scss';
import InputTag from '../tools/InputTag';
import PinnedTagList from '../Lists/PinnedTagList';
import CurrentTagList from '../Lists/CurrentTagList';
import TagItem from '../ListItems/TagItem';
import { connect } from 'react-redux';
import { getUserTags } from '../../reducers/tagReducer';


let AddTagButton = props => {
    let [modalState, setModalState] = useState('hide');
    let [filterText, setFilterText] = useState('');
    useEffect(() => {
        props.getUserTags();
        console.log('this happnee')
    }, [])
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
                        <div className='previous-tags pinned-tag-list'>
                            <h2>Previous Tags</h2>
                            <input  
                                type='text'
                                placeholder='Search Tags'
                                className='filter-input'
                                onChange={e => setFilterText(e.target.value)} />
                            <div className='tag-list'>
                            {props.userTags ? props.userTags.filter(item => 
                                item.tag_description.includes(filterText)).map(item => {
                                    let isAdded = props.song.tags ? props.song.tags.findIndex(tag => tag.tag_id === item.tag_id) > 0 : false;
                                    return (
                                        <TagItem
                                            key={item.tag_id}
                                            songId={props.song.song_id}
                                            songTagItem={item}
                                            isAdded={isAdded}
                                            isPinned={false}
                                            
                                            />
                                    )
                                    }) : null}
                            </div>
                        </div>
                        <CurrentTagList 
                            song={props.song}
                        />
                    </div>
                    

                <InputTag 
                    songId={props.song.song_id} />
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