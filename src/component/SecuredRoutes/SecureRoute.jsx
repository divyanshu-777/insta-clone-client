import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const SecureRoute = ({ component: Component, path }) => {

    const User = JSON.parse(localStorage.getItem("user"));
    return (
        <Route path={path} render={() => (
            User !== null ?
             <Component /> : 
            <Redirect to="/Login" />
        )} />
    )

}

export default SecureRoute;