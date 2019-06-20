import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecentlyPlayed, changeCurrentSong } from '../../reducers/recentlyPlayedReducer';


import SongItem from '../SongItem/SongItem'

import './SongList.scss'

class SongList extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }
    componentWillMount(){
        this.props.getRecentlyPlayed()
    }



    render(){
        console.log(this.props)
        return(
            <div className="song-list">
                <div className="song-list-header">
                    <div>
                        <h3>Song Name</h3>
                    </div>
                    <div>
                        <h3>Album Name</h3>
                    </div>
                    <div>
                        <h3>Artist Names</h3>
                    </div>
                    <div>
                        <h3>Played At</h3>
                    </div>
                </div>
                {this.props.recentlyPlayed.map(item => {
                    return (
                        <SongItem
                            key={item.recently_played_id}
                            song={item}
                            click={changeCurrentSong}
                        />
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        recentlyPlayed: state.recentlyPlayed.recentlyPlayed
    }
    
}

export default connect(mapStateToProps, { getRecentlyPlayed, changeCurrentSong })(SongList)