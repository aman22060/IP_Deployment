import React, { useEffect, useState } from "react";

const SocialMediaSection = () => {
  const [tweets, setTweets] = useState([]);
  const [linkedin, setLinkedin] = useState([]);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all social posts, then split and sort by platform
  useEffect(() => {
    fetch("http://localhost:3005/social-media")
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // First, extract and order twitter URLs
        const tw = data
          .filter((p) => p.platform === "twitter")
          .map((p) => p.url);
        // Then LinkedIn embed URLs
        const li = data
          .filter((p) => p.platform === "linkedin")
          .map((p) => p.url);
        setTweets(tw);
        setLinkedin(li);
      })
      .catch((err) => setError(err.message || "Failed to load social media feeds"))
      .finally(() => setLoading(false));

    // Load Twitter widgets script once
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    // Responsive resize handler
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getItemWidth = () => {
    if (windowWidth < 576) return "100%";
    if (windowWidth < 992) return "48%";
    return "30%";
  };

  // Styles (unchanged)
  const sectionStyles = {
    padding: windowWidth < 576 ? "30px 15px" : "40px 0",
    backgroundColor: "#f9f9f9",
    width: "100%",
    overflow: "hidden",
  };
  const containerStyles = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 15px",
    width: "100%",
    boxSizing: "border-box",
  };
  const titleStyles = {
    textAlign: "center",
    fontSize: windowWidth < 576 ? "24px" : "32px",
    color: "#333",
    marginBottom: windowWidth < 576 ? "15px" : "20px",
    fontWeight: "bold",
    transition: "font-size 0.3s ease",
  };
  const hrStyles = {
    width: windowWidth < 576 ? "75%" : "50%",
    margin: "10px auto 25px",
    border: "none",
    height: "2px",
    background:
      "linear-gradient(to right, rgba(255,182,193,0.1), rgba(255,182,193,0.8), rgba(255,182,193,0.1))",
  };
  const tweetContainerStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: windowWidth < 576 ? "center" : "space-between",
    gap: "20px",
    marginBottom: "30px",
  };
  const tweetItemStyles = {
    width: getItemWidth(),
    marginBottom: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    minHeight: "300px",
  };
  const iframeStyles = {
    width: "100%",
    height: windowWidth < 576 ? "550px" : "500px",
    border: "0",
    borderRadius: "0 0 8px 8px",
  };

  if (loading) {
    return (
      <section style={sectionStyles}>
        <p style={{ textAlign: "center" }}>Loading social media feeds…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section style={sectionStyles}>
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      </section>
    );
  }

  return (
    <section style={sectionStyles}>
      <div id="social-media-section" className="pad-sec">
        <div style={containerStyles}>
          <div className="title-section">
            <h2 style={titleStyles}>LATEST SOCIAL MEDIA BUZZ</h2>
            <hr style={hrStyles} />
          </div>

          {/* Twitter posts first */}
          <div style={tweetContainerStyles}>
            {tweets.map((url, i) => (
              <div
                key={i}
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
                <blockquote className="twitter-tweet" style={{ margin: 0, padding: "15px" }}>
                  <a href={url}>Loading tweet…</a>
                </blockquote>
              </div>
            ))}
          </div>

          {/* Then LinkedIn posts */}
          <div style={tweetContainerStyles}>
            {linkedin.map((url, i) => (
              <div
                key={i}
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
                  title={`LinkedIn Post ${i + 1}`}
                  style={iframeStyles}
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
