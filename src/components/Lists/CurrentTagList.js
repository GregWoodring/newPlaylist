import React  from 'react';
import TagItem from '../ListItems/TagItem';
import { connect } from 'react-redux';

import './TagList.scss';

let CurrentTagList = props => {
    return (
        <div className='pinned-tag-list'>
            <h2> Current Tags: </h2>
            <div className='tag-list'>
                {
                    props.song.tags_arr ?
                    props.song.tags_arr.map(item => {
                        let isPinned = !!props.pinnedTags && props.pinnedTags.find(pinnedTag => {
                            return pinnedTag.tag_id === item.tag_id;
                        });

                        return(
                            <TagItem
                                key={item.tag_id}
                                songId={props.song.song_id}
                                songTagItem={item}
                                isAdded={true}
                                isPinned={isPinned}
                                />
                        )
                    }) : null
                }
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        pinnedTags: state.tags.pinnedTags
    }
}

export default CurrentTagList;