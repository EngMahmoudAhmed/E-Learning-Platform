import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import api from "../../config/api";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../context/AuthContext";
import { FaEdit } from "react-icons/fa";

export default function ExamDetails() {
  // Store Exam ID in context
  const { examId, setExamId } = useContext(AuthContext);

  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  // Exam State
  const [exam, setExam] = useState(null);

  // For Update Modal
  const [newExamTitle, setNewExamTitle] = useState("");
  const [newExamDescription, setNewExamDescription] = useState("");
  const [newExamDate, setNewExamDate] = useState("");
  const [newExamTime, setNewExamTime] = useState("");
  const [newExamDuration, setNewExamDuration] = useState("");
  const [newExamTotalQuestions, setNewExamTotalQuestions] = useState("");

  // Get and check id
  useEffect(() => {
    const storedExamId = sessionStorage.getItem("ExamId");
    if (!examId && storedExamId) {
      setExamId(storedExamId);
    }
  }, [examId, setExamId]);

  // Fetch Api Data
  async function submitExam() {
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
    submitExam();
  }, [examId]);

  // Check if is loading
  if (isLoading) {
    return <Loading />;
  }

  // Open Update Modal
  function openUpdateModal() {
    setNewExamTitle(exam.title);
    setNewExamDescription(exam.description);
    setNewExamDate(exam.date);
    setNewExamTime(exam.time);
    setNewExamDuration(exam.duration);
    setNewExamTotalQuestions(exam.totalQuestions);
  }

  // Update Exam
  async function updateExam() {
    if (!examId) return;

    try {
      await api.put(`/api/exam/update-exam/${examId}`, {
        title: newExamTitle,
        description: newExamDescription,
        date: newExamDate,
        time: newExamTime,
        duration: newExamDuration,
        totalQuestions: newExamTotalQuestions,
      });

      // Update the state with the new exam data
      setExam((prevExam) => ({
        ...prevExam,
        title: newExamTitle,
        description: newExamDescription,
        date: newExamDate,
        time: newExamTime,
        duration: newExamDuration,
        totalQuestions: newExamTotalQuestions,
      }));

      toast.success("تم تعديل الامتحان بنجاح.");
    } catch (error) {
      console.error("Error updating exam:", error);
      toast.error("حدثت مشكلة أثناء محاولة التعديل!");
    }
  }

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>تفاصيل الامتحان</title>
      </Helmet>

      <section className="exam-details my-5 py-4">
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold m-2 pe-3">📚 تفاصيل الامتحان :</h5>
          <button
            className="btn d-flex align-items-center justify-content-center gap-1 mt-2 ms-5 rounded-0"
            data-bs-toggle="modal"
            data-bs-target="#updateExamModal"
            onClick={openUpdateModal}
          >
            تعديل الامتحان
            <FaEdit />
          </button>
        </div>
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

      {/* Update Exam Modal */}
      <div
        className="modal fade"
        id="updateExamModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <button
                type="button"
                className="btn-close ms-auto"
                data-bs-dismiss="modal"
              ></button>
              <h5 className="modal-title">تعديل بيانات الامتحان</h5>
            </div>

            <div className="modal-body">
              {/* Edit Exam Details */}
              <label className="form-label">عنوان الامتحان:</label>
              <input
                type="text"
                className="form-control"
                value={newExamTitle}
                onChange={(e) => setNewExamTitle(e.target.value)}
              />

              <label className="form-label mt-3">وصف الامتحان:</label>
              <textarea
                className="form-control"
                value={newExamDescription}
                onChange={(e) => setNewExamDescription(e.target.value)}
              />

              <label className="form-label mt-3">تاريخ الامتحان:</label>
              <input
                type="date"
                className="form-control"
                value={newExamDate}
                onChange={(e) => setNewExamDate(e.target.value)}
              />

              <label className="form-label mt-3">وقت الامتحان:</label>
              <input
                type="time"
                className="form-control"
                value={newExamTime}
                onChange={(e) => setNewExamTime(e.target.value)}
              />

              <label className="form-label mt-3">مدة الامتحان:</label>
              <input
                type="text"
                className="form-control"
                value={newExamDuration}
                onChange={(e) => setNewExamDuration(e.target.value)}
              />

              <label className="form-label mt-3">عدد الأسئلة:</label>
              <input
                type="number"
                className="form-control"
                value={newExamTotalQuestions}
                onChange={(e) => setNewExamTotalQuestions(e.target.value)}
              />

              {/* Edit Exam Questions */}
              <div className="mt-4">
                <h5 className="fw-bold">تعديل الأسئلة:</h5>
                {exam?.questions?.map((question, qIndex) => (
                  <div
                    key={question._id}
                    className="mt-3 p-3 exam-details-questions rounded"
                  >
                    <h6 className="fw-bold main-bg p-2 text-white">
                      {qIndex + 1}. {question.question_title}
                    </h6>

                    <label className="form-label mt-2">عنوان السؤال:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={question.question_title}
                      onChange={(e) => {
                        const updatedQuestions = [...exam.questions];
                        updatedQuestions[qIndex].question_title =
                          e.target.value;
                        setExam({ ...exam, questions: updatedQuestions });
                      }}
                    />

                    <label className="form-label mt-2">الاختيارات:</label>
                    {question.subQuestions.map((subQ, sIndex) => (
                      <div key={subQ._id} className="mt-2">
                        <label className="form-label">
                          اختيار {sIndex + 1}:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={subQ.questionText}
                          onChange={(e) => {
                            const updatedSubQuestions = [
                              ...question.subQuestions,
                            ];
                            updatedSubQuestions[sIndex].questionText =
                              e.target.value;
                            const updatedQuestions = [...exam.questions];
                            updatedQuestions[qIndex].subQuestions =
                              updatedSubQuestions;
                            setExam({ ...exam, questions: updatedQuestions });
                          }}
                        />
                        <label className="form-label mt-2">
                          الإجابة الصحيحة:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={subQ.correctAnswer}
                          onChange={(e) => {
                            const updatedSubQuestions = [
                              ...question.subQuestions,
                            ];
                            updatedSubQuestions[sIndex].correctAnswer =
                              e.target.value;
                            const updatedQuestions = [...exam.questions];
                            updatedQuestions[qIndex].subQuestions =
                              updatedSubQuestions;
                            setExam({ ...exam, questions: updatedQuestions });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn rounded-0"
                data-bs-dismiss="modal"
              >
                إغلاق
              </button>
              <button
                type="button"
                className="btn rounded-0"
                onClick={updateExam}
                data-bs-dismiss="modal"
              >
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
