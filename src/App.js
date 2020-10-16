import React, { useReducer, createContext, useEffect} from 'react';
import { Switch, Route } from 'react-router-dom'
import './app.css'

import Navbar from './component/Navbar/Navbar'
import Login from './component/Login/Login'
import Signup from './component/Signup/Signup'
import Pofile from './component/Profile/Profile'
import UserProfile from './component/UserProfile/UserProfile'
import Home from './component/Home/Home'
import CreatePost from './component/CreatePost/CreatePost'
import SecureRoute from './component/SecuredRoutes/SecureRoute'
import ResetPassword from './component/ResetPassword/ResetPassword';
import NewPassword from './component/NewPassword/NewPassword';

import { reducer, initialState } from './Reducer/UserReducer'

export const UserContext = createContext();

const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(()=>{
        const User = JSON.parse(localStorage.getItem("user"));
        if(User){
            dispatch({type:"USER",payload:User});
        }
    },[])

    return (
        <>
            <UserContext.Provider value={{ state, dispatch }}>
                <Navbar />
                <Switch>
                    <SecureRoute exact path='/' component={Home} />
                    <Route path='/Login' component={Login} />
                    <Route path='/Signup' component={Signup} />
                    <Route exact path='/reset' component={ResetPassword} />
                    <Route exact path='/reset/:token' component={NewPassword} />
                    <SecureRoute exact path='/Profile' component={Pofile} />
                    <SecureRoute exact path='/Profile/:userid' component={UserProfile} />
                    <SecureRoute path='/CreatePost' component={CreatePost} />
                </Switch>
            </UserContext.Provider>
        </>
    )
}

export default App;