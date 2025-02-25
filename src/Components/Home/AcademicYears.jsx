import React from "react";
import G4 from "../../assets/Pri(1).webp";
import G5 from "../../assets/Pri(2).webp";
import G6 from "../../assets/Pri(3).webp";
import { motion } from "framer-motion";
import { FadeLeft, FadeUp, FadeRight } from "../../constants/animation";

const academicStages = [
  {
    title: "المرحلة الابتدائية :",
    grades: [
      { name: "الصف الرابع الابتدائي", img: G4 },
      { name: "الصف الخامس الابتدائي", img: G4 },
      { name: "الصف السادس الابتدائي", img: G4 },
    ],
  },
  {
    title: "المرحلة الإعدادية :",
    grades: [
      { name: "الصف الأول الإعدادي", img: G5 },
      { name: "الصف الثاني الإعدادي", img: G5 },
      { name: "الصف الثالث الإعدادي", img: G5 },
    ],
  },
  {
    title: "المرحلة الثانوية :",
    grades: [
      { name: "الصف الأول الثانوي", img: G6 },
      { name: "الصف الثاني الثانوي", img: G6 },
      { name: "الصف الثالث الثانوي", img: G6 },
    ],
  },
];

export default function AcademicYears() {
  return (
    <section className="my-5 academic">
      <h3 className="text-center fw-bold">السنوات الدراسية</h3>
      {academicStages.map((stage, index) => (
        <div key={index} className="container pb-5 border-2">
          <div className="row">
            <h4 className="my-4 fw-bold">{stage.title}</h4>
            {stage.grades.map((grade, idx) => (
              <motion.div
                variants={FadeUp(idx * 0.3)}
                initial="hidden"
                whileInView={"visible"}
                key={idx}
                className="col-md-4"
              >
                <div className="academic-card">
                  <img
                    src={grade.img}
                    alt={grade.name}
                    className="academic-img"
                  />
                  <div className="academic-inner">
                    <p className="fw-bold pt-2">{grade.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
