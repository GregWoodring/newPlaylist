import React from 'react';
import { connect } from 'react-redux';
import { changePageHeader } from '../../reducers/routingReducer';

import SongDisplay from '../Display/SongDisplay';
import SongList from '../SongList/SongList';

let RecentlyPlayed = props => {
    props.changePageHeader('Recently Played');
    return(
        <div>
            <SongDisplay />
            <SongList />
        </div>
    )
}

export default connect(null, { changePageHeader })(RecentlyPlayed);