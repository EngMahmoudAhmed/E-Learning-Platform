import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function StudentsOptions() {
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>الملخصات</title>
      </Helmet>

      <section className="my-5 py-4 summaries">
        <h5 className="fw-bold mt-2 text-center">
          داخل تمتحن ولا هتشوف درجات الامتحان !
        </h5>
        <div className="container mt-4">
          <div className="row justify-content-center gap-2">
            <div className="col-md-4">
              <div className="card p-3 text-center">
                <h6 className="mb-3 pb-3 fw-bold">جاهز للامتحان يا بطل !</h6>
                <Link to={"/exam-login"}>
                  <button className="btn py-2 rounded-0 w-100">
                    لو جاهز دوس
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 text-center">
                <h6 className="mb-3 pb-3 fw-bold">حابب تشوف نتيجتك !</h6>
                <Link to={"/grades-login"}>
                  <button className="btn py-2 rounded-0 w-100">
                    لو جاهز دوس
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
