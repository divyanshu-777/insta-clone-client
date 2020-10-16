import React, { useState} from 'react'
import {useHistory} from 'react-router-dom'

import M from 'materialize-css';

const ResetPassword = () => {

    const history = useHistory();

    const [FormData, SetFormData] = useState({
        Email: "",
    })

    function HandleClick(event) {
        const { name, value } = event.target;
        SetFormData({ ...FormData, [name]: value })
    }

    function CheckData(event) {
        event.preventDefault()

        const Email = FormData.Email

        fetch('http://localhost:5000/api/reset-password', {
            method: "Post",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                Email
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: "Invalid Credentials", classes: "c62828 red darken-3" })
                    history.push('/Login')
                }
                else {
                    M.toast({ html: data.message, classes: "4caf50 green" });
                    history.push('/Login')
                }
            })
            .catch(error=>console.log(error));
    }

    return (
        <div className="outerdiv">
            <div className="innerdiv">
                <h1>INSTAGRAM </h1>
                <br />
                <input className="form-control" name="Email" value={FormData.Email} onChange={HandleClick} placeholder="Email" type="text" />
                <br />
                <button onClick={CheckData} className="btn btn-success">Reset Password</button>
            </div>
        </div>
    )
}

export default ResetPassword;