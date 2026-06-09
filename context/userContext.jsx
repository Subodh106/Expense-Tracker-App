"use client"
import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [username, setUsername] = useState("");
 
return (
    <UserContext.Provider value={{username , setUsername}}>
        {children}
    </UserContext.Provider>
)
}

export function useUser(){
    return useContext(UserContext);
}