import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import apiImage from "../assets/images/temp/CGAS_API.png"; 
import '../assets/css/animate.css';

const ApiServicesSection = () => {
  const [animationDelay, setAnimationDelay] = useState('0s'); 


  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDelay('1s'); 
    }, 1000);

    if (window.$) {
      $(document).ready(function () {

        $(window).stellar({
          horizontalScrolling: false,
          verticalOffset: 40,
        });
      });
    }

    return () => clearTimeout(timer); 
  }, []);

  return (
    <section>
      <div id="banner-services" data-stellar-background-ratio="0.5">
        <div className="container">
          <div className="row">

            <div className="col-sm-6">
              <div className="banner-content animated out " data-animation="fadeInUp" data-delay="0">
                <h3 className="banner-heading">Looking for API services?</h3>
                <div className="banner-decription">
                  The APIs for RecipeDB and FlavorDB are now available for commercial applications.
                </div>
                <div>
                  <a href="#contact-section" className="btn btn-sm btn-clean">Get in touch</a>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="banner-image animated fadeInUp"
                style={{ animationDelay: animationDelay }}>
                <img id="API-image" src={apiImage} alt="Api Image" height="400px" width="400px" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ApiServicesSection;