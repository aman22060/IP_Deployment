// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Dashboard      from "./components/Dashboard";
import TeamMembers    from "./components/teamMembers";
import Talks           from "./components/talks";
import NewsSection     from "./components/newSection";
import Publication     from "./components/Publication";
import SocialMedia     from "./components/socialMedia";
import Navbar          from "./components/Navbar";
import Login           from "./components/Login";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch("/auth-status", {
      method: "GET",
      credentials: "include",
      headers: { "Accept": "application/json" }
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(({ authenticated }) => setIsAuthenticated(authenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  // while checking auth, show loading indicator
  if (isAuthenticated === null) {
    return <div style={{ textAlign: 'center', marginTop: 50, color: '#fff' }}>Loading...</div>;
  }

  return (
    <Router>
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/" replace />
              : <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />

        <Route
          path="/"
          element={
            isAuthenticated
              ? <Dashboard />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/team-members"
          element={
            isAuthenticated
              ? <TeamMembers />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/talks"
          element={
            isAuthenticated
              ? <Talks />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/news-section"
          element={
            isAuthenticated
              ? <NewsSection />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/publication"
          element={
            isAuthenticated
              ? <Publication />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/social-media"
          element={
            isAuthenticated
              ? <SocialMedia />
              : <Navigate to="/login" replace />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
