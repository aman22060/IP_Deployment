import React from "react";
import sustainImg from "../assets/images/sustainability.png"; // Update the image path if necessary

const NewFeatureSection = () => {
  return (
    <section>
      <div id="features-section" className="pad-sec">
        <div className="container">
          {/* Title Section */}
          <div
            className="title-section text-center wow fadeInUp"
            data-wow-delay="0"
          >
            <div className="row">
              <div className="col-sm-8 offset-sm-2">
                <hr />
                <p style={{ fontWeight: 900 }}>
                  Making Food Computable with Data Science and Artificial
                  Intelligence.
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="row">
            {/* Left Features */}
            <div className="col-md-3 without-padding">
              <div className="left-features-services">
                <ul className="features-list">
                  {/* Feature 1 */}
                  <li>
                    <div
                      className="left-features-box wow fadeInLeft"
                      data-wow-delay="0"
                    >
                      <a
                        href="https://cosylab.iiitd.edu.in/recipedb/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="iconbox">
                          <i className="icon-mobile"></i>
                        </span>
                      </a>
                      <div className="features-box-content">
                        <h6>
                          <a
                            href="https://cosylab.iiitd.edu.in/recipedb/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            RecipeDB
                          </a>
                        </h6>
                        <p>A structured repository of recipes from across the globe</p>
                      </div>
                    </div>
                  </li>
                  {/* Feature 2 */}
                  <li>
                    <div
                      className="left-features-box wow fadeInLeft"
                      data-wow-delay="0"
                    >
                      <a
                        href="https://cosylab.iiitd.edu.in/flavordb/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="iconbox">
                          <i className="icon-browser"></i>
                        </span>
                      </a>
                      <div className="features-box-content">
                        <h6>
                          <a
                            href="https://cosylab.iiitd.edu.in/flavordb/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            FlavorDB
                          </a>
                        </h6>
                        <p>A repository of flavor molecules found in food ingredients</p>
                      </div>
                    </div>
                  </li>
                  {/* Feature 3 */}
                  <li>
                    <div
                      className="left-features-box wow fadeInLeft"
                      data-wow-delay="0"
                    >
                      <a
                        href="https://cosylab.iiitd.edu.in/spicerx/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="iconbox">
                          <i className="icon-strategy"></i>
                        </span>
                      </a>
                      <div className="features-box-content">
                        <h6>
                          <a
                            href="https://cosylab.iiitd.edu.in/spicerx/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            SpiceRx
                          </a>
                        </h6>
                        <p>
                          A platform for exploring the health impacts of culinary herbs
                          and spices
                        </p>
                      </div>
                    </div>
                  </li>
                  {/* Feature 4 */}
                  <li>
                    <div
                      className="left-features-box wow fadeInLeft"
                      data-wow-delay="0"
                    >
                      <a
                        href="https://cosylab.iiitd.edu.in/dietrx/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="iconbox">
                          <i className="icon-hotairballoon"></i>
                        </span>
                      </a>
                      <div className="features-box-content">
                        <h6>
                          <a
                            href="https://cosylab.iiitd.edu.in/dietrx/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            DietRx
                          </a>
                        </h6>
                        <p>A platform for exploring the health impact of dietary ingredients</p>
                      </div>
                    </div>
                  </li>
                  {/* Feature 5 */}
                  <li>
                    <div
                      className="left-features-box wow fadeInLeft"
                      data-wow-delay="0"
                    >
                      <a
                        href="https://cosylab.iiitd.edu.in/SustainableFoodDB/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="iconbox">
                          <i className="icon-globe"></i>
                        </span>
                      </a>
                      <div className="features-box-content">
                        <h6>
                          <a
                            href="https://cosylab.iiitd.edu.in/SustainableFoodDB/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            SustainableFoodDB
                          </a>
                        </h6>
                        <p>A repository of carbon footprints of recipes</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Center Image */}
            <div className="col-md-6">
              <div className="features-image wow fadeInUp" data-wow-delay="0">
                <div className="crystal-globe-container">
                  <img
                    id="crystal-globe"
                    src={sustainImg}
                    alt="An Earth that is shrouded in mist like a crystal ball"
                  />
                </div>
              </div>
            </div>

            {/* Right Features */}
            <div className="col-md-3 without-padding">
              <div className="right-features-services">
                <ul className="features-list">
                  {/* Feature 1 */}
                  <li>
                    <div
                      className="right-features-box wow fadeInRight"
                      data-wow-delay="0"
                    >
                      <a
                        href="https://cosylab.iiitd.edu.in/ratatouille2/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="iconbox">
                          <i className="icon-tools-2"></i>
                        </span>
                      </a>
                      <div className="features-box-content">
                        <h6>
                          <a
                            href="https://cosylab.iiitd.edu.in/ratatouille2/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ratatouille
                          </a>
                        </h6>
                        <p>Generating novel recipes with Artificial Intelligence</p>
                      </div>
                    </div>
                  </li>
                  {/* Feature 2 */}
                  <li>
                    <div
                      className="right-features-box wow fadeInRight"
                      data-wow-delay="0"
                    >
                      <a
                        href="https://cosylab.iiitd.edu.in/bittersweet/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="iconbox">
                          <i className="icon-video"></i>
                        </span>
                      </a>
                      <div className="features-box-content">
                        <h6>
                          <a
                            href="https://cosylab.iiitd.edu.in/bittersweet/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            BitterSweet
                          </a>
                        </h6>
                        <p>A webserver for predicting BitterSweet taste molecules</p>
                      </div>
                    </div>
                  </li>
                  {/* Feature 3 */}
                  <li>
                    <div
                      className="right-features-box wow fadeInRight"
                      data-wow-delay="0"
                    >
                      <a
                        href="https://cosylab.iiitd.edu.in/sweetpred/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="iconbox">
                          <i className="icon-brain"></i>
                        </span>
                      </a>
                      <div className="features-box-content">
                        <h6>
                          <a
                            href="https://cosylab.iiitd.edu.in/sweetpred/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            SweetPred
                          </a>
                        </h6>
                        <p>State of the art ML algorithms to predict sweetness</p>
                      </div>
                    </div>
                  </li>
                  {/* Feature 4 */}
                  <li>
                    <div
                      className="right-features-box wow fadeInRight"
                      data-wow-delay="0"
                    >
                      <a
                        href="https://cosylab.iiitd.edu.in/foodle/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="iconbox">
                          <i className="icon-game-controller"></i>
                        </span>
                      </a>
                      <div className="features-box-content">
                        <h6>
                          <a
                            href="https://cosylab.iiitd.edu.in/foodle/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Foodle
                          </a>
                        </h6>
                        <p>A food-based word game to budge into eating better</p>
                      </div>
                    </div>
                  </li>
                  {/* Feature 5 */}
                  <li>
                    <div
                      className="right-features-box wow fadeInRight"
                      data-wow-delay="0"
                    >
                      <a
                        href="https://cosylab.iiitd.edu.in/ayurinfo/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="iconbox">
                          <i className="icon-presentation"></i>
                        </span>
                      </a>
                      <div className="features-box-content">
                        <h6>
                          <a
                            href="https://cosylab.iiitd.edu.in/ayurinfo/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ayurveda Informatics
                          </a>
                        </h6>
                        <p>A computable database of Ayurveda</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewFeatureSection;