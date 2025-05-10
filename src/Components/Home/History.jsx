import React from "react";
import Ezo from "../../assets/history.webp";
import { motion } from "framer-motion";
import { FadeLeft, FadeUp, FadeRight } from "../../constants/animation";

export default function History() {
  return (
    <section className="my-5 history">
      <div className="container overflow-hidden">
        <div className="row g-5">
          {/* Hero */}
          <motion.div
            className="col-md-6 d-flex justify-content-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={FadeLeft(1 * 0.1)}
          >
            <img src={Ezo} alt="م/محمود العزونى" className="ezo" />
          </motion.div>

          {/* Content */}
          <motion.div
            className="col-md-6 historic"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={FadeRight(0.1)}
          >
            <motion.h1 className="mt-3" variants={FadeRight(0.3)}>
              تاريخك هنا
            </motion.h1>

            <motion.p className="fw-bold pt-4" variants={FadeUp(0.5)}>
              مستر محمود العزونى مبيقولش غير الكلام المهم وبيجيبلك من الأخر
            </motion.p>

            <motion.p className="fw-bold py-4" variants={FadeUp(0.7)}>
              اول ما تدخل عيلتنا مش هتشيل هم التاريخ تانى
              <br />
              علشان شرحنا بسيط وبطرق مختلفة وامتحاناتنا كتير من الاخر هتبقا من
              المتفوقين باذن الله
            </motion.p>

            <motion.div variants={FadeUp(0.9)}>
              <button className="btn px-4 py-2 rounded-0 fw-bold">
                ابدأ رحلتك الأن
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
