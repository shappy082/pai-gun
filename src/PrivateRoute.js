import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import MainLayout from './Mainlayout'

function PrivateRoute({ component: Component, ...rest }) {
    //console.log("PrivateRoute >> sessionStorage is", sessionStorage.getItem('user'));
    return (
        <Route {...rest} render={props => (
            sessionStorage.getItem('user')
                ? <MainLayout {...props} />
                : <Redirect to="/login" />
        )} />
    );
}

export default PrivateRoute;