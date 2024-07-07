import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./COMPONENTS/Home";
import Login from "./COMPONENTS/Login";
import Signup from "./COMPONENTS/Sign-up";
import { AuthContext } from "./COMPONENTS/AuthContext";
import { useContext } from "react";
import MainNavigate from "./COMPONENTS/MainNavigate"

function App() {
  const { IsLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <MainNavigate />
      <Routes>
        <Route path="/" element={<Home />} />
       
          <Route path="/login" element={<Login />} />
      
          <Route path="/signup" element={<Signup />} />
        
      </Routes>
    </Router>
  );
}

export default App;
