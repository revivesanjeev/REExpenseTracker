import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import "./App.css";
import Home from "./COMPONENTS/Home";
import Login from "./COMPONENTS/Login";
import Signup from "./COMPONENTS/Sign-up";
import { AuthContext } from "./COMPONENTS/AuthContext";
import { useContext } from "react";
import MainNavigate from "./COMPONENTS/MainNavigate"
import CompleteProfile from "./COMPONENTS/CompleteProfile";
import ForgotPassword from "./COMPONENTS/ForgetPasswordHandler";

function App() {
  const { IsLoggedIn,oncomplete } = useContext(AuthContext);

 
  return (
    <Router>
      {IsLoggedIn && !oncomplete ? <CompleteProfile /> : <MainNavigate />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/complete" element={<CompleteProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
