import React, { useEffect, useState } from 'react'
import './signup.css'
import M from 'materialize-css';
import { useHistory } from 'react-router-dom'

const Signup = () => {

    const history = useHistory();

    const [DataForm, SetFormEntries] = useState({
        Username: "",
        Email: "",
        Password: "",
        Image : "",
    })

    const [url, Seturl] = useState(""); 

    function HandleClick(event) {
        const { name, value, type, files } = event.target;
        type === "file" ? SetFormEntries({ ...DataForm, [name]: files[0] })
            : SetFormEntries({ ...DataForm, [name]: value })
    }


    const UploadPic = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("file", DataForm.Image)
        data.append("upload_preset", "instagram-clone")
        data.append("cloud_name", "divyanshu11")

        fetch("	https://api.cloudinary.com/v1_1/divyanshu11/image/upload", {
            method: "Post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                Seturl(data.secure_url);
               
            })
            .catch(err => console.log(err));
    }

   useEffect(()=>{
         
        if(url)
        {
        const data = {
           Username :DataForm.Username,
           Email: DataForm.Email,
           Password: DataForm.Password,
           Profilepic: url
        }
        fetch('http://localhost:5000/api/sign-up', {
            method: "Post",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: "Please enter all fields", classes: "c62828 red darken-3" })
                }
                else {
                    M.toast({ html: data.message, classes: "4caf50 green" });
                    history.push('/Login')
                }
            })
            .catch(error=>console.log(error));
        }
    },[url]) 



    return (
        <>
            <div className="outerdiv">
                <div className="innerdiv">
                    <h1 className ="navbar-brand1">Instagram </h1>
                    <br />
                    <form>
                        <input className="form-control" name="Username" value={DataForm.Username} onChange={HandleClick} placeholder="Username" type="text" />
                       
                        <input className="form-control" name="Email" value={DataForm.Email} onChange={HandleClick} placeholder="Email" type="text" />
                    
                        <input className="form-control" name="Password" value={DataForm.Password} onChange={HandleClick} placeholder="Password" type="password" />
                      
                        <div className="file-field input-field">
                        <div className="btn btn-sm">
                            <span>UploadPic</span>
                            <input type="file" name="Image" onChange={HandleClick} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <br/>
                        <button onClick={UploadPic} type="submit" className="btn btn-primary btn1 ">SignUp</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;