import React from "react";
import { Helmet } from "react-helmet";

export default function Grades() {
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>الملخصات</title>
      </Helmet>

      <section className="my-5 py-3">
        <h5 className="fw-bold m-3">درجات الامتحانات</h5>
        <div className="container">
          <div className="row">
            <div className="col-md-12"></div>
          </div>
        </div>
      </section>
    </>
  );
}
