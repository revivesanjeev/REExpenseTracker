import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  oncomplete: false,
  isLoggedIn: false,
  login: (token) => {},
  completeProfile: () => {}
});

export const AuthProvider = ({ children }) => {
    const initialToken = localStorage.getItem("token");
      const [token, setToken] = useState(initialToken);
       const initialEmail = localStorage.getItem("email");
       const [email, setEmail] = useState(initialEmail);
      const userIsLoggedIn = !!token;

    const [oncomplete,setOncomplete]=useState(false);

const loginHandler = (token) => {
  setToken(token);
  setEmail(email);
  localStorage.setItem("token", token);
   localStorage.setItem("email", email);
  setOncomplete(true);
};

 const completeProfileHandler = () => {
   setOncomplete(false);
 };

 const contextValue = {
   token: token,
   email: email,
   isLoggedIn: userIsLoggedIn,
   login: loginHandler,
   oncomplete: oncomplete,
   completeProfile: completeProfileHandler,
 };


return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
