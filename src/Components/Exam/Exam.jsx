import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import api from "../../config/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

  // Display One Question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Check If Answers in local storage
  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem("savedAnswers"));
    if (savedAnswers) {
      setAnswers(savedAnswers);
    }
  }, []);

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
      setIsLoading(false);
    } catch (error) {
      toast.error("حدثت مشكلة أثناء تحميل الامتحان!");
      setIsLoading(false);
    }
  }

  // Fetch Data
  useEffect(() => {
    fetchExam();
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      handleSubmitExam();
      return;
    }

    // Timer Logic
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
      const existingAnswerIndex = prevAnswers.findIndex(
        (ans) => ans.questionId === questionId
      );

      let updatedAnswers;
      if (existingAnswerIndex !== -1) {
        updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { questionId, answer };
      } else {
        updatedAnswers = [...prevAnswers, { questionId, answer }];
      }
      localStorage.setItem("savedAnswers", JSON.stringify(updatedAnswers));
      return updatedAnswers;
    });
  };

  // Submit Exam
  async function handleSubmitExam() {
    // Handle call submit
    if (!examData || !examData.exam) {
      console.log(`Wait`);
      return;
    }

    // Check if student answer all questions
    const unansweredQuestions = examData.exam.questions.flatMap((q) =>
      q.subQuestions.filter(
        (subQ) => !answers.some((ans) => ans.questionId === subQ._id)
      )
    );

    if (unansweredQuestions.length > 0) {
      toast.warning("يجب الإجابة على جميع الأسئلة قبل إرسال الامتحان!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post(
        `/api/exam/submit-exam/?studentCode=${examData.studentCode}&examCode=${examData.examCode}`,
        { answers }
      );
      console.log(response.type);
      toast.success("تم إرسال الإجابات بنجاح!");
      navigate("/grades-login");
    } catch (error) {
      toast.error("حدثت مشكلة أثناء إرسال الإجابات!");
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

          <div className="accordion mt-4">
            {examData?.exam?.questions &&
              examData.exam.questions.length > 0 && (
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button main-bg text-white"
                      type="button"
                    >
                      {currentQuestionIndex + 1}.{" "}
                      {
                        examData.exam.questions[currentQuestionIndex]
                          .question_title
                      }
                    </button>
                  </h2>
                  <div className="accordion-body">
                    {examData.exam.questions[
                      currentQuestionIndex
                    ].subQuestions.map((subQ, subIndex) => (
                      <div key={subQ._id} className="py-3 exam-sub-question">
                        <p className="fw-bold mb-4">
                          <strong>
                            {currentQuestionIndex + 1}.{subIndex + 1} -
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
                                checked={answers.some(
                                  (ans) =>
                                    ans.questionId === subQ._id &&
                                    ans.answer === option
                                )}
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
              )}
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn shadow-lg rounded-0"
              disabled={currentQuestionIndex === 0}
              onClick={() =>
                setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
              }
            >
              <FaArrowRight size={20} className="mx-1" />
              السؤال السابق
            </button>

            {currentQuestionIndex < examData?.exam?.questions?.length - 1 ? (
              <button
                className="btn shadow-lg rounded-0"
                onClick={() =>
                  setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
                }
              >
                التالي السؤال
                <FaArrowLeft size={20} className="mx-1" />
              </button>
            ) : (
              <button className="btn rounded-0" onClick={handleSubmitExam}>
                إرسال الإجابات
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
