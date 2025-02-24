import React from "react";
import Hero from "../../assets/p4.webp";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>نبذة عن المدرس</title>
      </Helmet>

      <section className="mt-5 py-4 about">
        <h4 className="text-center mb-3 mt-2 fw-bold">
          عن الاستاذ محمود ابراهيم العزوني
        </h4>
        <div className="container">
          <div className="row align-items-center p-4 g-4">
            <div className="col-md-6 text-center">
              <img
                src={Hero}
                alt="Mr/Mahmoud"
                className="hero"
                style={{ width: "400px", height: "370px" }}
              />
            </div>
            <div className="col-md-6">
              <div className="my-3">
                <p className="fw-bold">
                  درس في كلية التربية بجامعة المنصورة وحصل على ليسانس الآداب
                  والتربية في مادة الدراسات الاجتماعية عام 2022 بتقدير عام جيد
                  جدًا.
                </p>
                <p className="fw-bold py-4">
                  ثم تخصص في تدريس مادة الدراسات الاجتماعية للصفوف الابتدائية
                  والإعدادية، ومادة التاريخ والجغرافيا للصفوف الثانوية العامة.
                </p>
                <p className="fw-bold">
                  يمتلك خبرة سبع سنوات في تدريسها، متخصص في إعداد المراجعات
                  النهائية، وليلة الامتحان، والامتحانات الشاملة، ورفع دون
                  المستوى للمستوى المطلوب.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
