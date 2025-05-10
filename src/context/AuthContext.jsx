import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAdminId, setisAdminId] = useState(
    sessionStorage.getItem("OneAdmin")
  );
  const [adminRole, setAdminRole] = useState(
    sessionStorage.getItem("AdminRole")
  );

  const [adminToken, setAdminToken] = useState(
    sessionStorage.getItem("AdminTokenExpire")
  );
  // Exam Id
  const [examId, setExamId] = useState(null);

  // Student Id
  const [studentCode, setStudentCode] = useState(null);

  // Get Role and Id after login directly
  useEffect(() => {
    const storedAdminId = sessionStorage.getItem("OneAdmin");
    const storedAdminRole = sessionStorage.getItem("AdminRole");
    const storedAdminToken = sessionStorage.getItem("AdminTokenExpire");

    if (storedAdminId !== isAdminId) setisAdminId(storedAdminId);
    if (storedAdminRole !== adminRole) setAdminRole(storedAdminRole);
    if (storedAdminToken !== adminToken) setAdminToken(storedAdminToken);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAdminId,
        setisAdminId,
        adminRole,
        setAdminRole,
        examId,
        setExamId,
        studentCode,
        setStudentCode,
        adminToken,
        setAdminToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
