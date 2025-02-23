import React, { useState } from "react";
import { Helmet } from "react-helmet";
import api from "../../config/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

export default function ExamLogin() {
  // Navigate to Exam
  const navigate = useNavigate();

  // Loading State
  const [isLoading, setisLoading] = useState(false);

  // Fetch Api Data
  async function submitLogin(values) {
    try {
      setisLoading(true);
      let { data } = await api.post(`/api/exam/login-to-exam`, values);
      sessionStorage.setItem("StudentCode", data.data.studentCode);
      sessionStorage.setItem("ExamCode", data.data.examCode);
      setisLoading(false);
      navigate("/exam");
    } catch (error) {
      setisLoading(false);
      if (
        error.response &&
        error.response.data.message.includes("معاد الامتحان")
      ) {
        toast.warning("لم يبدأ الامتحان بعد تأكد من وقت الامتحان!");
      } else {
        toast.error("حدث خطأ أثناء تسجيل الدخول!");
      }
    }
  }

  // Validation Schema
  let validationSchema = Yup.object({
    studentCode: Yup.string().required("كود الطالب مطلوب"),
    examCode: Yup.string().required("كود الامتحان مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      studentCode: "",
      examCode: "",
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
        <title>تسجيل دخول الامتحان</title>
      </Helmet>

      <section className="login">
        <div className="container my-5 py-5">
          <div className="row justify-content-center p-3 my-4">
            <div className="col-md-6 p-4 shadow-sm">
              <h3 className="text-center mb-4">تسجيل الدخول للامتحان</h3>
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
                <div className="mb-3">
                  <label htmlFor="examCode" className="form-label fw-bold">
                    كود الامتحان :
                  </label>
                  <input
                    className="form-control"
                    placeholder="أدخل كود الامتحان"
                    id="examCode"
                    name="examCode"
                    value={formik.values.examCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.examCode && formik.touched.examCode ? (
                    <div className="alert alert-danger p-2 my-2 rounded-0">
                      {formik.errors.examCode}
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
