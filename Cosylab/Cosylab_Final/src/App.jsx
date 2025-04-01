import React, { useEffect, useState } from 'react';

// CSS Imports
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import './assets/css/animate.css';
import './assets/css/bootstrap.min.css';
import './assets/css/font-awesome.min.css';
import './assets/css/style.css';
import './assets/css/bxslider/jquery.bxslider.css';
import './assets/css/et-line-font/style.css';
import './assets/css/magnific-popup/magnific-popup.css';
import './assets/css/owl-carousel/owl.carousel.css';
import './assets/css/owl-carousel/owl.theme.css';
import './assets/css/owl-carousel/owl.transitions.css';
import './assets/css/dark-mode.css'; // Add dark mode styles

// JS Imports
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

// Animation Library
import WOW from 'wowjs';
import 'animate.css';

// Components
import HeadSection from './Components/HeadSection';
import Navbar from './Components/Navbar';
import HeroSection from './Components/HeroSection';
import OfferSection from './Components/OfferSection';
import FeaturesSection from './Components/FeaturesSection';
import APISection from './Components/APISection';
import TeamSection from './Components/TeamSection';
import NewsSection from './Components/NewsSection';
import SocialMediaSection from './Components/SocialMediaSection';
import Publications from './Components/Publications';
import TalksSection from './Components/TalksSection';
import OpportunitiesSection from './Components/OpportunitiesSection';
import ContactSection from './Components/ContactSection';
import Footer from './Components/Footer';

import NewFeatureSection from './Components/NewFeatureSection';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Initialize WOW.js
    const wow = new WOW.WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true,
    });
    wow.init();

    // Apply the saved theme
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div>
      {/* Head Section */}
      <HeadSection />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Offer Section */}
      <OfferSection />
      <NewFeatureSection />

      {/* Features Section */}
      {/* <FeaturesSection /> */}

      {/* API Section */}
      <APISection />

      {/* Team Section */}
      <TeamSection />

      {/* News Section */}
      <NewsSection />

      {/* Social Media Section */}
      <SocialMediaSection />

      {/* Publications */}
      <Publications />

      {/* Talks Section */}
      <TalksSection />

      {/* Opportunities Section */}
      <OpportunitiesSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
