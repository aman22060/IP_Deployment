import React, { useState, useEffect } from 'react';

// Framer Motion
import { AnimatePresence, motion } from 'framer-motion';

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
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Optional fadeInUp animation variant example
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={fadeInUp}
      >
        <HeadSection />
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <HeroSection />
        <OfferSection />
        <NewFeatureSection />
        {/* <FeaturesSection /> */}
        <APISection />
        <TeamSection />
        <NewsSection />
        <SocialMediaSection />
        <Publications />
        <TalksSection />
        <OpportunitiesSection />
        <ContactSection />
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
