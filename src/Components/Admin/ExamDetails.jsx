import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import api from "../../config/api";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../context/AuthContext";

export default function ExamDetails() {
  // Get Exam ID from Context
  const { examId, setExamId } = useContext(AuthContext);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Exam state
  const [exam, setExam] = useState(null);

  // Get and check Exam Id
  useEffect(() => {
    const storedExamId = sessionStorage.getItem("ExamId");
    if (!examId && storedExamId) {
      setExamId(storedExamId);
    }
  }, [examId, setExamId]);

  // Fetch API Data
  async function fetchExamDetails() {
    if (!examId) return;
    try {
      setIsLoading(true);
      let { data } = await api.get(`/api/exam/get-exam/${examId}`);
      toast.success("تم جلب تفاصيل الامتحان بنجاح.");
      setExam(data.data);
    } catch (error) {
      toast.error("حدثت مشكلة أثناء جلب تفاصيل الامتحان!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchExamDetails();
  }, [examId]);

  // Check if is loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>تفاصيل الامتحان</title>
      </Helmet>

      <section className="exam-details my-5 py-4">
        <h5 className="fw-bold m-3">📚 تفاصيل الامتحان :</h5>
        <div className="container">
          {exam ? (
            <div className="card p-3 shadow-sm rounded-3 mt-4">
              <div className="card-header text-white fw-bold main-bg">
                {exam.title}
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong className="text-muted">📜 الوصف:</strong>{" "}
                  {exam.description}
                </li>
                <li className="list-group-item">
                  <strong className="text-muted">📚 الصف:</strong> {exam.grade}
                </li>
                <li className="list-group-item">
                  <strong className="text-muted">📅 التاريخ:</strong>{" "}
                  {exam.date}
                </li>
                <li className="list-group-item">
                  <strong className="text-muted">⏰ الوقت:</strong> {exam.time}
                </li>
                <li className="list-group-item">
                  <strong className="text-muted">⌛ المدة:</strong>{" "}
                  {exam.duration}
                </li>
                <li className="list-group-item">
                  <strong className="text-muted">❓ عدد الأسئلة:</strong>{" "}
                  {exam.totalQuestions}
                </li>
                <li className="list-group-item">
                  <strong className="text-muted">🔢 كود الامتحان:</strong>{" "}
                  {exam.examCode}
                </li>
              </ul>

              {/* Display Questions */}
              <div className="mt-4">
                <h5 className="fw-bold">📌 الأسئلة:</h5>
                {exam.questions.map((question, qIndex) => (
                  <div
                    key={question._id}
                    className="mt-3 p-3 exam-details-questions rounded"
                  >
                    <h6 className="fw-bold main-bg p-2 text-white">
                      {qIndex + 1}. {question.question_title}
                    </h6>
                    <ul className="list-unstyled mt-2">
                      {question.subQuestions.map((subQ, sIndex) => (
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
                        </li>
                      ))}
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
