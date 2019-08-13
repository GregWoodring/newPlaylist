import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { toggleSidebar } from '../../reducers/routingReducer';
import { Link, Redirect } from 'react-router-dom';

import './Header.scss'

class Header extends Component{
    constructor(props){
        super(props);

        this.state={
            showSettings: false,
            //logout: false
        }
    }
    //let showSettings = false;
    render(){
        let settingsClass = "settings-panel" + (this.state.showSettings ? '' : ' hide');
        return(
            <div className='header'>
                
                <div 
                    className='nav-toggle'
                    onClick={() => {
                        this.props.toggleSidebar(true)}}>
                    <i className="fa fa-bars"></i>
                </div>
                <div>
                    <h1>{this.props.pageHeader}</h1> {/*will need to be controlled by store*/}
                </div>
                <div 
                    className="settings"
                    >
                    <i 
                        className="fa fa-cog"
                        onClick={() => {
                            this.setState({
                                showSettings: !this.state.showSettings
                            });
                        }}
                    ></i>
                    <div 
                    className={settingsClass}>
                        <ol>
                            <li
                                onClick={() => {
                                    axios.post('/auth/logout');
                                    window.location.href= process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://newplaylist.gregwoodring.com/'
                                }} 
                            >Log out</li>
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        pageHeader: state.routing.pageHeader,
        showSidebar: state.routing.showSidebar
    }
}

export default connect(mapStateToProps, { toggleSidebar })(Header);