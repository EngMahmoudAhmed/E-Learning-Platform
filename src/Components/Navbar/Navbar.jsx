import React from "react";
import { CgSoftwareDownload } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();

  // Admin Logout
  function handleAdminLogout() {
    sessionStorage.removeItem("AdminLogin");
    sessionStorage.removeItem("AdminRole");
    navigate("/admin-login");
  }

  // Student Logout
  function handleStudentLogout() {
    sessionStorage.removeItem("GradesCode");
    navigate("/grades-login");
  }

  // Check if AdminLogin exists in sessionStorage
  const isAdminLoggedIn = sessionStorage.getItem("AdminLogin");

  // Check if GradesCode exists in sessionStorage
  const isStudentLoggedIn = sessionStorage.getItem("GradesCode");

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="navbar navbar-expand-sm navbar-light bg-light fixed-top shadow-sm"
    >
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">م/ محمود العزونى</span>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" activeclassname="active">
                الرئيسية
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/about"
              >
                عن الأستاذ محمود العزونى
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/students-options"
              >
                اختبارات المنصة
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link ms-2"
                activeclassname="active"
                to="/summaries"
              >
                ملخصات نصية <CgSoftwareDownload size={25} />
              </NavLink>
            </li>

            {/* Show Admin Logout Button if Admin is Logged In */}
            {isAdminLoggedIn && (
              <li className="nav-item">
                <button
                  className="nav-link main-bg text-white ms-2"
                  onClick={handleAdminLogout}
                >
                  تسجيل الخروج <TbLogout2 size={25} />
                </button>
              </li>
            )}

            {/* Show Student Logout Button if Student is Logged In */}
            {isStudentLoggedIn && (
              <li className="nav-item">
                <button
                  className="nav-link main-bg text-white"
                  onClick={handleStudentLogout}
                >
                  تسجيل الخروج <TbLogout2 size={25} />
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}
