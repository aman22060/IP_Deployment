import React, { useEffect, useState, useRef } from "react";
import "../assets/css/dark-mode.css";
import "../assets/css/style.css";

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

    // Handle resize for responsiveness
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      const cardWidth = getCardWidth();
      sliderRef.current.scrollBy({ left: -cardWidth - 20, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth = getCardWidth();
      sliderRef.current.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
    }
  };

  // Calculate card width based on screen size - optimized for better fit
  const getCardWidth = () => {
    if (windowWidth <= 576) {
      return windowWidth * 0.9; // Increased from 0.8 to 0.9 to make sure it's not cut off
    } else if (windowWidth <= 992) {
      return 280; // Fixed width on tablets
    } else if (windowWidth <= 1200) {
      return 300; // Slightly smaller for laptops to fit 4 cards
    } else {
      return 320; // Fixed width on larger desktops
    }
  };

  // Cards per view based on screen size
  const getVisibleCards = () => {
    if (windowWidth <= 576) {
      return 1;
    } else if (windowWidth <= 992) {
      return 2;
    } else if (windowWidth <= 1200) {
      return 3;
    } else {
      return 4;
    }
  };

  return (
    <div id = 'team-section'>
    <div className="team-section" style={{ 
      padding: windowWidth <= 576 ? "40px 0" : "70px 0",
      backgroundColor: "#f5f5f7"
    }}>
      <div className="container" style={{ 
        maxWidth: "100%", 
        padding: windowWidth <= 768 ? "0 10px" : "0 3%" // Reduced padding from 15px to 10px on mobile and 5% to 3% on desktop
      }}>
        <div className="title-section text-center">
          <h2 style={{ 
            fontFamily: "serif", 
            fontSize: windowWidth <= 576 ? "2.2em" : "3em", 
            fontWeight: "bold",
            marginBottom: "10px" 
          }}>
            THE TEAM
          </h2>
          <p style={{ 
            color: "#666", 
            marginBottom: windowWidth <= 576 ? "30px" : "50px",
            fontSize: windowWidth <= 576 ? "0.9em" : "1em"
          }}>
            Setting the foundations of data-driven food innovations
          </p>
        </div>

        <div className="team-slider-container" style={{ 
          position: "relative", 
          padding: "0 35px", // Reduced side padding from 50px to 35px
          maxWidth: "1500px", // Increased from 1400px to 1500px to allow 4 cards on laptop
          margin: "0 auto"
        }}>
          {/* Left Scroll Button */}
          <button 
            onClick={scrollLeft} 
            className="scroll-btn left"
            aria-label="Previous team member"
            style={{
              position: "absolute",
              left: "0",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Team Members Slider */}
          <div
            className="team-slider"
            ref={sliderRef}
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "15px", // Reduced gap from 20px to 15px
              paddingBottom: "15px",
              scrollBehavior: "smooth",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
              WebkitScrollbar: { display: "none" }, // Fixed: Changed property name to WebkitScrollbar
              width: "100%", // Ensure it uses full width
              margin: "0 auto" // Center the slider
            }}
          >
            {teamMembers.map((member) => (
              <div
                className="team-card"
                key={member.Id}
                style={{
                  flex: "0 0 auto",
                  width: `${getCardWidth()}px`,
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "12px",
                  textAlign: "center",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: windowWidth <= 576 ? "0 auto" : "0",
                  transform: "none", // To override hover transform that might cause layout issues
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
                  }
                }}
              >
                <div style={{
                  width: "100%",
                  height: "120px",
                  backgroundColor: "#f0f0f5",
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
                    width: windowWidth <= 576 ? "140px" : "160px", // Slightly reduced from 150px/180px
                    height: windowWidth <= 576 ? "140px" : "160px", // Slightly reduced from 150px/180px
                    borderRadius: "50%",
                    margin: "0 auto 15px auto",
                    display: "block",
                    position: "relative",
                    zIndex: 2,
                    objectFit: "cover",
                    objectPosition: "center top",
                    border: "5px solid white",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
                  }}
                />

                <h3 style={{ 
                  fontSize: windowWidth <= 576 ? "1.2em" : "1.4em", // Slightly reduced from 1.3em/1.5em
                  marginBottom: "8px", 
                  fontWeight: "bold" 
                }}>
                  {member.Name}
                </h3>
                
                <p style={{ 
                  fontSize: windowWidth <= 576 ? "1.1em" : "1.2em", 
                  fontWeight: "bold", 
                  color: "#555", 
                  marginBottom: "8px" // Reduced from 10px
                }}>
                  {member.Position}
                </p>
                
                <p style={{ 
                  fontSize: windowWidth <= 576 ? "0.9em" : "1em", 
                  color: "#777", 
                  wordWrap: "break-word", 
                  padding: "0 8px", // Reduced from 10px
                  lineHeight: "1.5", 
                  maxWidth: "280px", 
                  margin: "0 auto", 
                  whiteSpace: "normal",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: "4",
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis"
                }}>
                  {member.About}
                </p>
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button 
            onClick={scrollRight} 
            className="scroll-btn right"
            aria-label="Next team member"
            style={{
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TeamSection;