import React from "react";
import { useNavigate } from "react-router-dom";
import Expenseform from "./Expenseform";
import "./Home.css"; // Import the consolidated CSS file

function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/complete");
  };

  return (
    <div className="home-container">
      <h2 className="home-heading">You are on the home page</h2>
      <button className="home-button" onClick={handleNavigate}>
        Your profile is incomplete
      </button>

      <div className="expense-form-container">
        <Expenseform />
      </div>
    </div>
  );
}

export default Home;
