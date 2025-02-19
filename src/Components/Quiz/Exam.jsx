import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import api from "../../config/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  // Navigate to Grades
  const navigate = useNavigate();

  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  // Exam State
  const [examData, setExamData] = useState(null);

  // Timer State
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

  // Selected Answers State
  const [answers, setAnswers] = useState([]);

  // Fetch Exam Data
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

  // Timer Logic
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

  // Handle Answer Selection
  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter(
        (ans) => ans.questionId !== questionId
      );
      return [...updatedAnswers, { questionId, answer }];
    });
  };

  // Submit Exam
  async function handleSubmitExam() {
    // Check If Student Don't Sent Any Answer
    if (answers.length === 0) {
      toast.error("يرجى اختيار إجابات قبل الإرسال.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post(
        `/api/exam/submit-exam/?studentCode=${examData.studentCode}&examCode=${examData.examCode}`,
        { answers }
      );
      toast.success("تم إرسال الإجابات بنجاح!");
      navigate("/grades-login");
      console.log("Exam submitted successfully:", response.data);
    } catch (error) {
      toast.error("حدث خطأ أثناء إرسال الإجابات!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

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
                ⏳ الوقت المتبقي: {timeLeft.minutes} دقيقة و {timeLeft.seconds}{" "}
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
                                onChange={() =>
                                  handleAnswerChange(subQ._id, option)
                                }
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

          {/* Submit Button */}
          <div className="text-center mt-5">
            <button
              className="btn rounded-0 px-5 py-2 fw-bold"
              onClick={handleSubmitExam}
            >
              إرسال الإجابات
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
