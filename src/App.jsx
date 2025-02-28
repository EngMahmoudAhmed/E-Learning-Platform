import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout
import Layout from "./Components/Layout/Layout";
// Loading
import Loading from "./Components/Loading/Loading";

// Lazy load User components
const Home = React.lazy(() => import("./Components/Home/Home"));
const About = React.lazy(() => import("./Components/About/About"));
const Exam = React.lazy(() => import("./Components/Exam/Exam"));
const Summaries = React.lazy(() => import("./Components/Summaries/Summaries"));
const StudentsOptions = React.lazy(() =>
  import("./Components/Exam/StudentsOptions")
);
const ExamLogin = React.lazy(() => import("./Components/Exam/ExamLogin"));
const GradesLogin = React.lazy(() => import("./Components/Exam/GradesLogin"));
const Grades = React.lazy(() => import("./Components/Exam/Grades"));
const GradeDetails = React.lazy(() => import("./Components/Exam/GradeDetails"));

// Lazy load Admin components
const AdminLogin = React.lazy(() => import("./Components/Admin/login"));
const AdminDashboard = React.lazy(() => import("./Components/Admin/Dashboard"));
const AddStudent = React.lazy(() => import("./Components/Admin/AddStudent"));
const Students = React.lazy(() => import("./Components/Admin/Students"));
const AddAdmin = React.lazy(() => import("./Components/Admin/AddAdmin"));
const Admins = React.lazy(() => import("./Components/Admin/Admins"));
const AddExam = React.lazy(() => import("./Components/Admin/AddExam"));
const AllExams = React.lazy(() => import("./Components/Admin/AllExams"));
const StudentsGrades = React.lazy(() =>
  import("./Components/Admin/StudentGrades")
);
const ExamDetails = React.lazy(() => import("./Components/Admin/ExamDetails"));
const ExamDegrees = React.lazy(() => import("./Components/Admin/ExamDegrees"));
const ExamDegreesDetails = React.lazy(() =>
  import("./Components/Admin/ExamDegreesDetails")
);

// Protected Routes
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
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/about",
          element: (
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          ),
        },
        {
          path: "/summaries",
          element: (
            <Suspense fallback={<Loading />}>
              <Summaries />
            </Suspense>
          ),
        },
        {
          path: "/students-options",
          element: (
            <Suspense fallback={<Loading />}>
              <StudentsOptions />
            </Suspense>
          ),
        },
        {
          path: "/exam-login",
          element: (
            <Suspense fallback={<Loading />}>
              <ExamLogin />
            </Suspense>
          ),
        },
        {
          path: "/grades-login",
          element: (
            <Suspense fallback={<Loading />}>
              <GradesLogin />
            </Suspense>
          ),
        },
        {
          path: "/exam",
          element: (
            <Suspense fallback={<Loading />}>
              <ExamProtectedRoute>
                <Exam />
              </ExamProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/grades",
          element: (
            <Suspense fallback={<Loading />}>
              <GradesProtectedRoute>
                <Grades />
              </GradesProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/grades-details",
          element: (
            <Suspense fallback={<Loading />}>
              <GradesProtectedRoute>
                <GradeDetails />
              </GradesProtectedRoute>
            </Suspense>
          ),
        },

        // Admin
        {
          path: "/admin-login",
          element: (
            <Suspense fallback={<Loading />}>
              <AdminLogin />
            </Suspense>
          ),
        },
        {
          path: "/admin-dashboard",
          element: (
            <Suspense fallback={<Loading />}>
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/add-student",
          element: (
            <Suspense fallback={<Loading />}>
              <AdminProtectedRoute>
                <AddStudent />
              </AdminProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/students",
          element: (
            <Suspense fallback={<Loading />}>
              <AdminProtectedRoute>
                <Students />
              </AdminProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/add-admin",
          element: (
            <Suspense fallback={<Loading />}>
              <AdminProtectedRoute>
                <AddAdmin />
              </AdminProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/admins",
          element: (
            <Suspense fallback={<Loading />}>
              <AdminProtectedRoute>
                <Admins />
              </AdminProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/add-exam",
          element: (
            <Suspense fallback={<Loading />}>
              <AdminProtectedRoute>
                <AddExam />
              </AdminProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/all-exams",
          element: (
            <Suspense fallback={<Loading />}>
              <AdminProtectedRoute>
                <AllExams />
              </AdminProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/exam-details",
          element: (
            <Suspense fallback={<Loading />}>
              <AdminProtectedRoute>
                <ExamDetails />
              </AdminProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/student-grades",
          element: (
            <Suspense fallback={<Loading />}>
              <AdminProtectedRoute>
                <StudentsGrades />
              </AdminProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/exam-degrees",
          element: (
            <Suspense fallback={<Loading />}>
              <AdminProtectedRoute>
                <ExamDegrees />
              </AdminProtectedRoute>
            </Suspense>
          ),
        },
        {
          path: "/exam-degrees-details",
          element: (
            <Suspense fallback={<Loading />}>
              <AdminProtectedRoute>
                <ExamDegreesDetails />
              </AdminProtectedRoute>
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
