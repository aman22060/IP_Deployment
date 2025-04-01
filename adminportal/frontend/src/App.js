
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Adjusted for consistency
import TeamMember from './components/teamMembers'; // Adjusted for consistency
import Talks from './components/talks';
import Navbar from './components/Navbar';
import NewsSection from './components/newSection';
import Publication from './components/Publication';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/team-member" element={<TeamMember />} />
          <Route path="/talks" element={<Talks />} />
          <Route path="/newSection" element={<NewsSection />} />
          <Route path="/publication" element={<Publication />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
