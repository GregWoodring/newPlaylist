import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Main from './components/Main/Main';

export default (
    <Switch>
        <Route path='/main' component={Main}/>
        <Route exact path='/' component={Login}/>
    </Switch>
)