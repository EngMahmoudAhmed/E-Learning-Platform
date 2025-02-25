import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FadeLeft, FadeUp, FadeRight } from "../../constants/animation";

export default function StudentsOptions() {
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>الملخصات</title>
      </Helmet>

      <section className="my-5 py-4 summaries">
        <motion.h5
          variants={FadeUp(0.1)}
          initial="hidden"
          animate="visible"
          className="fw-bold mt-2 text-center"
        >
          داخل تمتحن ولا هتشوف درجات الامتحان !
        </motion.h5>
        <div className="container mt-5">
          <div className="row justify-content-center gap-2">
            <motion.div
              variants={FadeLeft(0.3)}
              initial="hidden"
              animate="visible"
              className="col-md-4"
            >
              <div className="card p-3 text-center">
                <h6 className="mb-3 pb-3 fw-bold">جاهز للامتحان يا بطل !</h6>
                <Link to={"/exam-login"}>
                  <button className="btn py-2 rounded-0 w-100">
                    لو جاهز دوس
                  </button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              variants={FadeLeft(0.6)}
              initial="hidden"
              animate="visible"
              className="col-md-4"
            >
              <div className="card p-3 text-center">
                <h6 className="mb-3 pb-3 fw-bold">حابب تشوف نتيجتك !</h6>
                <Link to={"/grades-login"}>
                  <button className="btn py-2 rounded-0 w-100">
                    لو جاهز دوس
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
