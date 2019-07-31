import React from 'react';

import { connect } from 'react-redux';
import { getUserTags } from '../../reducers/tagReducer';

let TagsDropDown = props => {
    return (
        <div className='Tag-Selector'>
            <div className=''>

            </div>
        </div>
    )
}


function mapStateToProps(state){
    return {
        userTags: state.tags.userTags,
        fetchingUserTags: state.tags.fetchingUserTags
    }
}

export default connect(mapStateToProps, { getUserTags })(TagsDropDown);