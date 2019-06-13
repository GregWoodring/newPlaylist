import React, { Component } from 'react';
import axios from 'axios';


class Login extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }

    login = () => {
        axios.get('/auth/login-spotify').then(res => {

        }).catch(err => {
            console.log(err);
        })
    }

    render(){
        return(
            <div>
                <h1>Login!</h1>
                <button
                
                >
                    Login with Spotify
                </button>
            </div>
        )
    }
}

export default Login;