import React, { useRef } from "react";
import "./Signup.css"; // Import the CSS file

const Signup = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmpasswordInputRef = useRef(null);

  const submithandler = (e) => {
    e.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmpasswordInputRef.current.value;

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBU9hhDeQLi9pam2iiNtGs2CqHWHiolr0w",
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
          console.log({ email, password });
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
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form onSubmit={submithandler}>
      <h2>Sign Up</h2>
      <input type="email" required placeholder="Email" ref={emailInputRef} />
      <input
        type="password"
        required
        placeholder="Password"
        ref={passwordInputRef}
      />
      <input
        type="password"
        required
        placeholder="Confirm Password"
        ref={confirmpasswordInputRef}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
