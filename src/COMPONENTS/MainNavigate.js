import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainNavigate.css"; // Import the consolidated CSS file
import { AuthContext } from "./AuthContext";

const MainNavigate = () => {
  const authCtx = useContext(AuthContext);
  const email = authCtx.email;
  const token = authCtx.token;
  const isLoggedIn = authCtx.isLoggedIn;

  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token", token);
    localStorage.removeItem("email", email);
    setShowVerifyButton(true);
    navigate("/login");
  };

  return (
    <nav className="navbar-main">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        {!isLoggedIn && (
          <li className="nav-item nav-item-right">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        )}
        {isLoggedIn && !showVerifyButton && (
          <li className="nav-item nav-item-right">
            <button onClick={logoutHandler} className="nav-link-button">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigate;
