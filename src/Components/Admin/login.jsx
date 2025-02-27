import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import api from "../../config/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  // Navigate to Dashboard
  const navigate = useNavigate();

  // Save token expire
  const { setAdminToken } = useContext(AuthContext);

  // Loading State
  const [isLoading, setisLoading] = useState(false);

  // Fetch Api Data
  async function submitLogin(values) {
    try {
      setisLoading(true);
      let { data } = await api.post(`/api/admin/login`, values);
      toast.success(`تم تسجيل الدخول بنجاح`);
      sessionStorage.setItem("AdminLogin", data.data.admin);
      sessionStorage.setItem("AdminRole", data.data.role);
      const expiryTime = new Date().getTime() + 2 * 60 * 60 * 1000;
      sessionStorage.setItem("AdminTokenExpire", expiryTime);
      setAdminToken(expiryTime);
      setisLoading(false);
      navigate("/admin-dashboard");
    } catch (error) {
      toast.error(`حدث خطأ أثناء تسجيل الدخول!`);
      setisLoading(false);
    }
  }

  //Validation Schema
  const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;

  let validationSchema = Yup.object({
    userName: Yup.string()
      .matches(phoneRegex, "رقم الهاتف غير صالح، يجب أن يكون مصريًا")
      .required("رقم الهاتف مطلوب"),

    password: Yup.string()
      .matches(
        passwordRegex,
        "كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، وحرف خاص، ولا تقل عن 6 أحرف"
      )
      .required("كلمة المرور مطلوبة"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });

  // Check if is loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>تسجيل دخول المسؤول</title>
      </Helmet>

      <section className="login">
        <div className="container my-5 py-5">
          <div className="row justify-content-center p-3 my-4">
            <div className="col-md-6 p-4 shadow-sm">
              <h3 className="text-center mb-4">تسجيل الدخول</h3>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label fw-bold">
                    رقم الهاتف :
                  </label>
                  <input
                    className="form-control"
                    placeholder="أدخل رقم هاتفك"
                    style={{ textAlign: "right", direction: "rtl" }}
                    id="userName"
                    name="userName"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.userName && formik.touched.userName ? (
                    <div className="alert alert-danger p-2 my-2 rounded-0">
                      {formik.errors.userName}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-bold">
                    كلمة المرور :
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="أدخل كلمة المرور"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className="alert alert-danger p-2 my-2 rounded-0">
                      {formik.errors.password}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <button
                  type="submit"
                  className="btn rounded-0 w-100 d-flex justify-content-center"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  {isLoading ? (
                    <Bars
                      height="20"
                      width="50"
                      color="#fff"
                      ariaLabel="bars-loading"
                      visible={true}
                    />
                  ) : (
                    "تسجيل الدخول"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
