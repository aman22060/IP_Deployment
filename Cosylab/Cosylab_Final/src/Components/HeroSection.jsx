import React, { useState, useEffect } from "react";
import "../assets/css/style.css"; 

// Import the hero image
import heroImage from "../assets/images/hero-bg/hero_bg.jpg"; 

const HeroSection = () => {
  const [zoomIn, setZoomIn] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const captions = [
    { title: "Complex Systems Lab", subtitle: "The Ground Zero of Computational Gastronomy" },
    { title: "Complex Systems Lab", subtitle: "Making Food Computable" },
    { title: "Complex Systems Lab", subtitle: "Transforming Food with Artificial Intelligence" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setZoomIn(true);
    }, 300);

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % captions.length);
    }, 3000); // Change caption every 3 seconds

    return () => clearInterval(interval);
  }, [captions.length]);

  return (
    <section 
      id="hero-section" 
      className={`landing-hero ${zoomIn ? "zoom-in" : ""}`} 
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="hero-content">
        <div className="container">
          <div className="row justify-content-center text-center"> 
            <div className="col-md-10 col-lg-8">
              <div className="hero-text">
                <div className="herolider">
                  <ul className="caption-slides">
                    {captions.map((caption, index) => (
                      <li 
                        key={index} 
                        className={`caption ${index === activeIndex ? "active" : ""}`} 
                      >
                        <h1>{caption.title}</h1>
                        <div className="div-line"></div>
                        <p className="hero">{caption.subtitle}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="hero-btn">
                <a href="#landing-offer" className="btn btn-clean">
                  Know more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;