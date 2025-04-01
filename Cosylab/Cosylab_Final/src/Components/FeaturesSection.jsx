import React from "react";

const FeaturesSection = () => {
  return (
    <section id="features-section" style={{ backgroundColor: "#f9f9f9", padding: "50px 0" }}>
      <div className="container">
        {/* Title Section */}
        <div className="title-section text-center">
          <h2 style={{ fontSize: "32px", fontWeight: "600", color: "#333" }}>Our Features</h2>
          <hr style={{ width: "50px", margin: "10px auto", border: "2px solid #ff5733" }} />
        </div>

        {/* Features Content */}
        <div className="row">
          {/* Image Section */}
          <div className="col-md-6 features-image">
            <img
              src="feature-image.jpg"
              alt="Features"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
            />
          </div>

          {/* Features List */}
          <div className="col-md-6">
            <ul className="features-list">
              {/* Feature 1 */}
              <li className="d-flex align-items-start">
                <div className="iconbox">
                  <i className="fas fa-check-circle" style={{ fontSize: "32px", color: "#007bff" }}></i>
                </div>
                <div className="features-box-content">
                  <h6 style={{ fontSize: "18px", fontWeight: "600", color: "#333" }}>Feature 1</h6>
                  <p style={{ fontSize: "14px", color: "#555" }}>Description of feature 1.</p>
                </div>
              </li>

              {/* Feature 2 */}
              <li className="d-flex align-items-start">
                <div className="iconbox">
                  <i className="fas fa-star" style={{ fontSize: "32px", color: "#f39c12" }}></i>
                </div>
                <div className="features-box-content">
                  <h6 style={{ fontSize: "18px", fontWeight: "600", color: "#333" }}>Feature 2</h6>
                  <p style={{ fontSize: "14px", color: "#555" }}>Description of feature 2.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
