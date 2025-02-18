import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../config/api";
import Loading from "../Loading/Loading";

export default function AllExams() {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Exam state
  const [exams, setExams] = useState([]);

  // Fetch API Data
  async function fetchAllExams() {
    try {
      setIsLoading(true);
      let { data } = await api.get(`/api/exam/get-all-exam`);
      toast.success("تم جلب جميع الامتحانات بنجاح.");
      setExams(data.data);
    } catch (error) {
      toast.error("حدثت مشكلة أثناء جلب جميع الامتحانات!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Delete Exam
  async function deleteExam(id) {
    try {
      await api.delete(`/api/exam/delete-exam/${id}`);
      toast.success("تم حذف الامتحان بنجاح.");
      setExams((prevExams) => prevExams.filter((exam) => exam._id !== id));
    } catch (error) {
      toast.error("حدثت مشكلة أثناء حذف الامتحان!");
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAllExams();
  }, []);

  // Check if is loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>جميع الامتحانات</title>
      </Helmet>

      <section className="all-exams admins my-5 py-3">
        <h4 className="m-3 fw-bold">📚 جميع الامتحانات :</h4>
        <div className="container mt-4">
          <div className="row g-4">
            {exams.length > 0 ? (
              exams.map((exam, index) => (
                <div className="col-lg-4 col-md-6" key={exam._id}>
                  <div className="card p-2 shadow-sm rounded-3">
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

                    {/* Delete Button */}
                    <button
                      className="btn btn-sm btn-danger d-flex align-items-center justify-content-center gap-1 mt-2"
                      onClick={() => deleteExam(exam._id)}
                    >
                      <FaTrashAlt /> حذف
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-danger fw-bold">
                <p>لا توجد امتحانات لعرضها.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
