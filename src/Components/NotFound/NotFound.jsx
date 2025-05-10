import React from "react";
import Error from "../../assets/error404.webp";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaArrowRotateLeft } from "react-icons/fa6";

export default function NotFound() {
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>الصفحة غير موجودة</title>
      </Helmet>

      <section className="not-found py-5 d-flex align-items-center justify-content-center">
        <div className="container text-center mt-4">
          <img
            src={Error}
            alt="خطأ 404"
            className="error-image img-fluid"
            loading="lazy"
          />
          <h1 className="h4 my-4 text-danger fw-bold">
            عذرًا! الصفحة غير موجودة
          </h1>
          <p className="text-muted mb-4">
            يبدو أن الرابط الذي تحاول الوصول إليه غير صحيح أو غير متاح.
          </p>
          <Link to="/" className="btn px-4 py-2 shadow-sm">
            العودة إلى الصفحة الرئيسية
            <FaArrowRotateLeft className="me-2" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
