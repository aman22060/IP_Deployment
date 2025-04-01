import React, { useEffect, useState } from "react";
import config from "../config.json"; // Adjust the path as needed

const SocialMediaSection = () => {
  const [tweets, setTweets] = useState({});
  const [linkedin, setLinkedin] = useState({});

  useEffect(() => {
    setTweets(config.tweets);
    setLinkedin(config.linkedin);

    // Load Twitter widgets script once
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const sectionStyles = {
    padding: "40px 0",
    backgroundColor: "#f9f9f9",
  };

  const titleStyles = {
    textAlign: "center",
    fontSize: "32px",
    color: "#333",
    marginBottom: "20px",
  };

  const hrStyles = {
    width: "50%",
    margin: "10px auto",
    border: "1px solid #ddd",
  };

  const tweetContainerStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  };

  const tweetItemStyles = {
    width: "30%",
    marginBottom: "20px",
  };

  const iframeStyles = {
    width: "100%",
    height: "300px",
    border: "0",
  };

  return (
    <section style={sectionStyles}>
      <div id="social-media-section" className="pad-sec">
        <div className="container">
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
              <div key={index} style={tweetItemStyles}>
                <blockquote className="twitter-tweet">
                  <a href={url}>Loading tweet...</a>
                </blockquote>
              </div>
            ))}
          </div>

          {/* LinkedIn Posts */}
          <div className="row" id="linkedinPostContainer">
            {Object.values(linkedin).map((url, index) => (
              <div key={index} style={tweetItemStyles}>
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
