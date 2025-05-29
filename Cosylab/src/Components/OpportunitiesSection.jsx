import React, { useEffect, useState } from "react";
import "../../public/assets/css/style.css";
import opportunitiesImage from "../../public/assets/images/temp/CGAS_Opportunities.png"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/assets/css/animate.css"; 

const OpportunitiesSection = () => {
  const [animationDelay, setAnimationDelay] = useState("0s"); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDelay("1s");
    }, 1000);
  
    if (window.$) {
      $(document).ready(function () {
        $(window).stellar({
          horizontalScrolling: false,
          verticalOffset: 10,
        });
      });
    }
  
    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <div
        id="opportunities-section"
        data-stellar-background-ratio="0.5"
        style={{ padding: "2px 0" }}
      >
        <div className="container">
          <div className="row">
            {/* Left Content */}
            <div className="col-sm-6">
              <div
                className="banner-content animated fadeInUp"
                style={{ animationDelay: animationDelay }}
              >
                <h3 className="banner-heading">Looking for Opportunities?</h3>
                <div className="banner-description">
                  We are looking for Research Interns and PhD candidates with
                  some of the following skill sets: Data Science, Machine
                  Learning, Deep Learning, Natural Language Processing, Python
                  Programming, Algorithm Design, Database/Webserver
                  Development, and Mobile App Design.
                  <br />
                  <br />
                  Contact Prof. Ganesh Bagler with a brief resume, including
                  your GitHub and Kaggle profiles, and a brief description of
                  the projects implemented.
                </div>
                <div style={{ marginTop: "2px" }}>
                  <a href="#contact-section" className="btn btn-sm btn-clean">
                    Get in touch
                  </a>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-sm-6">
              <div
                className="banner-image animated fadeInUp"
                style={{ animationDelay: animationDelay }}
              >
                <img
                  id="opportunities-image"
                  src={opportunitiesImage}
                  alt="Man with opportunities paper looking towards the Complex Systems Laboratory"
                  style={{ width: "70%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sep-section"></div>
    </section>
  );
};

export default OpportunitiesSection;
