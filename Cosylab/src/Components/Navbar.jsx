import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/assets/css/style.css";
import cosylab_logo from "../../public/assets/images/cosylab_logo.png";
import { UserCircle } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled curved-navbar" : ""}`}>
      <nav
        className={`navbar navbar-default navbar-expand-lg ${
          isScrolled ? "navbar-dark" : "navbar-transparent"
        }`}
      >
        <div className="container">
          <a
            className="navbar-brand d-flex align-items-center"
            href="#hero-section"
          >
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
            onClick={toggleCollapse}
            aria-controls="navigation-nav"
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
            id="navigation-nav"
          >
            <ul className="navbar-nav ms-auto">
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
                <a className="nav-link" href="#talks-section">
                  Talks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#opportunities-section">
                  Opportunities
                </a>
              </li>
              {/* Desktop-only admin icon */}
              <li className="nav-item d-none d-lg-block">
                <a
                  className="nav-link admin-link"
                  href={
                    import.meta.env.VITE_ADMIN_FRONTEND_URL
                  }
                >
                  <UserCircle className="admin-icon" />
                </a>
              </li>
              {/* Mobile-only admin text link */}
              <li className="nav-item d-lg-none">
                <div className="divider"></div>
                <a
                  className="nav-link admin-text-link"
                  href={
                    import.meta.env.VITE_ADMIN_FRONTEND_URL
                  }
                >
                  <div className="user-icon-container d-flex justify-content-center">
                    <svg
                      className="user-icon"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <circle
                        cx="12"
                        cy="7"
                        r="5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M2 21v-2a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7v2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="admin-text">Admin Portal</span>
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
