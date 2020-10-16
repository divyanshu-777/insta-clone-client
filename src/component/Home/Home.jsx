import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../app';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {

  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    let isMounted = true;

    fetch('http://localhost:5000/api/all-post', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(resp => resp.json())
      .then(result => {
        if(isMounted)
        setData(result.post);
      })
      return () => {
        isMounted = false;
    };

  }, [data])

  const DoComment = (text, postId) => {
    fetch('http://localhost:5000/api/comments', {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body: JSON.stringify({
        text,
        postId
      })
    })
      .then(res => res.json())
      .then(result => {
      //  setData(JSON.parse(result));
      })
      .catch(err => console.log(err));
  }

  const deletePost = (postid) => {
    fetch(`http://localhost:5000/api/delete-post/${postid}`, {
      method: "delete",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      {
        data?
        data.map(items => {
          return (
            <div className="card" key={items._id}>
              <h5 style={{padding: "6px"}}><Link to={items.Postedby._id !== state._id?"/Profile/" + items.Postedby._id:"/Profile"}>{items.Postedby.Username} </Link>{items.Postedby._id === state._id
                && <i className="material-icons" style={{ float: "right" }}
                  onClick={() => deletePost(items._id)}
                >delete</i>}</h5>
              <img className="card-img-top" src={items.Photo}
                alt="" />
              <div className="card-body">
                <h5 className="card-title">{items.Title}</h5>
                <p className="card-text">{items.Body}</p>

                {
                  items.Comments.map(records => {
                    return (
                      <h6><span style={{ fontWeight: "500" }}>{records.Postedby.Username}: </span>{records.text}</h6>
                    )
                  })
                }
                <form onSubmit={(e) => {
                  e.preventDefault();
                  DoComment(e.target[0].value, items._id);
                  e.target.reset();
                }}>
                  <input placeholder="add a comment" type="text" className="form-control" />
                </form>
              </div>
            </div>
          )
        })
        :
        "No Posts"
      }

    </>
  )
}

export default Home;