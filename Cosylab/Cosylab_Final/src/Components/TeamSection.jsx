import React, { useEffect, useState, useRef } from "react";
import "../assets/css/dark-mode.css";
import "../assets/css/style.css";

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("http://localhost:3005/team-members");
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="team-section" style={{ padding: "70px 0", backgroundColor: "#e0e0e0" }}>
      <div className="container" style={{ maxWidth: "100%", padding: "0 5%" }}>
        <div className="title-section text-center">
          <h2 style={{ fontFamily: "serif", fontSize: "3em", fontWeight: "bold" }}>The Team</h2>
          <p style={{ color: "#666", marginBottom: "50px" }}>Setting the foundations of data-driven food innovations</p>
        </div>

        <div className="team-slider-wrapper" style={{ 
          position: "relative", 
          display: "flex", 
          alignItems: "center", 
          overflow: "hidden"
        }}>
          {/* Left Scroll Button */}
          <button 
            onClick={scrollLeft} 
            className="scroll-btn left"
            style={{
              position: "absolute",
              left: "10px",
              zIndex: 10,
              background: "none",
              border: "none",
              fontSize: "2em",
              cursor: "pointer"
            }}
          >
            &#8249;
          </button>

          {/* Team Members Slider */}
          <div
            className="team-slider"
            ref={sliderRef}
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "20px",
              paddingBottom: "15px",
              whiteSpace: "nowrap",
              scrollBehavior: "smooth",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none" // IE/Edge
            }}
          >
            {teamMembers.map((member) => (
              <div
                className="team-card"
                key={member.Id}
                style={{
                  flex: "0 0 auto",
                  width: "90%", // Adjust width dynamically
                  maxWidth: "350px", // Prevent excessive stretching
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "12px",
                  textAlign: "center",
                  boxShadow: "0 5px 10px rgba(0,0,0,0.15)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <div style={{
                  width: "100%",
                  height: "120px",
                  backgroundColor: "#e0e0e0",
                  position: "absolute",
                  top: "0",
                  left: 0,
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px"
                }}></div>

                {/* Profile Image */}
                <img
                  src={`data:image/jpeg;base64,${member.Image}`}
                  alt={member.Name}
                  style={{
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    margin: "0 auto 15px auto",
                    display: "block",
                    position: "relative",
                    zIndex: 2,
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />

                <h3 style={{ fontSize: "1.5em", marginBottom: "10px", fontWeight: "bold" }}>{member.Name}</h3>
                <p style={{ fontSize: "1.2em", fontWeight: "bold", color: "#555", marginBottom: "10px" }}>{member.Position}</p>
                <p style={{ fontSize: "1em", color: "#777", wordWrap: "break-word", padding: "0 10px", lineHeight: "1.5", maxWidth: "280px", margin: "0 auto", whiteSpace: "normal" }}>{member.About}</p>
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button 
            onClick={scrollRight} 
            className="scroll-btn right"
            style={{
              position: "absolute",
              right: "10px",
              zIndex: 10,
              background: "none",
              border: "none",
              fontSize: "2em",
              cursor: "pointer"
            }}
          >
            &#8250;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
