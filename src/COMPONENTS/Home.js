import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/complete");
  };

  return (
    <div>
      You are on the home page
      <button onClick={handleNavigate}>Your profile is incomplete</button>
    </div>
  );
}

export default Home;
