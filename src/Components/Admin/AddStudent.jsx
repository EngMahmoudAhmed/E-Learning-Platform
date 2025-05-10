import React, { useState } from "react";
import { Helmet } from "react-helmet";
import api from "../../config/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bars } from "react-loader-spinner";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { IoArrowUndo } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function AddStudent() {
  // Loading State
  const [isLoading, setisLoading] = useState(false);

  // Fetch Api Data
  async function submitStudent(values) {
    try {
      setisLoading(true);
      let { data } = await api.post(`/api/user/add-student`, values);
      toast.success(`تم إضافة الطالب بنجاح`);
      setisLoading(false);
      console.log(data.type);
    } catch (error) {
      setisLoading(false);
      if (
        error.response &&
        error.response.data.message.includes("E11000 duplicate key error")
      ) {
        toast.warning("رقم الهاتف مستخدم بالفعل! الرجاء استخدام رقم آخر.");
      } else {
        toast.error("حدث خطأ أثناء إضافة الطالب!");
      }
    }
  }

  // Validation Schema
  const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
  let validationSchema = Yup.object({
    name: Yup.string().required("اسم الطالب مطلوب"),
    grade: Yup.string().required("الصف مطلوب"),
    studentMobile: Yup.string()
      .matches(phoneRegex, "رقم الهاتف غير صالح، يجب أن يكون مصريًا")
      .required("رقم الهاتف مطلوب"),
    parentMobile: Yup.string()
      .matches(phoneRegex, "رقم الهاتف غير صالح، يجب أن يكون مصريًا")
      .required("رقم هاتف ولي الأمر مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      grade: "",
      studentMobile: "",
      parentMobile: "",
    },
    validationSchema,
    onSubmit: submitStudent,
  });

  // Check if loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>إضافة طالب</title>
      </Helmet>

      <section className="my-5 py-5 add-student">
        <div className="container mb-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-2 dash-header">إضافة طالب جديد :</h4>
            <Link to={"/admin-dashboard"} className="redirect-link">
              <button className="btn px-4 rounded-0 fs-6">
                الرجوع الى لوحه التحكم{" "}
                <IoArrowUndo size={18} className="mx-2" />
              </button>
            </Link>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="row mb-3">
              {/* اسم الطالب */}
              <div className="col-md-6">
                <label htmlFor="name" className="form-label fw-bold">
                  اسم الطالب :
                </label>
                <input
                  type="text"
                  className="form-control mb-3"
                  id="name"
                  placeholder="أدخل اسم الطالب"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ textAlign: "right", direction: "rtl" }}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="alert alert-danger p-2 my-2 rounded-0">
                    {formik.errors.name}
                  </div>
                ) : (
                  ""
                )}
              </div>

              {/* الصف */}
              <div className="col-md-6">
                <label htmlFor="grade" className="form-label fw-bold">
                  الصف :
                </label>
                <select
                  id="grade"
                  name="grade"
                  className="form-select"
                  value={formik.values.grade}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" disabled hidden>
                    اختر الصف
                  </option>
                  <optgroup label="المرحلة الابتدائية">
                    <option value="G4">الصف الرابع الابتدائي</option>
                    <option value="G5">الصف الخامس الابتدائي</option>
                    <option value="G6">الصف السادس الابتدائي</option>
                  </optgroup>
                  <optgroup label="المرحلة الإعدادية">
                    <option value="G7">الصف الأول الإعدادي</option>
                    <option value="G8">الصف الثاني الإعدادي</option>
                    <option value="G9">الصف الثالث الإعدادي</option>
                  </optgroup>
                  <optgroup label="المرحلة الثانوية">
                    <option value="G10">الصف الأول الثانوي</option>
                    <option value="G11">الصف الثاني الثانوي</option>
                    <option value="G12">الصف الثالث الثانوي</option>
                  </optgroup>
                </select>
                {formik.errors.grade && formik.touched.grade ? (
                  <div className="alert alert-danger p-2 my-3 rounded-0">
                    {formik.errors.grade}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="row mb-3">
              {/* رقم هاتف الطالب */}
              <div className="col-md-6">
                <label htmlFor="studentMobile" className="form-label fw-bold">
                  رقم الهاتف :
                </label>
                <input
                  type="tel"
                  className="form-control mb-3"
                  id="studentMobile"
                  placeholder="أدخل رقم هاتف الطالب"
                  value={formik.values.studentMobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ textAlign: "right", direction: "rtl" }}
                />
                {formik.errors.studentMobile && formik.touched.studentMobile ? (
                  <div className="alert alert-danger p-2 my-3 rounded-0">
                    {formik.errors.studentMobile}
                  </div>
                ) : (
                  ""
                )}
              </div>

              {/* رقم هاتف ولي الأمر */}
              <div className="col-md-6">
                <label htmlFor="parentMobile" className="form-label fw-bold">
                  رقم هاتف ولي الأمر :
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="parentMobile"
                  placeholder="أدخل رقم هاتف ولي الأمر"
                  value={formik.values.parentMobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ textAlign: "right", direction: "rtl" }}
                />
                {formik.errors.parentMobile && formik.touched.parentMobile ? (
                  <div className="alert alert-danger p-2 my-3 rounded-0">
                    {formik.errors.parentMobile}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn mt-3 py-2 rounded-0"
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
                "إضافة الطالب"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
