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
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <img src={Logo} className="logo" alt="Logo" />
            </div>

            <div className="col-md-6 align-content-center content">
              <h4 className="fw-bold">منصة م/ محمود العزونى التعليمية</h4>
              <p className="text-white py-3">
                في منصتنا التعليمية، نحن نقدم لك كل ما تحتاجه لتعلم مهارات جديدة
                واكتساب المعرفة بشكل فعال وممتع. نحن هنا لمساعدتك في كل خطوة.
              </p>

              <div className="d-flex flex-column align-items-start my-4 social">
                <p className="fw-bold">يمكنك متابعتنا عن طريق : </p>

                <div className="d-flex gap-4">
                  <a
                    href="https://www.youtube.com/@mahmoudelazony-mr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon d-flex justify-content-center align-items-center"
                  >
                    <FaYoutube size={30} />
                  </a>
                  <a
                    href="https://www.facebook.com/share/15DMAdHRQw/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon d-flex justify-content-center align-items-center"
                  >
                    <FaFacebook size={30} />
                  </a>
                  <a
                    href="https://wa.me/+201011638721"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon d-flex justify-content-center align-items-center"
                  >
                    <FaWhatsapp size={30} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Info py-3">
          <div className="text-center form-link">
            <strong>{"<Developed By>"}</strong>
            <span className="glass-effect mx-2">
              WEBCORE Team <FaUsers size={22} className="primary-color" />
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
            <strong>{"<All Copy Rights Reserved @2025>"}</strong>
          </div>
        </div>
      </footer>
    </>
  );
}
