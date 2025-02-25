import React from "react";
import { Helmet } from "react-helmet";
import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import { FadeLeft, FadeUp, FadeRight } from "../../constants/animation";

export default function Summaries() {
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>الملخصات</title>
      </Helmet>

      <section className="summaries my-5 py-3">
        <motion.h5
          variants={FadeUp(0.1)}
          initial="hidden"
          animate="visible"
          className="fw-bold m-3 text-center"
        >
          ملخصات المراجعه النهائية
        </motion.h5>
        <div className="container">
          {/* قسم الابتدائية */}
          <div className="mb-5">
            <motion.h5
              variants={FadeLeft(0.3)}
              initial="hidden"
              animate="visible"
              className="fw-bold mb-4"
            >
              المرحلة الابتدائية :
            </motion.h5>
            <div className="row g-4">
              {/* الصف الرابع الابتدائى */}
              <motion.div
                variants={FadeUp(0.1)}
                initial="hidden"
                animate="visible"
                className="col-md-4"
              >
                <div className="card p-3 text-center">
                  <h6 className="mb-3 pb-3 fw-bold">الصف الرابع الابتدائى</h6>
                  <a href="/summaries/G4.pdf">
                    <button className="btn py-2 rounded-0 w-100">
                      قم بتحميل الملخص <FaDownload className="me-1" />
                    </button>
                  </a>
                </div>
              </motion.div>
              {/* الصف الخامس الابتدائى */}
              <motion.div
                variants={FadeUp(0.3)}
                initial="hidden"
                animate="visible"
                className="col-md-4"
              >
                <div className="card p-3 text-center">
                  <h6 className="mb-3 pb-3 fw-bold">الصف الخامس الابتدائى</h6>
                  <a href="/summaries/G5.pdf">
                    <button className="btn py-2 rounded-0 w-100">
                      قم بتحميل الملخص <FaDownload className="me-1" />
                    </button>
                  </a>
                </div>
              </motion.div>
              {/* الصف السادس الابتدائى */}
              <motion.div
                variants={FadeUp(0.5)}
                initial="hidden"
                animate="visible"
                className="col-md-4"
              >
                <div className="card p-3 text-center">
                  <h6 className="mb-3 pb-3 fw-bold">الصف السادس الابتدائى</h6>
                  <a href="/summaries/G6.pdf">
                    <button className="btn py-2 rounded-0 w-100">
                      قم بتحميل الملخص <FaDownload className="me-1" />
                    </button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* قسم الاعدادية */}
          <div className="mb-5">
            <motion.h5
              variants={FadeLeft(0.3)}
              initial="hidden"
              animate="visible"
              className="fw-bold mb-4"
            >
              المرحلة الاعدادية :
            </motion.h5>
            <div className="row g-4">
              {/* الصف الثانى الاعدادى  */}
              <motion.div
                variants={FadeUp(0.7)}
                initial="hidden"
                animate="visible"
                className="col-md-4"
              >
                <div className="card p-3 text-center">
                  <h6 className="mb-3 pb-3 fw-bold">الصف الثانى الاعدادى </h6>
                  <a href="/summaries/G8.pdf">
                    <button className="btn py-2 rounded-0 w-100">
                      قم بتحميل الملخص <FaDownload className="me-1" />
                    </button>
                  </a>
                </div>
              </motion.div>
              {/* الصف الثالث الاعدادى  */}
              <motion.div
                variants={FadeUp(0.9)}
                initial="hidden"
                animate="visible"
                className="col-md-4"
              >
                <div className="card p-3 text-center">
                  <h6 className="mb-3 pb-3 fw-bold">الصف الثالث الاعدادى</h6>
                  <a href="/summaries/G9.pdf">
                    <button className="btn py-2 rounded-0 w-100">
                      قم بتحميل الملخص <FaDownload className="me-1" />
                    </button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
