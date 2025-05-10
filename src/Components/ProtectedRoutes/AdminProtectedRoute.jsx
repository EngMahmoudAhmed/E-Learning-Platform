import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoutes({ children }) {
  return sessionStorage.getItem("AdminLogin") === "true" ? (
    children
  ) : (
    <Navigate to="/admin-login" />
  );
}
