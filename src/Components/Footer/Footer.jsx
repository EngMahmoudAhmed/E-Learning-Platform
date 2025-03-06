import React from "react";
import Logo from "../../assets/LogoF.webp";
import {
  FaYoutube,
  FaFacebook,
  FaWhatsapp,
  FaUsers,
  FaTelegram,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { FadeLeft, FadeUp, FadeRight } from "../../constants/animation";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={FadeLeft(1 * 0.1)}
              className="col-md-6 d-flex justify-content-center align-items-center"
            >
              <img src={Logo} className="logo" alt="Logo" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={FadeRight(1 * 0.1)}
              className="col-md-6 align-content-center content"
            >
              <motion.h4 variants={FadeUp(0.1)} className="fw-bold">
                منصة م/ محمود ابراهيم العزونى التعليمية
              </motion.h4>
              <motion.p variants={FadeUp(0.3)} className="text-white py-3">
                في منصتنا التعليمية، نحن نقدم لك كل ما تحتاجه لتعلم مهارات جديدة
                واكتساب المعرفة بشكل فعال وممتع. نحن هنا لمساعدتك في كل خطوة.
              </motion.p>

              <div className="d-flex flex-column align-items-start my-4 social">
                <motion.p variants={FadeUp(0.5)} className="fw-bold">
                  يمكنك متابعتنا عن طريق :{" "}
                </motion.p>

                <div className="d-flex gap-4">
                  <motion.a
                    variants={FadeRight(0.7)}
                    href="https://www.youtube.com/@mahmoudelazony-mr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon d-flex justify-content-center align-items-center"
                  >
                    <FaYoutube size={30} />
                  </motion.a>
                  <motion.a
                    variants={FadeRight(0.8)}
                    href="https://www.facebook.com/share/15DMAdHRQw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon d-flex justify-content-center align-items-center"
                  >
                    <FaFacebook size={30} />
                  </motion.a>
                  <motion.a
                    variants={FadeRight(0.9)}
                    href="https://wa.me/+201011638721"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon d-flex justify-content-center align-items-center"
                  >
                    <FaWhatsapp size={30} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          variants={FadeUp(0.3)}
          initial="hidden"
          animate="visible"
          className="Info py-3"
        >
          <div className="text-center form-link">
            <strong>Developed By</strong>
            <span className="glass-effect mx-2">
              WebCore Team <FaUsers size={22} className="primary-color" />
            </span>
            <strong className="fw-bold fs-5">,</strong>
            <a
              href="https://wa.me/+01021580334"
              rel="noopener noreferrer"
              target="_blank"
              className="glass-effect mx-2"
            >
              <FaWhatsapp size={20} />
            </a>
            <strong>-</strong>
            <a
              href="https://t.me/Elshirbini"
              rel="noopener noreferrer"
              target="_blank"
              className="glass-effect mx-2"
            >
              <FaTelegram size={20} />
            </a>
            <strong>-</strong>
            <a
              href="mailto:w3b.core.team@gmail.com"
              className="glass-effect mx-2"
            >
              {" "}
              <FaEnvelope size={20} />
            </a>
          </div>
        </motion.div>
      </footer>
    </>
  );
}
