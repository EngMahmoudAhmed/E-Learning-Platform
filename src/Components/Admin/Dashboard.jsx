import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  // useEffect(() => {
  //   window.history.pushState(null, "", window.location.href);
  //   window.onpopstate = () => {
  //     window.history.pushState(null, "", window.location.href);
  //   };
  // }, []);
  // Admin Role From Context
  const { adminRole, setAdminRole } = useContext(AuthContext);

  // Role State
  const [role, setRole] = useState(adminRole);

  useEffect(() => {
    const storedRole = sessionStorage.getItem("AdminRole");
    if (storedRole !== role) {
      setRole(storedRole);
      setAdminRole(storedRole);
    }
  }, [adminRole]);

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>لوحة التحكم</title>
      </Helmet>

      <section className="my-4 dashboard">
        <div className="container my-5 py-2">
          <h3 className="text-center fw-bold mb-3 pb-3">لوحة التحكم المسؤول</h3>

          {/* Display all sections if the role is "super_admin" */}
          {adminRole === "super_admin" && (
            <>
              {/* قسم الطلاب */}
              <div className="mb-5">
                <h4 className="fw-bold mb-4">الطلاب :</h4>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card p-3 text-center">
                      <h6 className="mb-3 pb-3 fw-bold">إضافة طالب</h6>
                      <Link to="/add-student" className="btn rounded-0 w-100">
                        انتقل الى <FaArrowLeft className="ms-2" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card p-3 text-center">
                      <h6 className="mb-3 pb-3 fw-bold">جميع الطلاب</h6>
                      <Link to="/students" className="btn rounded-0 w-100">
                        انتقل الى <FaArrowLeft className="ms-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* قسم الإدارة */}
              <div className="mb-5">
                <h4 className="fw-bold mb-4">الإدارة :</h4>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card p-3 text-center">
                      <h6 className="mb-3 pb-3 fw-bold">إضافة مسؤول</h6>
                      <Link to="/add-admin" className="btn rounded-0 w-100">
                        انتقل الى <FaArrowLeft className="ms-2" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card p-3 text-center">
                      <h6 className="mb-3 pb-3 fw-bold">جميع المسؤولين</h6>
                      <Link to="/admins" className="btn rounded-0 w-100">
                        انتقل الى <FaArrowLeft className="ms-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* قسم الامتحانات */}
              <div className="mb-5">
                <h4 className="fw-bold mb-4">الامتحانات :</h4>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="card p-3 text-center">
                      <h6 className="mb-3 pb-3 fw-bold">إضافة امتحان</h6>
                      <Link to="/add-exam" className="btn rounded-0 w-100">
                        انتقل الى <FaArrowLeft className="ms-2" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card p-3 text-center">
                      <h6 className="mb-3 pb-3 fw-bold">جميع الامتحانات</h6>
                      <Link to="/all-exams" className="btn rounded-0 w-100">
                        انتقل الى <FaArrowLeft className="ms-2" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card p-3 text-center">
                      <h6 className="mb-3 pb-3 fw-bold">درجات الطلاب</h6>
                      <Link
                        to="/student-grades"
                        className="btn rounded-0 w-100"
                      >
                        انتقل الى <FaArrowLeft className="ms-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Display sections based on role */}
          {adminRole === "admin" && (
            <div className="mb-5">
              <h4 className="fw-bold mb-4">الإدارة :</h4>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card p-3 text-center">
                    <h6 className="mb-3 pb-3 fw-bold">إضافة مسؤول</h6>
                    <Link to="/add-admin" className="btn rounded-0 w-100">
                      انتقل الى <FaArrowLeft className="ms-2" />
                    </Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card p-3 text-center">
                    <h6 className="mb-3 pb-3 fw-bold">جميع المسؤولين</h6>
                    <Link to="/admins" className="btn rounded-0 w-100">
                      انتقل الى <FaArrowLeft className="ms-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {adminRole === "exams" && (
            <div className="mb-5">
              <h4 className="fw-bold mb-4">الامتحانات :</h4>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card p-3 text-center">
                    <h6 className="mb-3 pb-3 fw-bold">إضافة امتحان</h6>
                    <Link to="/add-exam" className="btn rounded-0 w-100">
                      انتقل الى <FaArrowLeft className="ms-2" />
                    </Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card p-3 text-center">
                    <h6 className="mb-3 pb-3 fw-bold">جميع الامتحانات</h6>
                    <Link to="/all-exams" className="btn rounded-0 w-100">
                      انتقل الى <FaArrowLeft className="ms-2" />
                    </Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card p-3 text-center">
                    <h6 className="mb-3 pb-3 fw-bold">درجات الطلاب</h6>
                    <Link to="/student-grades" className="btn rounded-0 w-100">
                      انتقل الى <FaArrowLeft className="ms-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {adminRole === "user" && (
            <div className="mb-5 mt-4">
              <h4 className="fw-bold mb-4">الطلاب :</h4>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card p-3 text-center">
                    <h6 className="mb-3 pb-3 fw-bold">إضافة طالب</h6>
                    <Link to="/add-student" className="btn rounded-0 w-100">
                      انتقل الى <FaArrowLeft className="ms-2" />
                    </Link>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card p-3 text-center">
                    <h6 className="mb-3 pb-3 fw-bold">جميع الطلاب</h6>
                    <Link to="/students" className="btn rounded-0 w-100">
                      انتقل الى <FaArrowLeft className="ms-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
