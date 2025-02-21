import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Api from "../../config/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bars } from "react-loader-spinner";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

export default function AddExam() {
  // loading State
  const [isLoading, setisLoading] = useState(false);

  // Questions State
  const [questions, setQuestions] = useState([
    {
      question_title: "",
      subQuestions: [
        { questionText: "", correctAnswer: "", options: ["", "", ""] },
      ],
    },
  ]);

  // Handle adding a new sub-question
  const handleAddSubQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].subQuestions.push({
      questionText: "",
      correctAnswer: "",
      options: ["", "", ""],
    });
    setQuestions(newQuestions);
  };

  // Handle removing a sub-question
  const handleRemoveSubQuestion = (index, subIndex) => {
    const newQuestions = [...questions];
    newQuestions[index].subQuestions.splice(subIndex, 1);
    setQuestions(newQuestions);
  };

  // Handle changes in question or sub-question inputs
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleSubQuestionChange = (index, subIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index].subQuestions[subIndex][field] = value;
    setQuestions(newQuestions);
  };

  // Fetch Api Data
  async function submitExam(values) {
    try {
      setisLoading(true);
      let { data } = await Api.post(`/api/exam/add-exam`, {
        ...values,
        questions,
      });
      toast.success(`تم اضافة الامتحان بنجاح`);
      setisLoading(false);
      console.log(data.type);
    } catch (error) {
      toast.error(`حدث خطأ اثناء اضافة الامتحان! تاكد من وقت الامتحان!`);
      setisLoading(false);
    }
  }

  // Validation Schema
  let validationSchema = Yup.object({
    title: Yup.string().required("عنوان الامتحان مطلوب"),
    description: Yup.string().required("وصف الامتحان مطلوب"),
    date: Yup.string().required("تاريخ الامتحان مطلوب"),
    time: Yup.string().required("وقت الامتحان مطلوب"),
    duration: Yup.string().required("مدة الامتحان مطلوبة"),
    grade: Yup.string().required("الصف الدراسي مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      duration: "",
      grade: "",
    },
    validationSchema,
    onSubmit: submitExam,
  });

  // Check if loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>اضافة امتحان</title>
      </Helmet>

      <section className="add-exam my-5 py-3">
        <h5 className="fw-bold m-4">اضافة امتحان :</h5>
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-4">
                {/* Exam Title */}
                <label htmlFor="title" className="form-label fw-bold">
                  عنوان الامتحان :
                </label>
                <input
                  className="form-control"
                  placeholder="أدخل عنوان الامتحان"
                  style={{ textAlign: "right", direction: "rtl" }}
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.title && formik.touched.title && (
                  <div className="alert alert-danger p-2 my-2 rounded-0">
                    {formik.errors.title}
                  </div>
                )}
              </div>

              <div className="col-md-4">
                {/* Exam Description */}
                <label htmlFor="description" className="form-label fw-bold">
                  وصف الامتحان :
                </label>
                <input
                  className="form-control"
                  placeholder="أدخل وصف الامتحان من اختيارك"
                  style={{ textAlign: "right", direction: "rtl" }}
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.description && formik.touched.description && (
                  <div className="alert alert-danger p-2 my-2 rounded-0">
                    {formik.errors.description}
                  </div>
                )}
              </div>

              <div className="col-md-4">
                {/* Exam Date */}
                <label htmlFor="date" className="form-label fw-bold">
                  تاريخ الامتحان :
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.date && formik.touched.date && (
                  <div className="alert alert-danger p-2 my-2 rounded-0">
                    {formik.errors.date}
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                {/* Exam Time */}
                <label htmlFor="time" className="form-label fw-bold">
                  وقت الامتحان :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="time"
                  name="time"
                  placeholder="الساعه بالتوقيت العامى [ 18:15 ]"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.time && formik.touched.time && (
                  <div className="alert alert-danger p-2 my-2 rounded-0">
                    {formik.errors.time}
                  </div>
                )}
              </div>

              <div className="col-md-4">
                {/* Exam Duration */}
                <label htmlFor="duration" className="form-label fw-bold">
                  مدة الامتحان :
                </label>
                <input
                  className="form-control"
                  placeholder="أدخل مدة الامتحان [ 1H - 1h - 30M - 30m ]"
                  style={{ textAlign: "right", direction: "rtl" }}
                  id="duration"
                  name="duration"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.duration && formik.touched.duration && (
                  <div className="alert alert-danger p-2 my-2 rounded-0">
                    {formik.errors.duration}
                  </div>
                )}
              </div>

              <div className="col-md-4">
                {/* Exam Grade */}
                <label htmlFor="grade" className="form-label fw-bold">
                  الصف :
                </label>
                <select
                  id="grade"
                  name="grade"
                  className="form-select"
                  value={formik.values.grade}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" disabled hidden>
                    اختر الصف
                  </option>
                  <optgroup label="المرحلة الابتدائية">
                    <option value="G4">الصف الرابع الابتدائي</option>
                    <option value="G5">الصف الخامس الابتدائي</option>
                    <option value="G6">الصف السادس الابتدائي</option>
                  </optgroup>
                  <optgroup label="المرحلة الإعدادية">
                    <option value="G7">الصف الأول الإعدادي</option>
                    <option value="G8">الصف الثاني الإعدادي</option>
                    <option value="G9">الصف الثالث الإعدادي</option>
                  </optgroup>
                  <optgroup label="المرحلة الثانوية">
                    <option value="G10">الصف الأول الثانوي</option>
                    <option value="G11">الصف الثاني الثانوي</option>
                    <option value="G12">الصف الثالث الثانوي</option>
                  </optgroup>
                </select>
                {formik.errors.grade && formik.touched.grade ? (
                  <div className="alert alert-danger p-2 my-2 rounded-0">
                    {formik.errors.grade}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* Questions */}
            <div className="row mb-3">
              <div className="col-md-12">
                <h5 className="fw-bold my-4">
                  الأسئلة [سيكون هناك سؤال رئيسي داخلة اى عدد من الأسئلة] :
                </h5>
                {questions.map((question, index) => (
                  <div key={index}>
                    <div className="my-3">
                      <label htmlFor="q-title" className="fw-bold">
                        عنوان السؤال الرئيسى :
                      </label>
                      <input
                        type="text"
                        name="q-title"
                        className="form-control mb-3 mt-2"
                        placeholder="أكمل - ما النتائج - بما تفسر - الخ"
                        value={question.question_title}
                        onChange={(e) =>
                          handleQuestionChange(
                            index,
                            "question_title",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    {question.subQuestions.map((subQuestion, subIndex) => (
                      <div key={subIndex} className="my-2">
                        <label htmlFor="q-title" className="fw-bold">
                          نص السؤال :
                        </label>
                        <input
                          type="text"
                          className="form-control my-2"
                          placeholder="أدخل نص السؤال"
                          value={subQuestion.questionText}
                          onChange={(e) =>
                            handleSubQuestionChange(
                              index,
                              subIndex,
                              "questionText",
                              e.target.value
                            )
                          }
                        />

                        <div className="my-3">
                          <label htmlFor="q-title" className="fw-bold">
                            الاختيارات :
                          </label>
                          <div className="row">
                            {subQuestion.options.map((option, i) => (
                              <div className="col-4" key={i}>
                                <input
                                  type="text"
                                  className="form-control my-2"
                                  placeholder={`اختيار ${i + 1}`}
                                  value={option}
                                  onChange={(e) =>
                                    handleSubQuestionChange(
                                      index,
                                      subIndex,
                                      "options",
                                      [
                                        ...subQuestion.options.slice(0, i),
                                        e.target.value,
                                        ...subQuestion.options.slice(i + 1),
                                      ]
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="my-3">
                          <label htmlFor="q-title" className="fw-bold">
                            الإجابة الصحيحة :
                          </label>
                          <input
                            type="text"
                            className="form-control my-2"
                            placeholder="ادخل اجابة السؤال الصحيحة"
                            value={subQuestion.correctAnswer}
                            onChange={(e) =>
                              handleSubQuestionChange(
                                index,
                                subIndex,
                                "correctAnswer",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="d-flex justify-content-end">
                          <button
                            type="button"
                            className="btn rounded-0"
                            onClick={() =>
                              handleRemoveSubQuestion(index, subIndex)
                            }
                          >
                            إزالة السؤال الفرعي
                          </button>
                          <button
                            type="button"
                            className="btn rounded-0 mx-3"
                            onClick={() => handleAddSubQuestion(index)}
                          >
                            إضافة سؤال فرعي
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn rounded-0"
                  onClick={() =>
                    setQuestions([
                      ...questions,
                      {
                        question_title: "",
                        subQuestions: [
                          {
                            questionText: "",
                            correctAnswer: "",
                            options: ["", "", ""],
                          },
                        ],
                      },
                    ])
                  }
                >
                  إضافة سؤال رئيسي
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn rounded-0 d-flex justify-content-center w-100"
              // disabled={!(formik.isValid && formik.dirty)}
            >
              {isLoading ? (
                <Bars
                  height="20"
                  width="50"
                  color="#fff"
                  ariaLabel="bars-loading"
                  visible={true}
                />
              ) : (
                "اضافة الامتحان"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
