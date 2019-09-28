import React from "react";
import "./index.scss";

const HowItWorks = () => (
  <section className="section-steps">
    <div className="container ">
      <h2 className="mb-5 text-center">
        How it works &mdash; Simple as 1, 2, 3
      </h2>
      <div className="row">
        <div className="col  steps-box">
          <img
            src="/images/app-iPhone.png"
            alt="app iphone"
            className="app-screen"
          />
        </div>
        <div className="col  steps-box">
          <div className="works-step">
            <div>1</div>
            <p>Do step 1</p>
          </div>
          <div className="works-step">
            <div>2</div>
            <p>Do step 2</p>
          </div>
          <div className="works-step">
            <div>3</div>
            <p>Do step 3</p>
          </div>

          <a href="#" className="btn-app">
            <img src="/images/download-app.svg" alt="download-app" />
          </a>
          <a href="#" className="btn-app">
            <img
              src="/images/download-app-android.png"
              alt="download-app-android"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
