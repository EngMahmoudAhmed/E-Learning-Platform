import React from "react";
import { motion } from "framer-motion";
import { FadeUp } from "../../constants/animation";

export default function Features() {
  const features = [
    {
      title: "أسلوب مختلف",
      description: "فهم . تحليل . استنتاج . ربط . وحل كتير من الأخر",
    },
    {
      title: "معاك لحظة بلحظة",
      description:
        "مستواك في التاريخ هيكون ممتاز وهيختلف مع فيديوهاتنا وامتحاناتنا",
    },
    {
      title: "دعم فنى",
      description:
        "فريقنا الفني جاهز لحل أي مشكلة، وهنوفر ليك دعم مستمر في كل وقت",
    },
  ];

  return (
    <section>
      <div className="container py-5 mb-5 features">
        <div className="row justify-content-center gap-5 p-3">
          {features.map((feature, index) => (
            <motion.div
              variants={FadeUp(index * 0.1)}
              initial="hidden"
              whileInView={"visible"}
              key={index}
              className="col-md-3 col-f p-4 text-center"
            >
              <h6 className="py-4 fw-bold">{feature.title}</h6>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
