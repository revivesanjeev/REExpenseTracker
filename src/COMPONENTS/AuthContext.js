import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: () => {},
});

export const AuthProvider = ({ children }) => {
    const initialToken = localStorage.getItem("token");
      const [token, setToken] = useState(initialToken);

      const userIsLoggedIn = !!token;



const loginHandler = (token) => {
  setToken(token);
  localStorage.setItem("token", token);
};



 const contextValue = {
   token: token,
   isLoggedIn: userIsLoggedIn,
   login: loginHandler,
 
 };


return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
