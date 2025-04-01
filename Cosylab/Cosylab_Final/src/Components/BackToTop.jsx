import React, { useEffect } from 'react';
import '../assets/css/style.css';  // Make sure to include your CSS file here

const YourComponent = () => {

  useEffect(() => {
    // You can dynamically load the external scripts in the component.
    const scriptUrls = [
      'assets/js/jquery-1.11.3.min.js',
      'assets/js/bootstrap.min.js',
      'assets/js/bootstrap-hover-dropdown.min.js',
      'assets/js/jquery.appear.min.js',
      'assets/js/jquery.bxslider.min.js',
      'assets/js/jquery.owl.carousel.min.js',
      'assets/js/jquery.countTo.js',
      'assets/js/jquery.easing.1.3.js',
      'assets/js/jquery.imagesloaded.min.js',
      'assets/js/jquery.isotope.js',
      'assets/js/jquery.placeholder.js',
      'assets/js/jquery.smoothscroll.js',
      'assets/js/jquery.stellar.min.js',
      'assets/js/jquery.waypoints.js',
      'assets/js/jquery.fitvids.js',
      'assets/js/jquery.magnific-popup.min.js',
      'assets/js/jquery.ajaxchimp.min.js',
      'assets/js/jquery.countdown.js',
      'assets/js/jquery.navbar-scroll.js',
      'assets/js/main.js',
      'assets/js/paginga.jquery.js',
      'assets/js/paginga.jquery.min.js',
    ];

    scriptUrls.forEach(url => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      document.body.appendChild(script);

      // Cleanup script tags on unmount
      return () => {
        document.body.removeChild(script);
      };
    });

  }, []);

  return (
    <div>
      {/* Back-to-top */}
      <div className="back-to-top">
        <i className="fa fa-angle-up fa-3x"></i>
      </div>

      {/* Video Container */}
      <div className="video-con">
        <iframe
          src="https://www.youtube.com/embed/your-video-id"  // Replace with your video ID
          title="Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Optionally, DataTables code can be added here if needed */}
    </div>
  );
};

export default YourComponent;
