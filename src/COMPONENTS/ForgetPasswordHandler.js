import React, { useState } from "react";
import "./Form.css"; // Import the CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const resetPasswordHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBU9hhDeQLi9pam2iiNtGs2CqHWHiolr0w",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          setMessage(
            "Password reset email sent! Please check your email for further instructions."
          );
        } else {
          return res.json().then((data) => {
            let errorMessage = "Failed to send password reset email";
            if (data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err.message);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={resetPasswordHandler} className="form">
        <h2 className="form-title">Reset Password</h2>
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
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
