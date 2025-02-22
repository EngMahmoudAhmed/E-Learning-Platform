import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";

// User
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Exam from "./Components/Exam/Exam";
import Summaries from "./Components/Summaries/Summaries";
import StudentsOptions from "./Components/Exam/StudentsOptions";
import ExamLogin from "./Components/Exam/ExamLogin";
import GradesLogin from "./Components/Exam/GradesLogin";
import Grades from "./Components/Exam/Grades";
import GradeDetails from "./Components/Exam/GradeDetails";

// Admin
import AdminLogin from "./Components/Admin/login";
import AdminDashboard from "./Components/Admin/Dashboard";
import AddStudent from "./Components/Admin/AddStudent";
import Students from "./Components/Admin/Students";
import AddAdmin from "./Components/Admin/AddAdmin";
import Admins from "./Components/Admin/Admins";
import AddExam from "./Components/Admin/AddExam";
import AllExams from "./Components/Admin/AllExams";
import StudentsGrades from "./Components/Admin/StudentGrades";
import ExamDetails from "./Components/Admin/ExamDetails";
import ExamDegrees from "./Components/Admin/ExamDegrees";
import ExamDegreesDetails from "./Components/Admin/ExamDegreesDetails";

// Protected Route
import AdminProtectedRoute from "./Components/ProtectedRoutes/AdminProtectedRoute";
import ExamProtectedRoute from "./Components/ProtectedRoutes/ExamProtectedRoute";
import GradesProtectedRoute from "./Components/ProtectedRoutes/GradesProtectedRoute";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        // User
        { index: true, element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/summaries", element: <Summaries /> },
        { path: "/students-options", element: <StudentsOptions /> },
        { path: "/exam-login", element: <ExamLogin /> },
        { path: "/grades-login", element: <GradesLogin /> },
        {
          path: "/exam",
          element: (
            <ExamProtectedRoute>
              <Exam />
            </ExamProtectedRoute>
          ),
        },
        {
          path: "/grades",
          element: (
            <GradesProtectedRoute>
              <Grades />
            </GradesProtectedRoute>
          ),
        },
        {
          path: "/grades-details",
          element: (
            <GradesProtectedRoute>
              <GradeDetails />
            </GradesProtectedRoute>
          ),
        },

        // Admin
        { path: "/admin-login", element: <AdminLogin /> },
        {
          path: "/admin-dashboard",
          element: (
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/add-student",
          element: (
            <AdminProtectedRoute>
              <AddStudent />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/students",
          element: (
            <AdminProtectedRoute>
              <Students />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/add-admin",
          element: (
            <AdminProtectedRoute>
              <AddAdmin />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/admins",
          element: (
            <AdminProtectedRoute>
              <Admins />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/add-exam",
          element: (
            <AdminProtectedRoute>
              <AddExam />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/all-exams",
          element: (
            <AdminProtectedRoute>
              <AllExams />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/exam-details",
          element: (
            <AdminProtectedRoute>
              <ExamDetails />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/student-grades",
          element: (
            <AdminProtectedRoute>
              <StudentsGrades />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/exam-degrees",
          element: (
            <AdminProtectedRoute>
              <ExamDegrees />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/exam-degrees-details",
          element: (
            <AdminProtectedRoute>
              <ExamDegreesDetails />
            </AdminProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}
