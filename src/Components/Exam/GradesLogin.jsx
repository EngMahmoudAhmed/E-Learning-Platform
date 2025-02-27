import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Api from "../../config/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { motion } from "framer-motion";
import { FadeUp } from "../../constants/animation";

export default function GradesLogin() {
  // Navigate to Grades
  const navigate = useNavigate();

  // Loading State
  const [isLoading, setisLoading] = useState(false);

  // Fetch Api Data
  async function submitLogin(values) {
    try {
      setisLoading(true);
      let { data } = await Api.post(`/api/exam/login-to-degrees`, values);
      toast.success(`تم تسجيل الدخول بنجاح`);
      sessionStorage.setItem("GradesCode", data.data.studentCode);
      setisLoading(false);
      navigate("/grades");
    } catch (error) {
      setisLoading(false);
      if (
        error.response &&
        error.response.data.message.includes("هذا الطالب")
      ) {
        toast.warning("الكود ليس صحيحا او الطالب غير موجود بالفعل!");
      } else {
        toast.error("حدث خطأ أثناء تسجيل الدخول!");
      }
    }
  }

  // Validation Schema
  let validationSchema = Yup.object({
    studentCode: Yup.string().required("كود الطالب مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      studentCode: "",
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
        <title>تسجيل دخول الدرجات</title>
      </Helmet>

      <section className="login">
        <div className="container my-5 py-5">
          <div className="row justify-content-center p-3 my-4">
            <motion.div
              variants={FadeUp(0.3)}
              initial="hidden"
              animate="visible"
              className="col-md-6 p-4 shadow-sm"
            >
              <h3 className="text-center mb-4">تسجيل الدخول للدرجات</h3>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="studentCode" className="form-label fw-bold">
                    كود الطالب :
                  </label>
                  <input
                    className="form-control"
                    placeholder="أدخل كود الطالب"
                    style={{ textAlign: "right", direction: "rtl" }}
                    id="studentCode"
                    name="studentCode"
                    value={formik.values.studentCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.studentCode && formik.touched.studentCode ? (
                    <div className="alert alert-danger p-2 my-2 rounded-0">
                      {formik.errors.studentCode}
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
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
