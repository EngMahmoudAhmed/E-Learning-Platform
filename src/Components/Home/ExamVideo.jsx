import React from "react";

export default function ExamVideo() {
  return (
    <>
      <section className="home-video pt-2 pb-5">
        <h3 className="text-center fw-bold">
          تفاصيل تسجيلك فى امتحانات المنصة
        </h3>
        <div className="container my-5">
          <div className="row">
            <div className="com-md-12">
              <iframe
                className="exam-video"
                width="100%"
                height="700"
                src="https://www.youtube.com/embed/OCEzB45LYwQ?si=SA1WjHpul07aPrrX"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
