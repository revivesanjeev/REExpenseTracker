
import React, { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./MainNavigate.css"; 
import { AuthContext } from "./AuthContext";

const MainNavigate = () => {

  const authCtx=useContext(AuthContext);
  const email=authCtx.email;
  const token=authCtx.token;

const navigate=useNavigate();

const logouthandler=()=>{
  
  localStorage.removeItem("token", token);
  localStorage.removeItem("email", email);
  
navigate("/login")


}


  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>


        <button onClick={logouthandler}>Logout</button>
       
      </ul>
    </nav>
  );
};

export default MainNavigate;
