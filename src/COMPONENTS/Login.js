import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const isLoggedIn = authCtx.isLoggedIn;

  const [isLogin, setIsLoggedIn] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);

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
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        setEmail("");
        setPassword("");
        setShowVerifyButton(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const sendVerificationEmail = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBU9hhDeQLi9pam2iiNtGs2CqHWHiolr0w",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("Verification email sent! Check your email.");
          navigate("/");
        } else {
          return res.json().then((data) => {
            let errorMessage = "Failed to send verification email";
            if (data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const forgetPasswordHandler = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="login-form-container">


    {!showVerifyButton &&  <form onSubmit={loginHandler} className="login-form">
        <h2 className="login-form-title">Login</h2>
        <div className="login-form-group">
          <label htmlFor="email" className="login-form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-form-input"
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password" className="login-form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-form-input"
          />
        </div>
        <button type="submit" className="login-form-button">
          Login
        </button>
        <a href="#" onClick={forgetPasswordHandler} className="login-form-link">
          Forgot password?
        </a>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="login-form-link-button"
        >
          Don't have an account? Sign up
        </button>
      </form>
}

      {showVerifyButton && (
        <button onClick={sendVerificationEmail} className="verify-button">
          Verify Email
        </button>
      )}
    </div>
  );
};

export default Login;
