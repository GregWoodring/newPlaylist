import React from 'react';

import PlayPauseControl from './PlayPauseControl';

import './RecentlyPlayedControls.scss';

let RecentlyPlayedControls = props => {
    return(
        <div className='recently-played-controls'>
            <PlayPauseControl
                song={props.song}
                passedStyle={{
                    margin: '.25em 2em',
                    height: '2.5em',
                    width: '2.5em'
                }} />
        </div>
    )
}

export default RecentlyPlayedControls;