import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign-up.css"; 

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const submithandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_API_KEY",
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
          console.log("Signup successful");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then(() => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={submithandler} className="signup-form">
        <h2 className="signup-form-title">Sign Up</h2>
        <div className="signup-form-group">
          <label htmlFor="email" className="signup-form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-form-input"
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="password" className="signup-form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-form-input"
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="confirmPassword" className="signup-form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            required
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-form-input"
          />
        </div>
        <button type="submit" className="signup-form-button">
          Sign Up
        </button>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="signup-form-link-button"
        >
          Have an account? Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
