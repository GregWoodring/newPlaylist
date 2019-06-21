import React from 'react';

import { connect } from 'react-redux';
import { changePageHeader } from '../../reducers/routingReducer';

let Playlists = props => {
    props.changePageHeader('Playlists');
    return (
        <div>

        </div>
    );
}

export default connect(null, { changePageHeader })(Playlists);