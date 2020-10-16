import React, { useEffect, useState ,useContext} from 'react'
import {UserContext} from '../../app';
import {useParams} from 'react-router-dom'

import './UserProfile.css'


const UserPofile = () => {
 
    const [userProfile, setProfile] = useState(null);
   
    const {state,dispatch} = useContext(UserContext);
    const userid = useParams();
    const [canFollow,setCanFollow]= useState(true);
    useEffect(()=>{
      fetch(`http://localhost:5000/api/users-profile/${userid.userid}`,{
          headers : {
              "Authorization" : "Bearer "+localStorage.getItem("token")
          }
      })
      .then(res=>res.json())
      .then(data=>{
        setProfile(data);
        console.log(data);
      })
    },[])

    const followUser = ()=>{
        fetch('http://localhost:5000/api/follow',{
            method : "put",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+ localStorage.getItem('token')
            },
            body : JSON.stringify({
                followId : userid.userid
            }) 
        })
        .then(res=>res.json())
        .then(data=>{
            dispatch({type: "UPDATE",payload :{Following : data.Following, Followers : data.Followers}})
            localStorage.setItem("user",JSON.stringify(data));
            setProfile((prevState)=>{
                return{
                ...prevState,
                  user : {
                      ...prevState.user,
                      Followers : [...prevState.user.Followers,data._id]
                  }
                }
            })
            setCanFollow(false);
        })
        .catch(err=>console.log(err))
    }

    const unfollowUser = ()=>{
        fetch('http://localhost:5000/api/unfollow',{
            method : "put",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer "+ localStorage.getItem('token')
            },
            body : JSON.stringify({
                unfollowId : userid.userid
            }) 
        })
        .then(res=>res.json())
        .then(data=>{
            dispatch({type: "UPDATE",payload :{Following : data.Following, Followers : data.Followers}})
            localStorage.setItem("user",JSON.stringify(data));
            setProfile((prevState)=>{
                const newFollowers = prevState.user.Followers.filter(item=>item !==data._id);
                return{
                ...prevState,
                  user : {
                      ...prevState.user,
                      Followers :newFollowers
                  }
                }
            })
            setCanFollow(true);
        })
        .catch(err=>console.log(err))
    }

    return (
        <>
        {userProfile? 
         <div style= {{maxWidth:"700px", margin:"0px auto"}}>
         <div className="innerdiv1">
             <div>
               <img style={{width: "160px", height : "160px",borderRadius:"80px"}}
               src={userProfile.user.Profilepic}
               alt= ""/>
             </div>
             <div>
                <h4> {userProfile.user.Username}</h4>
                <h6> {userProfile.user.Email}</h6>
                <div style={{display:"flex", width:"108%" ,justifyContent:"space-between"}}>
                    <h6> {userProfile.posts.length} Posts</h6>
                    <h6> {userProfile.user.Followers.length} Follower</h6>
                    <h6> {userProfile.user.Following.length} Following</h6>
                </div>
                <br/>
                {canFollow?  <button className="btn btn-primary" onClick={followUser}>Follow</button>
                : <button className="btn btn-primary" onClick={unfollowUser}>UnFollow</button>} 
             </div>
           
         </div>
         <div className="gallery">
             {
                 userProfile.posts.map(items=>{
                     return(
                     <img className="mypic" src={items.Photo} alt={items.Title} key={items._id}/>
                     )
                 })      
               }
         </div>
     </div>    
        :     
        <h2>Loading !!!</h2>}
           

        </>
        // eslint-disable-next-line
    )
}

export default UserPofile;