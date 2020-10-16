import React, { useState,useContext } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../../app';

import M from 'materialize-css';
import './Login.css'


const Login = () => {

    const {state,dispatch}=useContext(UserContext);
    const history = useHistory();

    const [FormData, SetFormData] = useState({
        Email: "",
        Password: ""
    })

    function HandleClick(event) {
        const { name, value } = event.target;
        SetFormData({ ...FormData, [name]: value })
    }

    function CheckData(event) {
        event.preventDefault()
        const data = {
            ...FormData
        }

        fetch('http://localhost:5000/api/sign-in', {
            method: "Post",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status ==="422") {
                    M.toast({ html:  data.message, classes: "c62828 red darken-3" })
                    history.push('/Login')
                    console.log(data);
                }
                else {
                    localStorage.setItem('token',data.token)
                    localStorage.setItem('user',JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user});
                    M.toast({ html: data.message, classes: "4caf50 green" });
                    history.push('/')
                }
            })
            .catch(error=>console.log(error));
    }

    return (
        <div className="outerdiv">
            <div className="innerdiv">
                <h1 className ="navbar-brand1">Instagram </h1>
                <br />
                <input className="form-control" name="Email" value={FormData.Email} onChange={HandleClick} placeholder="Email" type="text" />
                <br />
                <input className="form-control" name="Password" value={FormData.Password} onChange={HandleClick} placeholder="Password" type="password" />
                <br />
                <button onClick={CheckData} className="btn btn-success btn1">Login</button>
                 <br/><br/>
                <h6>
                    <Link to="/reset">Forgot Password??</Link>
                </h6>
            </div>
        </div>
    )
}

export default Login;