import React from 'react';

import './LoadingScreen.scss';

let LoadingScreen = props => {
    return (
        <div className="loading-screen">
            <div>
                <div className="border"></div>
                <span>Loading...</span>
            </div>
        </div>
    )
}


export default LoadingScreen;