import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/style.css";
import cosylab_logo from "../assets/images/cosylab_logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled curved-navbar" : ""}`}>
      <nav
        className={`navbar navbar-default navbar-expand-lg ${
          isScrolled ? "navbar-dark" : "navbar-transparent"
        }`}
      >
        <div className="container">
          <div className="navbar-header d-flex align-items-center">
            <a className="navbar-brand" href="#">
              <img
                src={cosylab_logo}
                alt="Cosylab Logo"
                className="navbar-logo"
              />
              <span className="navbar-brand-text">CoSyLab</span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navigation-nav"
              aria-controls="navigation-nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navigation-nav"
          >
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link" href="#features-section">
                  Resources
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#banner-services">
                  API
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#team-section">
                  Team
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#news-section">
                  News
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#social-media-section">
                  Social Media
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#publication-section">
                  Publications
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#screenshots-section">
                  Talks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#opportunities-section">
                  Opportunities
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
