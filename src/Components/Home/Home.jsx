import React from "react";
import Hero from "../../assets/p4.webp";
import { Helmet } from "react-helmet";
import Features from "./Features";
import History from "./History";
import AcademicYears from "./AcademicYears";
import { motion } from "framer-motion";
import { FadeLeft, FadeUp } from "../../constants/animation";
import { FadeRight } from "../../constants/animation";

export default function Home() {
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>الرئيسية</title>
      </Helmet>

      {/* Hero */}
      <section className="py-3 position-relative">
        <div className="container my-5 py-4">
          <div className="row pt-5">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <motion.img
                variants={FadeLeft(0.7)}
                initial="hidden"
                animate="visible"
                src={Hero}
                alt="Mr/Mahmoud"
                className="hero shadow-lg rounded-circle"
              />
            </div>

            <div className="col-md-6">
              <div className="py-5 mt-3 text-center">
                <motion.h3
                  variants={FadeUp(0.5)}
                  initial="hidden"
                  animate="visible"
                  className="fw-bolder grey-color main-head"
                >
                  م/محمود ابراهيم العزونى
                </motion.h3>
                <motion.p
                  variants={FadeUp(0.7)}
                  initial="hidden"
                  animate="visible"
                  className="pt-4 pb-4 fw-bold hero-p"
                >
                  منصة تعليمية تسعي دائما لجعلك من المتفوقين وتهتم بتقديم أفضل
                  محتوي ومنهج دراسة بأساليب مبتكرة وتتميز بطريقة شرح تسعي الي
                  الوصول لكل مستويات الطالب مع متابعة مستمرة
                </motion.p>
                <motion.button
                  variants={FadeRight(0.9)}
                  initial="hidden"
                  animate="visible"
                  to={"/"}
                  className="btn px-4 py-2 rounded-0 fw-bold"
                >
                  ابدأ رحلتك الأن
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Features />

      {/* History */}
      <History />

      {/* AcademicYears */}
      <AcademicYears />
    </>
  );
}
