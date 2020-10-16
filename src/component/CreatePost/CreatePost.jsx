import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css';

import './Createpost.css'

const CreatePost = () => {

    const history = useHistory();

    const [FormEntries, SetFormEntries] = useState({
        title: "",
        body: "",
        image: ""
    })

    const [url, Seturl] = useState("");

    function HandleClick(event) {
        const { name, value, type, files } = event.target;
        type === "file" ? SetFormEntries({ ...FormEntries, [name]: files[0] })
            : SetFormEntries({ ...FormEntries, [name]: value })
    }

    const PostDetails = () => {
        const data = new FormData();
        data.append("file", FormEntries.image)
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

    useEffect(() => {

        if (url) {
            const data = {
                Title: FormEntries.title,
                Body: FormEntries.body,
                Pic: url
            }

            fetch("http://localhost:5000/api/create-post", {
                method: "Post",
                headers: {
                    'Content-type': "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        M.toast({ html: data.message, classes: "4caf50 green" });
                        history.push('/')
                    }
                    else
                        console.log(data);
                })
                .catch(err => console.log(err))
        }
        // eslint-disable-next-line
    }, [url]);

    return (
        <>
            <div className="postdiv">
                <div>
                    <h4>CREATE POST</h4><br />
                    <input placeholder="title" name="title" onChange={HandleClick} value={FormEntries.title} className="form-control" type="text" />
                    <br />
                    <input placeholder="body" name="body" onChange={HandleClick} value={FormEntries.body} className="form-control" type="text" />
                    <br />
                    <div className="file-field input-field">
                        <div className="btn btn-sm">
                            <span>File</span>
                            <input type="file" name="image" onChange={HandleClick} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                </div>
                <br />
                <button onClick={PostDetails} type="submit" className="btn btn-success">Add Post</button>
            </div>

        </>
    )
}

export default CreatePost;