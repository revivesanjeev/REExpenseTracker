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
    const userId = JSON.parse(atob(token.split(".")[1])).user_id;
    setUserId(userId);

    fetch(
      `https://reexpensetracker-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // Check if data is not null
          setFullName(data.fullName || "");
          setProfilePhoto(data.profilePhoto || "");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [token]);

  const handleUpdate = () => {
    fetch(
      `https://reexpensetracker-default-rtdb.firebaseio.com/users/${userId}.json?auth=${token}`,
      {
        method: "PATCH",//using patch to update the data assuming that database accept the data if resource is not available in database
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
      <nav className="navbar" style={{ color: "white" }}>
        Winners never Quit, Quitters never win
      </nav>
 
      <div className="form-container">
        <button className="cancel-button" onClick={() => navigate("/")}>
          Cancel
        </button>
        <div className="form">
          <h2>Contact Details</h2>
          <h3>Full Name:</h3>
          <input
            type="text"
            className="input-field"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <h3>Profile Photo URL:</h3>
          <input
            type="url"
            className="input-field"
            value={profilePhoto}
            onChange={(e) => setProfilePhoto(e.target.value)}
            required
          />
          <button className="update-button" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
