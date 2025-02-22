import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../config/api";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function AllExams() {
  // Store Exam Id In Context
  const { setExamId } = useContext(AuthContext);

  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  // Exam State
  const [exams, setExams] = useState([]);

  // Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  // Fetch Api Data
  async function submitAllExams() {
    try {
      setIsLoading(true);
      let { data } = await api.get(`/api/exam/get-all-exam`);
      setExams(data.data);
      toast.success(`تم جلب جميع الامتحانات!`);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (
        error.response &&
        error.response.data.message === "لا يوجد امتحانات"
      ) {
        toast.info("لا يوجد امتحانات متاحة حاليًا.");
      } else {
        toast.error("حدثت مشكلة أثناء جلب جميع الامتحانات!");
      }
    }
  }

  // Handle Exam ID
  function handleExamId(ExamId) {
    setExamId(ExamId);
    sessionStorage.setItem("ExamId", ExamId);
  }

  // Delete Exam
  async function deleteExam(id) {
    try {
      await api.delete(`/api/exam/delete-exam/${id}`);
      toast.success("تم حذف الامتحان بنجاح.");
      setExams((prevExams) => prevExams.filter((exam) => exam._id !== id));
      setIsLoading(false);
    } catch (error) {
      toast.error("حدثت مشكلة أثناء حذف الامتحان!");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    submitAllExams();
  }, []);

  // Exams Search
  const filteredExams = exams.filter(
    (exam) =>
      exam.title.includes(searchTerm) &&
      (selectedGrade === "" || exam.grade === selectedGrade)
  );

  // Check if is loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>جميع الامتحانات</title>
      </Helmet>

      <section className="all-exams admins my-5 py-3">
        <h4 className="m-3 fw-bold">📚 جميع الامتحانات :</h4>

        <div className="container mt-4">
          <div className="d-flex mb-3 gap-3 justify-content-center">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 ابحث عن امتحان..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                <option value="">اختر الصف</option>
                {Array.from(new Set(exams.map((exam) => exam.grade))).map(
                  (grade, index) => (
                    <option key={index} value={grade}>
                      {grade}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="row g-4">
            {filteredExams.length > 0 ? (
              filteredExams.map((exam, index) => (
                <div className="col-lg-4 col-md-6" key={exam._id}>
                  <div
                    className="card p-2 shadow-sm rounded-3"
                    onClick={() => handleExamId(exam._id)}
                  >
                    <div className="card-header text-white fw-bold">
                      امتحان #{index + 1}
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong className="text-muted">📌 العنوان:</strong>{" "}
                        {exam.title}
                      </li>
                      <li className="list-group-item">
                        <strong className="text-muted">📚 الصف:</strong>{" "}
                        {exam.grade}
                      </li>
                      <li className="list-group-item">
                        <strong className="text-muted">📅 التاريخ:</strong>{" "}
                        {exam.date}
                      </li>
                      <li className="list-group-item">
                        <strong className="text-muted">⏰ الوقت:</strong>{" "}
                        {exam.time}
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

                    <div className="d-flex justify-content-between">
                      <Link
                        to={"/exam-details"}
                        className="text-decoration-none"
                      >
                        <button className="btn btn-sm d-flex align-items-center justify-content-center gap-1 mt-2">
                          تعديل الامتحان <FaEdit />
                        </button>
                      </Link>
                      <button
                        className="btn btn-sm d-flex align-items-center justify-content-center gap-1 mt-2"
                        onClick={() => deleteExam(exam._id)}
                      >
                        حذف <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-danger fw-bold py-2">
                <p>لا توجد امتحانات متاحة حاليًا.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
