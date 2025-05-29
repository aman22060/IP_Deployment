import React from "react";
import { motion } from "framer-motion";
import sustainImg from "../../public/assets/images/sustainability.png";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const NewFeatureSection = () => {
  return (
    <section>
      <div id="features-section" className="pad-sec">
        <div className="container">
          {/* Title Section */}
          <motion.div
            className="title-section text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="row">
              <div className="col-sm-8 offset-sm-2">
                <hr />
                <p style={{ fontWeight: 900 }}>
                  Making Food Computable with Data Science and Artificial Intelligence.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="row">
            {/* Left Features */}
            <motion.div
              className="col-md-3 without-padding"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              <div className="left-features-services">
                <ul className="features-list">
                  {[
                    {
                      name: "RecipeDB",
                      link: "https://cosylab.iiitd.edu.in/recipedb/",
                      icon: "icon-mobile",
                      desc: "A structured repository of recipes from across the globe",
                    },
                    {
                      name: "FlavorDB",
                      link: "https://cosylab.iiitd.edu.in/flavordb/",
                      icon: "icon-browser",
                      desc: "A repository of flavor molecules found in food ingredients",
                    },
                    {
                      name: "SpiceRx",
                      link: "https://cosylab.iiitd.edu.in/spicerx/",
                      icon: "icon-strategy",
                      desc: "A platform for exploring the health impacts of culinary herbs and spices",
                    },
                    {
                      name: "DietRx",
                      link: "https://cosylab.iiitd.edu.in/dietrx/",
                      icon: "icon-hotairballoon",
                      desc: "A platform for exploring the health impact of dietary ingredients",
                    },
                    {
                      name: "SustainableFoodDB",
                      link: "https://cosylab.iiitd.edu.in/SustainableFoodDB/",
                      icon: "icon-globe",
                      desc: "A repository of carbon footprints of recipes",
                    },
                  ].map((feature, idx) => (
                    <li key={idx}>
                      <motion.div
                        variants={fadeInLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="left-features-box"
                      >
                        <a href={feature.link} target="_blank" rel="noopener noreferrer">
                          <span className="iconbox">
                            <i className={feature.icon}></i>
                          </span>
                        </a>
                        <div className="features-box-content">
                          <h6>
                            <a href={feature.link} target="_blank" rel="noopener noreferrer">
                              {feature.name}
                            </a>
                          </h6>
                          <p>{feature.desc}</p>
                        </div>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Center Image */}
            <motion.div
              className="col-md-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="features-image">
                <div className="crystal-globe-container">
                  <img
                    id="crystal-globe"
                    src={sustainImg}
                    alt="An Earth that is shrouded in mist like a crystal ball"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Features */}
            <motion.div
              className="col-md-3 without-padding"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
            >
              <div className="right-features-services">
                <ul className="features-list">
                  {[
                    {
                      name: "Ratatouille",
                      link: "https://cosylab.iiitd.edu.in/ratatouille2/",
                      icon: "icon-tools-2",
                      desc: "Generating novel recipes with Artificial Intelligence",
                    },
                    {
                      name: "BitterSweet",
                      link: "https://cosylab.iiitd.edu.in/bittersweet/",
                      icon: "icon-video",
                      desc: "A webserver for predicting BitterSweet taste molecules",
                    },
                    {
                      name: "SweetPred",
                      link: "https://cosylab.iiitd.edu.in/sweetpred/",
                      icon: "icon-brain",
                      desc: "State of the art ML algorithms to predict sweetness",
                    },
                    {
                      name: "Foodle",
                      link: "https://cosylab.iiitd.edu.in/foodle/",
                      icon: "icon-game-controller",
                      desc: "A food-based word game to budge into eating better",
                    },
                    {
                      name: "Ayurveda Informatics",
                      link: "https://cosylab.iiitd.edu.in/ayurinfo/",
                      icon: "icon-presentation",
                      desc: "A computable database of Ayurveda",
                    },
                  ].map((feature, idx) => (
                    <li key={idx}>
                      <motion.div
                        variants={fadeInRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="right-features-box"
                      >
                        <a href={feature.link} target="_blank" rel="noopener noreferrer">
                          <span className="iconbox">
                            <i className={feature.icon}></i>
                          </span>
                        </a>
                        <div className="features-box-content">
                          <h6>
                            <a href={feature.link} target="_blank" rel="noopener noreferrer">
                              {feature.name}
                            </a>
                          </h6>
                          <p>{feature.desc}</p>
                        </div>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewFeatureSection;
