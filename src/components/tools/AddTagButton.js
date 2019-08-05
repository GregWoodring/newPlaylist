import React, { useState } from 'react';

import './AddTagButton.scss';
import InputTag from '../tools/InputTag';
import CurrentTagList from '../Lists/CurrentTagList';
import PreviousTagsList from '../Lists/PreviousTagsList';
import { connect } from 'react-redux';
import { getUserTags } from '../../reducers/tagReducer';


let AddTagButton = props => {
    let [modalState, setModalState] = useState('hide');
    
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
                        />
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