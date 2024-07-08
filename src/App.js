import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import "./App.css";
import Home from "./COMPONENTS/Home";
import Login from "./COMPONENTS/Login";
import Signup from "./COMPONENTS/Sign-up";
import { AuthContext } from "./COMPONENTS/AuthContext";
import { useContext } from "react";
import MainNavigate from "./COMPONENTS/MainNavigate"
import CompleteProfile from "./COMPONENTS/CompleteProfile";

function App() {
  const { IsLoggedIn,oncomplete } = useContext(AuthContext);

   async function handleSubmitForm(dataofform) {
     await fetch(
       "https://reexpensetracker-default-rtdb.firebaseio.com///Completeprofile.json",
       {
         method: "POST",
         body: JSON.stringify(dataofform),
         headers: {
           "Content-Type": "application/json",
         },
       }
     );
   }

  return (
    <Router>
      {IsLoggedIn && oncomplete ? <CompleteProfile /> : <MainNavigate />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/complete"
          element={<CompleteProfile onSubmit={handleSubmitForm} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
