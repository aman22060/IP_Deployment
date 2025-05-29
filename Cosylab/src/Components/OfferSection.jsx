import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { motion } from "framer-motion";

// Animation variants
const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Mapping animation string to variants
const animationVariants = {
  fadeInLeft,
  fadeInUp,
  fadeInRight,
};

const OfferSection = () => {
  const offers = [
    {
      icon: "fas fa-database",
      title: "CREATING FOOD DATABASES",
      description:
        "We build keystone data repositories for food. RecipeDB, FlavorDB, BitterSweet, DietRx, SpiceRx & Ayurveda Informatics.",
      animation: "fadeInLeft",
    },
    {
      icon: "fas fa-code",
      title: "BUILDING ALGORITHMS",
      description:
        "We create algorithms for analyzing food data. Food pairing analysis, culinary fingerprints, taste & sweetness prediction.",
      animation: "fadeInUp",
    },
    {
      icon: "fas fa-utensils",
      title: "GENERATING NOVEL RECIPES",
      description:
        "Among other exciting things, we are 'generating novel recipes' using artificial intelligence.",
      animation: "fadeInRight",
    },
  ];

  return (
    <section>
      <div id="landing-offer" className="pad-sec">
        <div className="container">
          {/* Title Section */}
          <motion.div
            className="title-section big-title-sec"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            style={{ paddingBottom: 50 }}
          >
            <div className="row">
              <div className="col-sm-8 offset-sm-2 text-center">
                <h1 className="big-subtitle">We make food computable</h1>
                <hr />
                <p className="about-text">
                  'Computational Gastronomy' presents an all-new paradigm for
                  data-driven investigations of food and cooking, considered to
                  be artistic endeavors.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Offer Boxes */}
          <div className="offer-boxes">
            <div className="row justify-content-center">
              {offers.map(({ icon, title, description, animation }, idx) => (
                <div
                  key={idx}
                  className="col-md-4 col-sm-10 mb-4"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <motion.div
                    className="offer-post text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={animationVariants[animation]}
                    style={{
                      maxWidth: 400,
                      padding: 20,
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      borderRadius: 8,
                      backgroundColor: "#fff",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div className="offer-icon" style={{ marginBottom: 15 }}>
                      <i
                        className={icon}
                        style={{ color: "#FF7F50", fontSize: 48 }}
                        aria-hidden="true"
                      />
                    </div>
                    <h4>{title}</h4>
                    <p>{description}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Separator Section */}
      <div className="sep-section" />
    </section>
  );
};

export default OfferSection;
