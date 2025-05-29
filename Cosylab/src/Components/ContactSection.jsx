import React from "react";
import "../../public/assets/css/animate.css"; // Ensure animation styles are included
import "../../public/assets/css/style.css";  // Ensure your custom styles are linked

const ContactSection = () => {
  return (
    <section>
      {/* Contact Section */}
      <div id="contact-section" className="pad-sec">
        <div className="container">
          <div className="title-section text-center animated fadeInUp" data-delay="0">
            <div className="col-md-8 offset-md-2">
              <hr />
              <p>
                <b>Prof. Ganesh Bagler</b>
                <br />
                Infosys Center for Artificial Intelligence
                <br />
                Department of Computational Biology, IIIT-Delhi, New Delhi
                <br />
                <a href="mailto:bagler+cosylab@iiitd.ac.in">
                  <b>bagler+cosylab@iiitd.ac.in</b>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Embed */}
      <div className="google-map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2129.6069122613494!2d77.2722840356934!3d28.5453475028929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e45d85d3e3%3A0x691393414902968e!2sIIIT-Delhi%20R%26D%20Building!5e0!3m2!1sen!2sin!4v1664711432785!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactSection;
