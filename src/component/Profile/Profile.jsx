import React, { useEffect, useState ,useContext} from 'react'
import {UserContext} from '../../app';

import './Profile.css'


const Pofile = () => {
 
    const [mypost, setMyPost] = useState([]);
    const {state,dispatch} = useContext(UserContext);
    
    useEffect(()=>{
      fetch("http://localhost:5000/api/my-post",{
          headers : {
              "Authorization" : "Bearer "+localStorage.getItem("token")
          }
      })
      .then(res=>res.json())
      .then(data=>{
         setMyPost(data.mypost);
      })
    },[])
    
    const deleteUser = ()=>{
        fetch('http://localhost:5000/api/delete-user',{
            method : "delete",
            headers : {
                "Authorization" : "Bearer "+ localStorage.getItem('token')
            },
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            localStorage.clear();
            dispatch({type:"CLEAR"})
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <>
            <div style= {{maxWidth:"700px", margin:"0px auto"}}>
                <div className="innerdiv1">
                    <div>
                      <img style={{width: "160px", height : "160px",borderRadius:"80px"}}
                      src={state?state.Profilepic: "loading!!"}
                      alt= ""/>
                    </div>
                    <div>
                       <h4> {state? state.Username : "loading"}</h4>
                       <h6> {state? state.Email : "loading"}</h6>
                       <br/>
                       <div style={{display:"flex", width:"108%" ,justifyContent:"space-between"}}>
                           <h6> {mypost.length} Posts</h6>
                           <h6> {state? state.Followers.length: "0"} Follower</h6>
                           <h6> {state? state.Following.length: "0"} Following</h6>
                       </div>
                    </div>
                    <button className="btn btn-danger" onClick={deleteUser} type="submit">Delete Account</button>
                </div>
                <div className="gallery">
                    {
                        mypost.map(items=>{
                            return(
                            <img className="mypic" src={items.Photo} alt={items.Title} key={items._id}/>
                            )
                        })      
                      }
                </div>
            </div>

        </>
        // eslint-disable-next-line
    )
}

export default Pofile;