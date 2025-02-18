import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import api from "../../config/api";

export default function Grades() {
  // loading State
  const [isLoading, setIsLoading] = useState(false);

  // Data State
  const [scores, setScores] = useState([]);

  // Fetch API Data
  async function fetchStudentScores() {
    const studentCode = sessionStorage.getItem("GradesCode");
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

  useEffect(() => {
    fetchStudentScores();
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
        <h5 className="fw-bold m-3">درجات الامتحانات</h5>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>كود الطالب</th>
                    <th>كود الامتحان</th>
                    <th>عنوان الامتحان</th>
                    <th>التاريخ</th>
                    <th>الوقت</th>
                    <th>الدرجة</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.length > 0 ? (
                    scores.map((score, index) =>
                      score ? (
                        <tr key={score.examCode}>
                          <td>{index + 1}</td>
                          <td>{score.studentCode}</td>
                          <td>{score.examCode}</td>
                          <td>{score.examTitle}</td>
                          <td>{score.date}</td>
                          <td>{score.time}</td>
                          <td>{score.score}</td>
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
