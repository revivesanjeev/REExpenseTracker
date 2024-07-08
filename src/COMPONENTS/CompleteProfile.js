import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./CompleteProfile.css"

const CompleteProfile = (props) => {
  const { completeProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const handleUpdate = (event) => {

   event.preventDefault();
 const dataofform = {
   Name: fullName,
   URl:profilePhoto,
 
  
 };
 props.onSubmit(dataofform);
    completeProfile();
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar" style={{ color: "white" }}>
        Winners never Quit, Quitters never win
      </nav>

      <div className="form-container">
        <button className="cancel-button">Cancel</button>
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
