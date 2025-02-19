import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import api from "../../config/api";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Quiz() {
  // loading State
  const [isLoading, setIsLoading] = useState(false);

  // Exam State
  const [examData, setExamData] = useState(null);

  // Timer State
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

  // Fetch Api Data
  async function fetchExam() {
    try {
      setIsLoading(true);
      let { data } = await api.get(`/api/exam/take-exam`);
      setExamData(data.data);

      // Timer
      setTimeLeft({
        minutes: data.data.remainingTime.minutes || 0,
        seconds: data.data.remainingTime.seconds || 0,
      });

      toast.success("تم تحميل الامتحان بنجاح.");
    } catch (error) {
      toast.error("حدثت مشكلة أثناء تحميل الامتحان!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchExam();
  }, []);

  // Play Timer Every Second
  useEffect(() => {
    if (timeLeft.minutes === 0 && timeLeft.seconds === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { minutes: prevTime.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Check if is loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>{examData?.exam?.title || "اختبار"}</title>
      </Helmet>

      <section className="my-5 py-4 exam">
        <div className="container">
          <h5 className="text-center primary-color fw-bold mt-1">
            {examData?.exam?.title}
          </h5>
          <div className="d-flex justify-content-between align-items-center mt-5 exam-header">
            <p className="text-center">
              وصف الامتحان : {examData?.exam?.description}
            </p>
            <div className="w-50">
              <p className="text-center main-bg text-white py-3">
                ⏳ الوقت المتبقي: {timeLeft.minutes} دقيقة و {timeLeft.seconds}
                ثانية
              </p>
            </div>
          </div>

          <div className="accordion mt-4" id="examAccordion">
            {examData?.exam?.questions?.map((q, index) => (
              <div key={q._id} className="accordion-item">
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className="accordion-button main-bg text-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                    aria-expanded="true"
                    aria-controls={`collapse${index}`}
                  >
                    {index + 1}. {q.question_title}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className="accordion-collapse collapse show"
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#examAccordion"
                >
                  <div className="accordion-body">
                    {q.subQuestions.map((subQ, subIndex) => (
                      <div key={subQ._id} className="py-3 exam-sub-question">
                        <p className="fw-bold mb-4">
                          <strong>
                            {index + 1}.{subIndex + 1} -
                          </strong>{" "}
                          {subQ.questionText} ..........
                        </p>
                        <div className="d-flex flex-wrap my-2">
                          {subQ.options.map((option, idx) => (
                            <div className="form-check me-3" key={idx}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name={subQ._id}
                                id={`option-${subQ._id}-${idx}`}
                                value={option}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`option-${subQ._id}-${idx}`}
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
