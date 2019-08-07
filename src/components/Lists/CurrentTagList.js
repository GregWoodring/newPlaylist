import React, { useState, useEffect, useRef }  from 'react';
import TagItem from '../ListItems/TagItem';
import { connect } from 'react-redux';
import axios from 'axios';
import './TagList.scss';

let CurrentTagList = props => {
    const [tagList, setTagList] = useState([]);
    
    

    useEffect(() => {
        axios.get(`/api/song_tag/${props.song.song_id}`).then(res => {
            setTagList(res.data);
        })
    }, [props.song.song_id, props.tagList])
    return (
        <div 
            className='pinned-tag-list'
        >
            <h2> Current Tags: </h2>
            <div className='tag-list'>
                {
                    tagList ?
                    tagList.map(item => {
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
        pinnedTags: state.tags.pinnedTags,
        songList: state.playlist.playlistSongsList
    }
}

export default CurrentTagList;