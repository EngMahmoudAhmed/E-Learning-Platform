import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaUserGraduate, FaSearch, FaInfoCircle } from "react-icons/fa";
import api from "../../config/api";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function StudentGrades() {
  // Store Exam ID For Each Exam
  const { studentCode, setStudentCode } = useContext(AuthContext);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Stored Data
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  // Fetch API Data
  async function displayStudents() {
    try {
      setIsLoading(true);
      let { data } = await api.get("/api/user/all-students");
      toast.success("تم جلب بيانات الطلاب بنجاح.");
      setStudents(data.data);
    } catch (error) {
      toast.error("حدثت مشكلة أثناء جلب بيانات الطلاب!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle Exam Id
  function handleStudentCode(StudentCode) {
    setStudentCode(StudentCode);
    sessionStorage.setItem("StudentDegreesCode", StudentCode);
  }

  useEffect(() => {
    displayStudents();
  }, []);

  // Filter students by selected grade and search term
  const filteredStudents = students.filter(
    (student) =>
      (selectedGrade === "" || student.grade === selectedGrade) &&
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if is loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>درجات الطلاب</title>
      </Helmet>

      <section className="students my-5 py-3">
        <h5 className="m-4 fw-bold">🎓درجات جميع الطلاب :</h5>
        <div className="container mt-4">
          <div className="d-flex gap-3 my-4">
            {/* Search Input */}
            <div className="input-group w-50">
              <span className="input-group-text bg-white search-icons">
                <FaSearch className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control rounded-0"
                placeholder="ابحث عن طالب بالاسم..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Select Input */}
            <select
              className="form-select w-50"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              <option value="">اختر الصف</option>
              {[...new Set(students.map((student) => student.grade))].map(
                (grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="row">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <div
                  className="col-md-4 mb-4"
                  key={student._id}
                  onClick={() => handleStudentCode(student.studentCode)}
                >
                  <div className="card p-4 shadow-md">
                    <span>{index + 1}</span>

                    {/* Student Icon */}
                    <div
                      className="card-header rounded-circle mx-auto d-flex justify-content-center align-items-center mb-3"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <FaUserGraduate size={30} />
                    </div>

                    {/* Student Details */}
                    <div className="card-details">
                      <p className="h6 fw-bold my-4">
                        كود الطالب:
                        <strong className="me-1 fw-medium">
                          {student.studentCode}
                        </strong>
                      </p>
                      <p className="h6 fw-bold my-4">
                        الاسم:
                        <strong className="me-1 fw-medium">
                          {student.name}
                        </strong>
                      </p>
                      <p className="h6 fw-bold">
                        الصف:
                        <strong className="me-1 fw-medium">
                          {student.grade}
                        </strong>
                      </p>
                    </div>

                    {/* Delete Button */}
                    <Link
                      to={"/exam-degrees"}
                      className="d-flex justify-content-center text-decoration-none"
                    >
                      <button className="btn d-flex align-items-center justify-content-center mt-3 gap-2 rounded-0 w-100">
                        عرض درجات الامتحانات
                        <FaInfoCircle />
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center primary-color fw-bold">
                <p>لا يوجد درجات لعرضها</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
