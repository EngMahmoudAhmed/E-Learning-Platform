import React from "react";
import Hero from "../../assets/p4.webp";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { FadeLeft, FadeUp, FadeRight } from "../../constants/animation";
import bg from "../../assets/pyramids.webp";

export default function About() {
  const paragraphs = [
    "درس في كلية التربية بجامعة المنصورة وحصل على ليسانس الآداب والتربية في مادة الدراسات الاجتماعية عام 2022 بتقدير عام جيد جدًا.",
    "ثم تخصص في تدريس مادة الدراسات الاجتماعية للصفوف الابتدائية والإعدادية، ومادة التاريخ والجغرافيا للصفوف الثانوية العامة.",
    "يمتلك خبرة سبع سنوات في تدريسها، متخصص في إعداد المراجعات النهائية، وليلة الامتحان، والامتحانات الشاملة، ورفع دون المستوى للمستوى المطلوب.",
  ];

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>نبذة عن المدرس</title>
      </Helmet>

      <section className="mt-5 py-4 about">
        <motion.img
          variants={FadeUp(0.8)}
          initial="hidden"
          animate="visible"
          src={bg}
          alt="pyramids"
          className="pyramids"
        />
        <motion.h5
          variants={FadeUp(0.1)}
          initial="hidden"
          animate="visible"
          className="text-center mb-3 mt-2 fw-bold"
        >
          عن الاستاذ محمود ابراهيم العزوني
        </motion.h5>
        <div className="container">
          <div className="row align-items-center p-4 g-4">
            <motion.div
              variants={FadeLeft(0.4)}
              initial="hidden"
              animate="visible"
              className="col-md-6 text-center"
            >
              <img src={Hero} alt="Mr/Mahmoud" className="hero w-100" />
            </motion.div>
            <div className="col-md-6">
              <motion.div
                variants={FadeRight(0.6)}
                initial="hidden"
                animate="visible"
                className="my-3"
              >
                {paragraphs.map((text, index) => (
                  <div key={index} className="mb-3 py-2">
                    <motion.p
                      variants={FadeUp(index * 0.5)}
                      initial="hidden"
                      animate="visible"
                      className="fw-bold"
                    >
                      {text}
                    </motion.p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
