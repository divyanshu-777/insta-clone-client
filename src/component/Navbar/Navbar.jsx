import React ,{useContext} from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import {UserContext} from '../../app';

const Navbar = () => {

  const {state,dispatch}=useContext(UserContext);
  const renderList = () => {
    if (state) {
      return [
        <>
          <li className="nav-item">
            <Link className="nav-link" to={"/Profile"}>PROFILE</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/CreatePost"}>CREATE POST</Link>
          </li>
          <li className="nav-item">
           <button className="btn btn-danger btn2" onClick={()=>{
               localStorage.clear();
               dispatch({type:"CLEAR"})
           }}>
             LOGOUT
             </button>
          </li>
        </>
      ]
    }
    else {
      return [
        <>
          <li className="nav-item">
            <Link className="nav-link" to={"/Signup"}>SIGNUP</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/Login"}>LOGIN</Link>
          </li>
        </>
      ]
    }
  }
  return (
    <>

      <nav className="navbar navbar-expand-lg bg-light">
        <Link className="navbar-brand" to={"/"}>Instagram</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {renderList()}
          </ul>
        </div>
      </nav>
    </>

  )

}

export default Navbar;