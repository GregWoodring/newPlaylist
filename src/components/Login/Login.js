import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/login.scss';
import { connect } from 'react-redux';
import { loginUser, checkLogin } from '../../reducers/userReducer';
import { Redirect } from 'react-router-dom';


//Login Screen component, plan to have rotating album art on front here
//will need to make api call to get top artists

//Not sure if this should be a class, still figuring how much should be redux
//and how much should be in here. Could consider using hooks for the api
//call
class Login extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }

    componentWillMount(){
        //gets current login as a boolean 
        //which is passed to a ternary 
        //in the render 
        //When login is true it renders
        // a Redirect component and redirects to /#/main.
        this.props.checkLogin();
    }

    login = () => {
        //on login button click user is redirected to the OAuth verification
        //site at spotify

        //url variables -- kept as variables because I expect them to change
        //when I move into production. Which I should set up sooner rather than
        //later 
        let client_id = '3667c6a4d310432b92db1055bea04e22';
        let redirect_uri = 'http://www.newplaylist.gregwoodring.com/auth/spotify';
        let scope = [
            'user-read-email',
            'user-read-recently-played', 
            'user-library-modify',
            'playlist-modify-public',
            'playlist-read-private',
            'playlist-modify-public',
            'playlist-modify-private',
            'user-library-read',
            'playlist-read-collaborative',
            'user-read-birthdate',
            'user-read-playback-state',
            'user-read-private',
            'app-remote-control',
            'user-modify-playback-state',
            'user-follow-read',
            'user-top-read',
            'user-read-currently-playing',
            'user-follow-modify',
            'streaming']

        //This is plain javascript for redirecting
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`
    }

    render(){
        return(
            //using sass for the css. This is ../../styles/login.css
            <div className="login-container">
                {this.props.loggedIn ? <Redirect to='/main' /> : null}
                <div className="login-items">
                    <h1>New Playlist</h1>
                </div>
                <div className="login-items">
                    <button
                        onClick={this.login}
                        className="login-btn"
                    >
                        Login with Spotify
                    </button>
                </div>
            </div>
        )
    }
}

//This function maps the state info I'm using on to props
//it handles the subscribe so changing this data from anywhere should 
//be able to be changed from anywhere and trigger this change
//I may be able to have this data on App and just render this page
//if the user is logged out.
function mapStateToProps(state){
    return {
        loggedIn: state.user.loggedIn
    }
}

//this connects the store to this component. I also subscribe this component
//to these events. So what I need to do is move the login information up to
//app and switch on login and main. Might have it actually be at /login and 
//main be /
export default connect(mapStateToProps, { loginUser, checkLogin })(Login);