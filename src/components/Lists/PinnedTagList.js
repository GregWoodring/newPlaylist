import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPinnedTags } from '../../reducers/tagReducer';

import TagItem from '../ListItems/TagItem';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

import './TagList.scss'

let PinnedTagList = props => {
    console.log(props.pinnedTags)

    return (
        <div className='pinned-tag-list'>
            <h2> Pinned Tags: </h2>
            <div className='tag-list'>
            {
                !props.fetchingPinnedTags && props.pinnedTags.length > 0 ?
                props.pinnedTags.map(item => {
                    let isAdded = !!props.song.tags_arr && props.song.tags_arr.find((songTag, index) => {
                        return songTag.tag_id === item.tag_id;
                    });

                    return(
                        <TagItem
                            key={item.tag_id}
                            songId={props.song.song_id}
                            songTagItem={item}
                            isAdded={isAdded}
                            isPinned={true}
                            />
                    )
                }) : <LoadingScreen />
            }
            </div>
        </div>
    )
}

function mapStateToProps(state){

    return {
        pinnedTags: state.tags.pinnedTags,
        fetchingPinnedTags: state.tags.fetchingPinnedTags
    }
}
export default connect(mapStateToProps, { getPinnedTags })(PinnedTagList);