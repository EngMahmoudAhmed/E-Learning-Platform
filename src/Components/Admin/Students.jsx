import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  FaUserGraduate,
  FaPhone,
  FaEdit,
  FaTrashAlt,
  FaSearch,
} from "react-icons/fa";
import api from "../../config/api";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoArrowUndo } from "react-icons/io5";

export default function Students() {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Stored Data
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  // Student Data for Update
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newName, setNewName] = useState("");
  const [newStudentMobile, setNewStudentMobile] = useState("");
  const [newParentMobile, setNewParentMobile] = useState("");

  // Grades Convert
  const gradeLabels = {
    G4: "الصف الرابع الابتدائي",
    G5: "الصف الخامس الابتدائي",
    G6: "الصف السادس الابتدائي",
    G7: "الصف الأول الإعدادي",
    G8: "الصف الثاني الإعدادي",
    G9: "الصف الثالث الإعدادي",
    G10: "الصف الأول الثانوي",
    G11: "الصف الثاني الثانوي",
    G12: "الصف الثالث الثانوي",
  };

  // Fetch API Data
  async function displayStudents() {
    try {
      setIsLoading(true);
      let { data } = await api.get("/api/user/all-students");
      toast.success("تم جلب بيانات الطلاب بنجاح.");
      setStudents(data.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("حدثت مشكلة أثناء جلب بيانات الطلاب!");
      setIsLoading(false);
    }
  }

  // Delete Student
  async function deleteStudent(studentId) {
    const isConfirmed = window.confirm("هل أنت متأكد أنك تريد حذف هذا الطالب؟");
    if (!isConfirmed) return;
    try {
      await api.delete(`/api/user/delete-student/${studentId}`);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentId)
      );
      toast.success("تم حذف الطالب بنجاح.");
    } catch (error) {
      toast.error("حدثت مشكلة أثناء محاولة حذف الطالب!");
    }
  }

  // Open Update Modal
  function openUpdateModal(student) {
    setSelectedStudent(student);
    setNewName(student.name);
    setNewStudentMobile(student.studentMobile);
    setNewParentMobile(student.parentMobile);
  }

  // Update Student
  async function updateStudent() {
    if (!selectedStudent) return;

    const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (!phoneRegex.test(newStudentMobile)) {
      toast.error("رقم الطالب غير صالح، يجب أن يكون مصريًا.");
      return;
    }
    if (!phoneRegex.test(newParentMobile)) {
      toast.error("رقم ولي الأمر غير صالح، يجب أن يكون مصريًا.");
      return;
    }

    try {
      await api.put(`/api/user/update-student/${selectedStudent._id}`, {
        name: newName,
        studentMobile: newStudentMobile,
        parentMobile: newParentMobile,
      });

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === selectedStudent._id
            ? {
                ...student,
                name: newName,
                studentMobile: newStudentMobile,
                parentMobile: newParentMobile,
              }
            : student
        )
      );

      toast.success("تم تعديل بيانات الطالب بنجاح.");
      setSelectedStudent(null);
    } catch (error) {
      toast.error("حدثت مشكلة أثناء محاولة التعديل!");
    }
  }

  useEffect(() => {
    displayStudents();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  // students search
  const filteredStudents = students.filter(
    (student) =>
      (selectedGrade === "" || student.grade === selectedGrade) &&
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>جميع الطلاب</title>
      </Helmet>

      <section className="students my-5 py-3">
        <div className="container mt-3">
          <div className="d-flex justify-content-between">
            <h5 className="mt-2 fw-bold dash-header">🎓 جميع الطلاب :</h5>
            <Link to={"/admin-dashboard"} className="redirect-link">
              <button className="btn px-4 rounded-0 fs-6">
                الرجوع الى لوحه التحكم{" "}
                <IoArrowUndo size={18} className="mx-2" />
              </button>
            </Link>
          </div>
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
                <div className="col-lg-4 mb-4" key={student._id}>
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
                          {gradeLabels[student.grade] || student.grade}
                        </strong>
                      </p>
                      <p className="h6 fw-bold my-4">
                        <FaPhone className="main-color" /> رقم الطالب:
                        <strong className="me-1 fw-medium">
                          {student.studentMobile}
                        </strong>
                      </p>
                      <p className="h6 fw-bold mb-3">
                        <FaPhone className="main-color" /> رقم ولي الأمر:
                        <strong className="me-1 fw-medium">
                          {student.parentMobile}
                        </strong>
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="card-buttons mt-3 d-flex justify-content-between gap-3 pt-4 card-details">
                      {/* Edit Button */}
                      <button
                        className="btn d-flex align-items-center gap-1 rounded-0"
                        data-bs-toggle="modal"
                        data-bs-target="#updateStudentModal"
                        onClick={() => openUpdateModal(student)}
                      >
                        تعديل <FaEdit />
                      </button>
                      {/* Delete Button */}
                      <button
                        className="btn bg-danger d-flex align-items-center gap-1 rounded-0"
                        onClick={() => deleteStudent(student._id)}
                      >
                        حذف <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center primary-color fw-bold">
                <p>لا يوجد بيانات لعرضها</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="updateStudentModal"
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
              <h5 className="modal-title">تعديل بيانات الطالب</h5>
            </div>

            <div className="modal-body">
              <label className="form-label">اسم الطالب</label>
              <input
                type="text"
                className="form-control"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />

              <label className="form-label mt-3">رقم الطالب</label>
              <input
                type="text"
                className="form-control"
                value={newStudentMobile}
                onChange={(e) => setNewStudentMobile(e.target.value)}
              />

              <label className="form-label mt-3">رقم ولي الأمر</label>
              <input
                type="text"
                className="form-control"
                value={newParentMobile}
                onChange={(e) => setNewParentMobile(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn" data-bs-dismiss="modal">
                إغلاق
              </button>
              <button
                type="button"
                className="btn"
                onClick={updateStudent}
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
