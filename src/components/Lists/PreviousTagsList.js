import React, { useState, useEffect } from 'react';
import TagItem from '../ListItems/TagItem';
import { connect } from 'react-redux';
import { getUserTags } from '../../reducers/tagReducer';

let PreviousTagsList = props => {
    let [filterText, setFilterText] = useState('');
    useEffect(() => {
        props.getUserTags();
    }, []);

    return (
            <div 
                style={props.passedStyle ? props.passedStyle : {}}
                className='previous-tags pinned-tag-list'>
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
    )
}

function mapStateToProps(state){
    return {
        userTags: state.tags.userTags
    }
}

export default connect(mapStateToProps, { getUserTags})(PreviousTagsList);