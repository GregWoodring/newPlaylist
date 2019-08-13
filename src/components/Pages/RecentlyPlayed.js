import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePageHeader } from '../../reducers/routingReducer';
import { getRecentlyPlayed, changeCurrentSong } from '../../reducers/recentlyPlayedReducer';

import SongDisplay from '../Display/SongDisplay';
import SongList from '../SongList/SongList';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

class RecentlyPlayed extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.changePageHeader('Recently Played');
        this.props.getRecentlyPlayed();
    }
    
    render(){
        return(
            
           <div>
               {this.props.loadingRP ? 
               <LoadingScreen /> : 
                <div>
                        <SongDisplay 
                            currentSong={this.props.currentSong}
                            control={'recently-played-songs'}
                        />
                        <SongList 
                            list={this.props.recentlyPlayed}
                            changeCurrentSong={this.props.changeCurrentSong}
                        />
                </div>
                }
            </div>
            
        )
    }
}

function mapStateToProps(state){
    return{
        recentlyPlayed: state.recentlyPlayed.recentlyPlayed,
        currentSong: state.recentlyPlayed.currentSong,
        loadingRP: state.recentlyPlayed.loadingRP
    }
}

export default connect(mapStateToProps, { changePageHeader, getRecentlyPlayed, changeCurrentSong })(RecentlyPlayed);