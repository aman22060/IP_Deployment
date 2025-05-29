import React from "react";
import "../../public/assets/css/style.css";  // Ensure the custom styles are imported

const Footer = () => {
  return (
    <footer>
      <div id="footer-section" className="text-center">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 offset-sm-2">
              <ul className="footer-social-links">
                <li className="offer-icon">
                  <a
                    href="https://scholar.google.com/citations?hl=en&user=qyth_0QAAAAJ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-solid fa-graduation-cap social-media-icon"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://in.linkedin.com/in/ganeshbagler"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-linkedin social-media-icon"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Ganesh_Bagler"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-wikipedia-w social-media-icon"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/cosylabiiit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-github social-media-icon"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/gansbags"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-twitter social-media-icon"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/ganesh.bagler"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-facebook social-media-icon"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/gansbags/?hl=bg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-instagram social-media-icon"></i>
                  </a>
                </li>
              </ul>
              <p className="copyright">
                &copy; 2022 Created by{" "}
                <a href="https://cosylab.iiitd.edu.in" target="_blank" rel="noopener noreferrer">
                  CoSyLab, IIIT-Delhi
                </a>
              </p>
            </div> {/* End col-sm-8 */}
          </div> {/* End row */}
        </div> {/* End container */}
      </div> {/* End footer-section */}
    </footer>
  );
};

export default Footer;
