import React from "react";
import { Navigate } from "react-router-dom";

export default function ExamProtectedRoute({ children }) {
  return sessionStorage.getItem("StudentCode") &&
    sessionStorage.getItem("ExamCode") ? (
    children
  ) : (
    <Navigate to="/exam-login" />
  );
}
