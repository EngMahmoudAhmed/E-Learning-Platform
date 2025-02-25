import React, { useState } from "react";
import { Helmet } from "react-helmet";
import api from "../../config/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bars } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { IoArrowUndo } from "react-icons/io5";

export default function AddAdmin() {
  // Navigate to Dashboard
  const navigate = useNavigate();

  // Loading State
  const [isLoading, setisLoading] = useState(false);

  // Fetch Api Data
  async function submitAdmin(values) {
    try {
      setisLoading(true);
      let { data } = await api.post(`/api/admin/add-admin`, values);
      toast.success(`تم اضافة المسؤول بنجاح`);
      console.log(data.type);
      setisLoading(false);
      navigate("/admins");
    } catch (error) {
      setisLoading(false);
      if (
        error.response &&
        error.response.data.message === "هذا المستخدم موجود بالفعل"
      ) {
        toast.warning("المستخدم موجود بالفعل!");
      } else {
        toast.error("حدث خطأ أثناء إضافة المسؤول!");
      }
    }
  }

  // Validation Schema
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
      .required("كلمه المرور مطلوبة"),
    role: Yup.string().required("الدور مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      role: "",
    },
    validationSchema,
    onSubmit: submitAdmin,
  });

  // Check if loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>اضافة مسؤول</title>
      </Helmet>

      <section className="my-5 py-4 add-admin">
        <div className="container mt-3">
          <div className="d-flex justify-content-between align-items-center my-3">
            <h4 className="fw-bold dash-header">إضافة مسؤؤل جديد :</h4>
            <Link to={"/admin-dashboard"} className="redirect-link">
              <button className="btn px-4 rounded-0 fs-6">
                الرجوع الى لوحه التحكم{" "}
                <IoArrowUndo size={18} className="mx-2" />
              </button>
            </Link>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="row mb-3">
              {/* رقم الهاتف */}
              <div className="col-md-6">
                <label htmlFor="userName" className="form-label fw-bold">
                  رقم الهاتف :
                </label>
                <input
                  className="form-control mb-3"
                  placeholder="أدخل رقم الهاتف"
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
              {/* كلمه المرور */}
              <div className="col-md-6">
                <label htmlFor="password" className="form-label fw-bold">
                  كلمة المرور :
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="أدخل كلمة المرور"
                  style={{ textAlign: "right", direction: "rtl" }}
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
            </div>

            {/* الدور */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="role" className="form-label fw-bold">
                  الدور :
                </label>
                <select
                  id="role"
                  name="role"
                  className="form-select"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" disabled hidden>
                    اختر الدور
                  </option>
                  <option value="admin">مسؤول ادارة</option>
                  <option value="user">مسؤول الطلاب</option>
                  <option value="exams">مسؤول امتحانات</option>
                </select>
                {formik.errors.role && formik.touched.role ? (
                  <div className="alert alert-danger p-2 my-2 rounded-0">
                    {formik.errors.role}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn rounded-0 d-flex justify-content-center"
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
                "اضافة المسؤول"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
