import React, { useState } from "react";
import "./ForgetPasswordHandler.css"; // Import the CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const resetPasswordHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=YOUR_API_KEY",
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
    <div className="forgot-password-form-container">
      <form onSubmit={resetPasswordHandler} className="forgot-password-form">
        <h2 className="forgot-password-form-title">Reset Password</h2>
        <div className="forgot-password-form-group">
          <label htmlFor="email" className="forgot-password-form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="forgot-password-form-input"
          />
        </div>
        <button
          type="submit"
          className="forgot-password-form-button"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {message && <p className="forgot-password-form-message">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
