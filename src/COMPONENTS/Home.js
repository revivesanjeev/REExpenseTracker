import React from "react";
import { useNavigate } from "react-router-dom";
import Expenseform from "./Expenseform";
import "./Home.css"; 

function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/complete");
  };

  return (
    <div>
      <h2>You are on the home page</h2>
      <button onClick={handleNavigate}>Your profile is incomplete</button>

      <div className="expense-form-container">
        <Expenseform />
      </div>
    </div>
  );
}

export default Home;
