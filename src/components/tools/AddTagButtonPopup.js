import React, { useState } from 'react';
import './AddTagButtonPopup.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PreviousTagsList from '../Lists/PreviousTagsList';
import CurrentTagList from '../Lists/CurrentTagList';
import InputTag from '../tools/InputTag';


let AddTagButtonPopup = props => {

    const [showModalClass, setShowModalClass] = useState('hide')
    return(
        <div className='add-tag-button-popup'>
            <FontAwesomeIcon icon={faHashtag} 
                onClick={() => setShowModalClass('add-tag-modal-popup open-modal')}
            />

            <div className={showModalClass}>
                <div className='modal-controls'>
                    <button
                        className='close-modal-button'
                        onClick={() => {
                            setShowModalClass('add-tag-modal-popup close-modal')
                            setTimeout(() => {setShowModalClass('hide')}, 500)
                        }}
                    >
                        X
                    </button>
                </div>
                    <div className='existing-tags-list-popup'>
                        <PreviousTagsList 
                            passedStyle={{
                                zIndex: '106'
                            }}
                            song={props.song}
                        />
                        <CurrentTagList 
                            song={props.song}
                        />
                    </div>
                    
                    <div className='input-tag-container'>
                        <InputTag 
                            songId={props.song.song_id} />
                    </div>
                
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        
    }
}

export default AddTagButtonPopup;