import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  oncomplete: false,
  isLoggedIn: false,
  login: () => {},
  completeProfile: () => {},
});

export const AuthProvider = ({ children }) => {
    const initialToken = localStorage.getItem("token");
      const [token, setToken] = useState(initialToken);
      const userIsLoggedIn = !!token;

    const [oncomplete,setOncomplete]=useState(false);

const loginHandler = (token) => {
  setToken(token);
  localStorage.setItem("token", token);
  setOncomplete(true);
};

 const completeProfileHandler = () => {
   setOncomplete(false);
 };

 const contextValue = {
   token: token,
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
