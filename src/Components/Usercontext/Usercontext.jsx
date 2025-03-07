import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({children}) { 
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));  
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(()=>{
   if(token == null) 
   {
    localStorage.removeItem("token")
    setIsLogin(false)
   }
  else{
    localStorage.setItem("token",token)
    setIsLogin(true);
  }

  
  },[token])

  return (
    <UserContext.Provider value={{ isLogin, setIsLogin, token, setToken }}>
      {children} 
    </UserContext.Provider>
  );
}
