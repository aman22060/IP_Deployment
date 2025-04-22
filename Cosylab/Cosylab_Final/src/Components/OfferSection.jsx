import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const OfferSection = () => {
  return (
    <section>
      <div id="landing-offer" className="pad-sec">
        <div className="container">
          {/* Title Section */}
          <div
            className="title-section big-title-sec wow fadeInUp"
            data-wow-delay="0"
            style={{ paddingBottom: "50px" }}
          >
            <div className="row">
              <div className="col-sm-8 offset-sm-2">
                {/* Subtitle */}
                <h1 className="big-subtitle">We make food computable</h1>
                <hr />
                <p className="about-text">
                  'Computational Gastronomy' presents an all-new paradigm for
                  data-driven investigations of food and cooking, considered to
                  be artistic endeavors.
                </p>
              </div>
            </div>
          </div>

          {/* Offer Boxes */}
          <div className="offer-boxes">
            <div className="row justify-content-center">
              {/* Box 1 */}
              <div className="col-md-4 col-sm-10 mb-4">
                <div
                  className="offer-post text-center wow fadeInLeft"
                  data-wow-delay="0"
                  style={{
                    maxWidth: "400px",
                    margin: "0 auto",
                    height: "100%",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    backgroundColor: "#fff"
                  }}
                >
                  <div className="offer-icon">
                    <i className="fas fa-database" style={{ color: "#FF7F50", fontSize: "48px" }}></i>
                  </div>
                  <h4>CREATING FOOD DATABASES</h4>
                  <p>
                    We build keystone data repositories for food. RecipeDB,
                    FlavorDB, BitterSweet, DietRx, SpiceRx & Ayurveda
                    Informatics.
                  </p>
                </div>
              </div>

              {/* Box 2 */}
              <div className="col-md-4 col-sm-10 mb-4">
                <div
                  className="offer-post text-center wow fadeInUp"
                  data-wow-delay="0"
                  style={{
                    maxWidth: "400px",
                    margin: "0 auto",
                    height: "100%",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    backgroundColor: "#fff"
                  }}
                >
                  <div className="offer-icon">
                    <i className="fas fa-code" style={{ color: "#FF7F50", fontSize: "48px" }}></i>
                  </div>
                  <h4>BUILDING ALGORITHMS</h4>
                  <p>
                    We create algorithms for analyzing food data. Food pairing
                    analysis, culinary fingerprints, taste & sweetness
                    prediction.
                  </p>
                </div>
              </div>

              {/* Box 3 */}
              <div className="col-md-4 col-sm-10 mb-4">
                <div
                  className="offer-post text-center wow fadeInRight"
                  data-wow-delay="0"
                  style={{
                    maxWidth: "400px",
                    margin: "0 auto",
                    height: "100%",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    backgroundColor: "#fff"
                  }}
                >
                  <div className="offer-icon">
                    <i className="fas fa-utensils" style={{ color: "#FF7F50", fontSize: "48px" }}></i>
                  </div>
                  <h4>GENERATING NOVEL RECIPES</h4>
                  <p>
                    Among other exciting things, we are 'generating novel
                    recipes' using artificial intelligence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Separator Section */}
      <section>
        <div className="sep-section"></div>
      </section>
    </section>
  );
};

export default OfferSection;