import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./Form.css"; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
 

   const [islogin, setIsLoggedIn] = useState(false);
  

  const loginHandler = (event) => {
    event.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBU9hhDeQLi9pam2iiNtGs2CqHWHiolr0w",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

      .then((res) => {
        if (res.ok) {
          console.log("user logged in");
          setIsLoggedIn(true);
          return res.json();
        } else {
          return res.json()
          .then((data) => {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
            
          });
        }
      })
      .then((data) => {
         authCtx.login(data.idToken);
        setEmail("");
        setPassword("");
        navigate("/complete");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={loginHandler} className="form">
        <h2 className="form-title">Login</h2>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">
          Login
        </button>
        <a href="#" className="form-link">
          Forgot password?
        </a>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="form-link-button"
        >
          Don't have an account? Sign up
        </button>
      </form>
    </div>
  );
};

export default Login;
