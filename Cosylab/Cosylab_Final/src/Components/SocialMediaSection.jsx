import React, { useEffect, useState } from "react";
import config from "../config.json"; // Adjust the path as needed

const SocialMediaSection = () => {
  const [tweets, setTweets] = useState({});
  const [linkedin, setLinkedin] = useState({});
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    setTweets(config.tweets);
    setLinkedin(config.linkedin);

    // Load Twitter widgets script once
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
    
    // Set up responsive behavior
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive styles based on window width
  const getItemWidth = () => {
    if (windowWidth < 576) {
      return "100%"; // Mobile view - full width
    } else if (windowWidth < 992) {
      return "48%";  // Tablet view - 2 columns
    } else {
      return "30%";  // Desktop view - 3 columns
    }
  };

  // Styles
  const sectionStyles = {
    padding: windowWidth < 576 ? "30px 15px" : "40px 0",
    backgroundColor: "#f9f9f9",
    width: "100%",
    overflow: "hidden"
  };

  const containerStyles = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 15px",
    width: "100%",
    boxSizing: "border-box"
  };

  const titleStyles = {
    textAlign: "center",
    fontSize: windowWidth < 576 ? "24px" : "32px",
    color: "#333",
    marginBottom: windowWidth < 576 ? "15px" : "20px",
    fontWeight: "bold",
    transition: "font-size 0.3s ease"
  };

  const hrStyles = {
    width: windowWidth < 576 ? "75%" : "50%",
    margin: "10px auto 25px",
    border: "none",
    height: "2px",
    background: "linear-gradient(to right, rgba(255,182,193,0.1), rgba(255,182,193,0.8), rgba(255,182,193,0.1))"
  };

  const tweetContainerStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: windowWidth < 576 ? "center" : "space-between",
    gap: "20px",
    marginBottom: "30px"
  };

  const tweetItemStyles = {
    width: getItemWidth(),
    marginBottom: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    minHeight: "300px"
  };

  const iframeStyles = {
    width: "100%",
    height: windowWidth < 576 ? "350px" : "300px",
    border: "0",
    borderRadius: "0 0 8px 8px"
  };

  return (
    <section style={sectionStyles}>
      <div id="social-media-section" className="pad-sec">
        <div className="container" style={containerStyles}>
          {/* Title Section */}
          <div className="title-section animated out fadeInUp">
            <div className="row">
              <div className="col-sm-12">
                <h2 style={titleStyles}>LATEST SOCIAL MEDIA BUZZ</h2>
                <hr style={hrStyles} />
              </div>
            </div>
          </div>

          {/* Display Twitter posts */}
          <div className="row" id="tweetContainer" style={tweetContainerStyles}>
            {Object.values(tweets).map((url, index) => (
              <div 
                key={index} 
                style={tweetItemStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
                }}
              >
                <blockquote className="twitter-tweet" style={{margin: "0", padding: "15px"}}>
                  <a href={url}>Loading tweet...</a>
                </blockquote>
              </div>
            ))}
          </div>

          {/* LinkedIn Posts */}
          <div className="row" id="linkedinPostContainer" style={tweetContainerStyles}>
            {Object.values(linkedin).map((url, index) => (
              <div 
                key={`linkedin-${index}`} 
                style={tweetItemStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";
                }}
              >
                <iframe
                  src={url}
                  title={`LinkedIn Post ${index + 1}`}
                  style={iframeStyles}
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;