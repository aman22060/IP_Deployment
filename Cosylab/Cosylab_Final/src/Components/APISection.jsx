import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import apiImage from "../assets/images/temp/CGAS_API.png"; 
import '../assets/css/animate.css';

const ApiServicesSection = () => {
  const [animationDelay, setAnimationDelay] = useState('0s'); 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDelay('1s'); 
    }, 1000);

    // Check if window is available (for SSR compatibility)
    if (typeof window !== 'undefined') {
      // Set initial mobile state
      handleResize();
      
      // Add resize listener
      window.addEventListener('resize', handleResize);
    }

    // jQuery stellar initialization
    if (window.$) {
      $(document).ready(function () {
        $(window).stellar({
          horizontalScrolling: false,
          verticalOffset: 40,
        });
      });
    }

    return () => {
      clearTimeout(timer);
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    }; 
  }, []);

  // Handle window resize
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const styles = {
    section: {
      position: 'relative',
      width: '100%',
    },
    bannerServices: {
      background: 'url("../assets/images/temp/api-background.jpg") center bottom',
      position: 'relative',
      borderBottom: '1px solid transparent',
      padding: '40px 0',
      height: isMobile ? 'auto' : '420px',
      overflow: 'hidden',
    },
    overlay: {
      position: 'absolute',
      content: '""',
      top: 0,
      left: 0,
      background: 'rgba(5, 5, 5, 0.8)',
      width: '100%',
      height: '100%',
      zIndex: 2,
    },
    container: {
      position: 'relative',
      zIndex: 3,
      padding: '0 15px',
      maxWidth: '1170px',
      margin: '0 auto',
    },
    row: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      flexWrap: 'wrap',
      margin: '0 -15px',
      alignItems: 'center',
    },
    colSm6: {
      position: 'relative',
      minHeight: '1px',
      padding: '0 15px',
      flex: '0 0 50%',
      maxWidth: isMobile ? '100%' : '50%',
    },
    bannerContent: {
      margin: isMobile ? '20px 0' : '40px 0',
      color: '#fff',
      textAlign: isMobile ? 'center' : 'left',
    },
    bannerHeading: {
      color: '#fff',
      fontWeight: 400,
      letterSpacing: '2.6px',
      fontSize: isMobile ? '20px' : '22px',
      marginBottom: '15px',
      textTransform: 'uppercase',
    },
    bannerDescription: {
      fontWeight: 300,
      color: '#fff',
      fontSize: isMobile ? '14px' : '16px',
      marginBottom: '20px',
      lineHeight: '1.6',
    },
    button: {
      letterSpacing: '1.6px',
      marginTop: '20px',
      display: 'inline-block',
      padding: '10px 24px',
      backgroundColor: 'transparent',
      color: '#fff',
      border: '1px solid #fff',
      borderRadius: '2px',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      fontWeight: 400,
      textTransform: 'uppercase',
      fontSize: '12px',
    },
    bannerImage: {
      display: 'flex',
      justifyContent: isMobile ? 'center' : 'flex-end',
      alignItems: 'center',
      height: '100%',
      marginTop: isMobile ? '20px' : '0',
    },
    apiImage: {
      borderRadius: '50%',
      background: '#e0e0e0',
      boxShadow: '10px 10px 20px #5a5a5a, -10px -10px 20px #ffffff',
      maxWidth: isMobile ? '260px' : '380px',
      width: '100%',
      height: 'auto',
      transition: 'transform 0.3s ease',
      border: '4px solid rgba(255, 255, 255, 0.1)',
    }
  };

  return (
    <section style={styles.section}>
      <div id="banner-services" style={styles.bannerServices} data-stellar-background-ratio="0.5">
        {/* Overlay div to ensure proper z-index stacking */}
        <div style={styles.overlay}></div>
        
        <div className="container" style={styles.container}>
          <div className="row" style={styles.row}>
            <div className="col-sm-6" style={styles.colSm6}>
              <div 
                className="banner-content animated fadeInUp" 
                style={{
                  ...styles.bannerContent,
                  animationDelay: '0s'
                }}
              >
                <h3 className="banner-heading" style={styles.bannerHeading}>
                  Looking for API services?
                </h3>
                <div className="banner-description" style={styles.bannerDescription}>
                  The APIs for RecipeDB and FlavorDB are now available for commercial applications.
                </div>
                <div>
                  <a 
                    href="#contact-section" 
                    className="btn btn-sm btn-clean"
                    style={styles.button}
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            </div>

            <div className="col-sm-6" style={styles.colSm6}>
              <div 
                className="banner-image animated fadeInUp"
                style={{
                  ...styles.bannerImage,
                  animationDelay: animationDelay
                }}
              >
                <img 
                  id="API-image" 
                  src={apiImage} 
                  alt="Api Image" 
                  style={styles.apiImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApiServicesSection;