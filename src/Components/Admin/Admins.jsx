import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AiFillSetting } from "react-icons/ai";
import { FaUserShield, FaPhone, FaEdit, FaTrashAlt } from "react-icons/fa";
import api from "../../config/api";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoArrowUndo } from "react-icons/io5";

export default function Admins() {
  // Loading State
  const [isLoading, setisLoading] = useState(false);

  // Stored Data
  const [admins, setAdmins] = useState([]);

  // Admin Data for Update
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [newRole, setNewRole] = useState("");

  // Fetch API Data
  async function displayAdmins() {
    try {
      setisLoading(true);
      let { data } = await api.get(`/api/admin/all-admin`);
      toast.success("تم جلب البيانات بنجاح.");
      setAdmins(data.data);
      setisLoading(false);
    } catch (error) {
      toast.error("حدثت مشكلة أثناء جلب البيانات !");
      setisLoading(false);
    }
  }

  // Delete Admin
  async function deleteAdmin(adminId) {
    const isConfirmed = window.confirm(
      "هل أنت متأكد من أنك تريد حذف هذا المسؤول؟"
    );

    if (!isConfirmed) return;

    try {
      await api.delete(`/api/admin/${adminId}`);
      setAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin._id !== adminId)
      );
      toast.success("تم حذف المسؤول بنجاح.");
    } catch (error) {
      toast.error("حدثت مشكلة أثناء محاولة حذف المسؤول!");
    }
  }

  // Open Update Modal
  function openUpdateModal(admin) {
    setSelectedAdmin(admin);
    setNewUserName(admin.userName);
    setNewRole(admin.role);
  }

  // Update Admin
  async function updateAdmin() {
    if (!selectedAdmin) return;

    const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (!phoneRegex.test(newUserName)) {
      toast.error("رقم الهاتف غير صالح، يجب أن يكون رقم هاتف مصرى صالح.");
      return;
    }

    try {
      await api.patch(`/api/admin/update/${selectedAdmin._id}`, {
        userName: newUserName,
        role: newRole,
      });

      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id === selectedAdmin._id
            ? { ...admin, userName: newUserName, role: newRole }
            : admin
        )
      );

      toast.success("تم تعديل المسؤول بنجاح.");
      setSelectedAdmin(null);
    } catch (error) {
      toast.error("حدثت مشكلة أثناء محاولة التعديل!");
    }
  }

  useEffect(() => {
    displayAdmins();
  }, []);

  // Check if is loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>جميع المسؤولين</title>
      </Helmet>

      <section className="admins my-5 py-3">
        <div className="container mt-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mt-2 fw-bold dash-header">📌 جميع المسؤولين :</h5>
            <Link to={"/admin-dashboard"} className="redirect-link">
              <button className="btn px-4 rounded-0 fs-6">
                الرجوع الى لوحه التحكم{" "}
                <IoArrowUndo size={18} className="mx-2" />
              </button>
            </Link>
          </div>
          <div className="row">
            {admins.length > 0 ? (
              admins.map((admin, index) => (
                <div className="col-lg-4 mb-4" key={admin._id}>
                  <div className="card p-4 shadow-md">
                    <span>{index + 1}</span>

                    {/* Admin Icon */}
                    <div
                      className="card-header rounded-circle mx-auto d-flex justify-content-center align-items-center mb-3"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <FaUserShield size={30} />
                    </div>

                    {/* Admin Details */}
                    <div className="card-details">
                      <p className="h6 fw-bold my-4">
                        <FaPhone className="main-color" /> رقم الهاتف :
                        <strong className="me-1 fw-medium">
                          {admin.userName}
                        </strong>
                      </p>
                      <p className="h6 fw-bold">
                        <AiFillSetting className="main-color" /> دور المسؤول :
                        <strong className="me-1 fw-medium">{admin.role}</strong>
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="card-buttons mt-3 d-flex justify-content-between gap-3 card-details pt-4">
                      {/* Edit Button */}
                      <button
                        className="btn d-flex align-items-center gap-1 rounded-0"
                        data-bs-toggle="modal"
                        data-bs-target="#updateAdminModal"
                        onClick={() => openUpdateModal(admin)}
                      >
                        تعديل <FaEdit />
                      </button>

                      {/* Delete Button */}
                      <button
                        className="btn d-flex align-items-center gap-1 rounded-0"
                        onClick={() => deleteAdmin(admin._id)}
                      >
                        حذف <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center main-color fw-bold">
                <p>لا يوجد بيانات لعرضها </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="updateAdminModal"
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
              <h5 className="modal-title">تعديل بيانات المسؤول</h5>
            </div>

            <div className="modal-body">
              <label className="form-label">اسم المستخدم:</label>
              <input
                type="text"
                className="form-control"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />

              <label className="form-label mt-3">دور المسؤول:</label>
              <select
                className="form-select"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="" disabled hidden>
                  اختر الدور
                </option>
                <option value="admin">مسؤول إدارة</option>
                <option value="user">مسؤول الطلاب</option>
                <option value="exams">مسؤول امتحانات</option>
              </select>
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
                onClick={updateAdmin}
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
