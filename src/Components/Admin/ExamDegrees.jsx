import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import api from "../../config/api";
import { Link } from "react-router-dom";
import { IoArrowUndo } from "react-icons/io5";

export default function ExamDegrees() {
  // Loading State
  const [isLoading, setIsLoading] = useState(false);

  // Data State
  const [scores, setScores] = useState([]);
  const [studentCode, setStudentCode] = useState("");
  const [examCode, setExamCode] = useState("");

  // Fetch API Data
  async function fetchStudentScores(studentCode) {
    try {
      setIsLoading(true);
      let { data } = await api.get(
        `/api/exam/student-scores-admin/${studentCode}`
      );
      toast.success("تم جلب درجات الامتحانات بنجاح.");
      setScores(data.data.scores);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Handle Exams Id's
  function handleExamDetails(ExamCode, StudentCode) {
    sessionStorage.setItem("StudentExamCode", ExamCode);
    sessionStorage.setItem("StudentDegreesCode", StudentCode);
    setExamCode(ExamCode);
    setStudentCode(StudentCode);
  }

  // Get Student Code
  useEffect(() => {
    const storedStudentCode = sessionStorage.getItem("StudentDegreesCode");
    if (storedStudentCode) {
      setStudentCode(storedStudentCode);
      fetchStudentScores(storedStudentCode);
    } else {
      toast.error("كود الطالب غير موجود، يرجى تحديد المحاولة لاحقا .");
    }
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
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
            <h5 className="fw-bold dash-header mt-3">درجات الامتحانات :</h5>
            <Link to={"/student-grades"} className="redirect-link">
              <button className="btn px-4 rounded-0 fs-6">
                الرجوع الى درجات جميع الطلاب{" "}
                <IoArrowUndo size={18} className="mx-2" />
              </button>
            </Link>
          </div>
          <div className="row">
            <div className="col-md-12">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>كود الامتحان</th>
                    <th>عنوان الامتحان</th>
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
                          <td>{score.examCode}</td>
                          <td>{score.examTitle}</td>
                          <td>
                            {" "}
                            {score.score} من {score.degree}
                          </td>
                          <td>
                            <Link to={"/exam-degrees-details"}>
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
                          <td colSpan="7">بيانات الطالب غير صالحة.</td>
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
