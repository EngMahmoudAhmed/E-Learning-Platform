import React from "react";
import { CgSoftwareDownload } from "react-icons/cg";
import { TbLogout2 } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  // Navigate
  const navigate = useNavigate();

  // Nav Links
  const navLinks = [
    { path: "/", label: "الرئيسية" },
    { path: "/about", label: "عن الأستاذ محمود العزونى" },
    { path: "/students-options", label: "اختبارات المنصة" },
  ];

  // Admin Logout
  function handleAdminLogout() {
    sessionStorage.removeItem("AdminLogin");
    sessionStorage.removeItem("AdminRole");
    navigate("/admin-login");
  }

  // Check if AdminLogin exists in sessionStorage
  const isAdminLoggedIn = sessionStorage.getItem("AdminLogin");

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm"
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
            {navLinks.map((link, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
                className="nav-item"
              >
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to={link.path}
                >
                  {link.label}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <motion.li
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 3 * 0.2 }}
              className="nav-item"
            >
              <NavLink
                className="nav-link ms-2"
                activeclassname="active"
                to="/summaries"
              >
                ملخصات نصية <CgSoftwareDownload size={25} />
              </NavLink>
            </motion.li>

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
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}
