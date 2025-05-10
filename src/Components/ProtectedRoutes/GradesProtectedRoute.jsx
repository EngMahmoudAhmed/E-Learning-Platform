import React from "react";
import { Navigate } from "react-router-dom";

export default function GradesProtectedRoute({ children }) {
  return sessionStorage.getItem("GradesCode") ? (
    children
  ) : (
    <Navigate to="/grades-login" />
  );
}
