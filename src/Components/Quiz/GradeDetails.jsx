import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import api from "../../config/api";
import { toast } from "react-toastify";

export default function GradeDetails() {
  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  // Exam State
  const [examDetails, setExamDetails] = useState(null);

  // Fetch Api Data
  async function fetchExamDetails() {
    const studentCode = sessionStorage.getItem("StudentDegreesDegreesCode");
    const examCode = sessionStorage.getItem("StudentDegreesExamCode");

    // Check if codes
    if (!studentCode || !examCode) {
      toast.error("بيانات الامتحان غير متوفرة، الرجاء العودة للصفحة السابقة.");
      return;
    }

    try {
      setIsLoading(true);
      let { data } = await api.get(
        `/api/exam/exam-details/${studentCode}/${examCode}`
      );
      setExamDetails(data.data);
      toast.success("تم جلب تفاصيل الامتحان بنجاح.");
    } catch (error) {
      toast.error("حدث خطأ أثناء جلب تفاصيل الامتحان.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchExamDetails();
  }, []);

  // Check if is loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>تفاصيل الامتحان</title>
      </Helmet>

      <section className="exam-details my-5 py-3">
        <h5 className="fw-bold m-3">تفاصيل الامتحان :</h5>
        <div className="container">
          {examDetails ? (
            <div className="card p-3 shadow-sm rounded-3 mt-4">
              <div className="card-header text-white fw-bold main-bg">
                {examDetails.exam.title}
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  📜 الوصف: {examDetails.exam.description}
                </li>
                <li className="list-group-item">
                  📅 التاريخ: {examDetails.exam.date}
                </li>
                <li className="list-group-item">
                  ⏰ الوقت: {examDetails.exam.time}
                </li>
                <li className="list-group-item">
                  ⌛ المدة: {examDetails.exam.duration}
                </li>
                <li className="list-group-item">
                  ❓ عدد الأسئلة: {examDetails.exam.totalQuestions}
                </li>
                <li className="list-group-item">
                  🔢 كود الامتحان: {examDetails.exam.examCode}
                </li>
                <li className="list-group-item">
                  🏆 الدرجة: {examDetails.score}
                </li>
              </ul>

              <div className="mt-4">
                <h5 className="fw-bold">📌 الأسئلة:</h5>
                {examDetails.exam.questions.map((question, qIndex) => (
                  <div
                    key={question._id}
                    className="mt-3 p-3 exam-details-questions rounded"
                  >
                    <h6 className="fw-bold main-bg p-2 text-white">
                      {qIndex + 1}. {question.question_title}
                    </h6>
                    <ul className="list-unstyled mt-2">
                      {question.subQuestions.map((subQ, sIndex) => {
                        const studentAnswer = examDetails.detailedAnswers.find(
                          (ans) => ans.questionId === subQ._id
                        );

                        return (
                          <li key={subQ._id} className="mb-2 list-questions">
                            <strong className="text-muted">
                              {qIndex + 1}.{sIndex + 1} {subQ.questionText}
                            </strong>
                            <ul className="mt-1">
                              {subQ.options.map((option, oIndex) => (
                                <li
                                  key={oIndex}
                                  className={`ms-3 ${
                                    option === subQ.correctAnswer
                                      ? "text-success fw-bold"
                                      : ""
                                  }`}
                                >
                                  - {option}
                                </li>
                              ))}
                            </ul>
                            <p className="mt-2 text-success fw-bold">
                              ✅ الإجابة الصحيحة: {subQ.correctAnswer}
                            </p>
                            <p
                              className={`mt-2 fw-bold ${
                                studentAnswer?.isCorrect
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              🎯 إجابة الطالب:{" "}
                              {studentAnswer
                                ? studentAnswer.studentAnswer
                                : "لم يتم الإجابة"}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-danger fw-bold mt-3">
              <p>لم يتم العثور على تفاصيل الامتحان.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
