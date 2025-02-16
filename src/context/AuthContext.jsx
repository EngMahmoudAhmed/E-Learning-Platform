import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAdminId, setisAdminId] = useState(sessionStorage.getItem("OneAdmin"));
  const [adminRole, setAdminRole] = useState(sessionStorage.getItem("AdminRole"));
  
  // Get Role and Id after login directly 
  useEffect(() => {
    const storedAdminId = sessionStorage.getItem("OneAdmin");
    const storedAdminRole = sessionStorage.getItem("AdminRole");

    if (storedAdminId !== isAdminId) setisAdminId(storedAdminId);
    if (storedAdminRole !== adminRole) setAdminRole(storedAdminRole);
  }, []); 

  return (
    <AuthContext.Provider value={{ isAdminId, setisAdminId, adminRole, setAdminRole }}>
      {children}
    </AuthContext.Provider>
  );
}
