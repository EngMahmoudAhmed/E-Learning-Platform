import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import api from "../../config/api";
import { Link } from "react-router-dom";

export default function Grades() {
  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  // Data State
  const [scores, setScores] = useState([]);
  const [studentCode, setStudentCode] = useState("");
  const [examCode, setExamCode] = useState("");

  // Fetch API Data
  async function submitGrade() {
    const studentCode = sessionStorage.getItem("GradesCode");
    if (!studentCode) {
      toast.error("كود الطالب غير موجود، يرجى تسجيل الدخول مرة أخرى.");
      return;
    }

    try {
      setIsLoading(true);
      let { data } = await api.get(`/api/exam/student-scores/${studentCode}`);
      toast.success("تم جلب درجات الامتحانات بنجاح.");
      setScores(data.data.scores);
    } catch (error) {
      toast.error("حدثت مشكلة أثناء جلب درجات الامتحانات!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle Exams Id's
  function handleExamDetails(ExamCode, StudentCode) {
    sessionStorage.setItem("StudentDegreesExamCode", ExamCode);
    sessionStorage.setItem("StudentDegreesDegreesCode", StudentCode);
    setExamCode(ExamCode);
    setStudentCode(StudentCode);
  }

  useEffect(() => {
    submitGrade();
  }, []);

  // Check if is loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>درجات الامتحانات</title>
      </Helmet>

      <section className="my-5 py-3">
        <h5 className="fw-bold m-3">درجات الامتحانات :</h5>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>عنوان الامتحان</th>
                    <th>التاريخ</th>
                    <th>الوقت</th>
                    <th>الدرجة</th>
                    <th>تفاصيل الامتحان</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.length > 0 ? (
                    scores.map((score, index) =>
                      score ? (
                        <tr key={score.examCode}>
                          <td>{index + 1}</td>
                          <td>{score.examTitle}</td>
                          <td>{score.date}</td>
                          <td>{score.time}</td>
                          <td>{score.score}</td>
                          <td>
                            <Link to={"/grades-details"}>
                              <button
                                className="btn btn-sm rounded-0"
                                onClick={() =>
                                  handleExamDetails(
                                    score.examCode,
                                    score.studentCode
                                  )
                                }
                              >
                                التفاصيل
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ) : (
                        <tr key={index}>
                          <td colSpan="7">بيانات الطالب غير صالحه.</td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td colSpan="7">لا توجد درجات متاحة.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
