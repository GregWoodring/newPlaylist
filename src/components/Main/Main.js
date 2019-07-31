import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../reducers/userReducer';
import { importUserPlaylists } from '../../reducers/playlistReducer';
import { getPinnedTags } from '../../reducers/tagReducer';
import { getPlayer, setDeviceId, setCurrentlyPlaying } from '../../reducers/playerReducer';

import { Switch, Route } from 'react-router-dom';

import Header from '../Header/Header';
import SideBar from '../Sidebar/Sidebar';

import RecentlyPlayed from '../Pages/RecentlyPlayed';
import Playlists from '../Pages/Playlists';
import PlaylistSongs from '../Pages/PlaylistSongs';
import EditPlaylist from '../Pages/EditPlaylist';
import PlayerFooter from '../Player/PlayerFooter';

import './Main.scss';


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
        try{
        this.props.importUserPlaylists();
        this.props.getPinnedTags();

        window.onSpotifyWebPlaybackSDKReady = async () => {
            let token = await axios.get('/api/get_access_token');
            token = token.data;
            // eslint-disable-next-line no-undef
            const player = new Spotify.Player({
              name: 'New Playlist',
              getOAuthToken: cb => { cb(token); }
            });
      
            // Error handling
            player.addListener('initialization_error', ({ message }) => { console.error(message); });
            player.addListener('authentication_error', ({ message }) => { console.error(message); });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });
      
            // Playback status updates
            player.addListener('player_state_changed', state => { 
                console.log(state);
                //this.props.setCurrentlyPlaying(state.context.uri)
             });
      
            // Ready
            player.addListener('ready', ({ device_id }) => {
              this.props.setDeviceId(device_id);
            });
      
            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
              console.log('Device ID has gone offline', device_id);
            });
      
            // Connect to the player!
            player.connect();
            
            this.props.getPlayer(player);
          };
        } catch(err){
            console.log('Error in Component Will Mount Main: ', err);
        }
    }

    render(){
        return(
            <div className='main'>
                <SideBar />
                <div className='main'>
                    <Header />
                    <Switch>
                        <Route exact path='/main' component={RecentlyPlayed}/>
                        <Route path='/main/playlists/:playlist_id' component={PlaylistSongs} />
                        <Route path='/main/playlists' component={Playlists}/>
                        <Route path='/main/edit_playlist/:playlist_id' component={EditPlaylist} />
                        <Route path='/main/edit_playlist' component={EditPlaylist} />
                    </Switch>
                    <PlayerFooter />
                </div>
            </div>
        )
    }
}





function mapStateToProps(state){
    return {
        loggingIn: state.loggingIn,
        recentlyPlayed: state.recentlyPlayed
    }
}

export default connect(mapStateToProps, { 
    loginUser, 
    importUserPlaylists, 
    getPinnedTags, 
    getPlayer, 
    setDeviceId,
    setCurrentlyPlaying })(Main);