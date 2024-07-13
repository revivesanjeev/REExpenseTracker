import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./CompleteProfile.css";

const CompleteProfile = () => {
  const { token, completeProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.user_id;
        setUserId(userId);

        fetch(
          `https://reexpensetracker-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch user data");
            }
            return response.json();
          })
          .then((data) => {
            if (data) {
              setFullName(data.fullName || "");
              setProfilePhoto(data.profilePhoto || "");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const handleUpdate = () => {
    fetch(
      `https://reexpensetracker-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          fullName: fullName,
          profilePhoto: profilePhoto,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => {
        completeProfile();
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <div>
      <nav className="navbar-complete-form">Winners never Quit, Quitters never win</nav>

      <div className="complete-profile-form-container">
        <button
          className="complete-profile-cancel-button"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
        <div className="complete-profile-form">
          <h2 className="complete-profile-form-title">Contact Details</h2>
          <div className="complete-profile-form-group">
            <h3 className="complete-profile-form-label">Full Name:</h3>
            <input
              type="text"
              className="complete-profile-form-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="complete-profile-form-group">
            <h3 className="complete-profile-form-label">Profile Photo URL:</h3>
            <input
              type="url"
              className="complete-profile-form-input"
              value={profilePhoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
              required
            />
          </div>
          <button
            className="complete-profile-form-button"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
