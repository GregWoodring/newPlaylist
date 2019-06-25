import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../reducers/userReducer';
import { getUserPlaylists } from '../../reducers/playlistReducer';
import { Switch, Route } from 'react-router-dom';

import Header from '../Header/Header';
import SideBar from '../Sidebar/Sidebar';

import RecentlyPlayed from '../Pages/RecentlyPlayed';
import Playlists from '../Pages/Playlists';



//Main Component will render display, sidebar, and list (list is only SongList right now but should be able to be any type of list)
//SideBar will have Recently Played (Home), playlist, search, and new.

class Main extends Component{
    constructor(props){
        super(props);
        
        this.state = {

        }
    }

    //this function will render our lists (Need to move away from doing 
    //specific functions, render list based off passing a function from the store
    //need to store these functions in an object to use as an enum)
    // renderSongList(){
    //     return this.props.recentlyPlayed.map(item => {
    //         return (

    //         )
    //     })

    // }
    componentDidMount(){
        getUserPlaylists();
    }

    render(){
        return(
            <div>
                <SideBar />
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/main' component={RecentlyPlayed}/>
                        <Route path='/main/playlists' component={Playlists}/>
                    </Switch>
                    <footer>
                        {/* Will someday be song player*/}
                    </footer>
                </div>
            </div>
        )
    }
}

//Likely want an enum for which type I'm viewing
//  Types:
//       1. Song (Rater)
//       2. Artist (Finder)
//       3. Album (Finder)
//       4. Playlist (Classification) 
//       5. Playlist (Search/Generator)



function mapStateToProps(state){
    return {
        loggingIn: state.loggingIn,
        recentlyPlayed: state.recentlyPlayed
    }
}

export default connect(mapStateToProps, { loginUser, getUserPlaylists })(Main);