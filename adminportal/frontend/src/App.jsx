import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Components
import Dashboard from "./components/Dashboard";
import TeamMembers from "./components/teamMembers";
import Talks from "./components/talks";
import NewsSection from "./components/newSection";
import Publication from "./components/Publication";
import SocialMedia from "./components/socialMedia";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    fetch("/auth-status", {
      method: "GET",
      credentials: "include",
      headers: { "Accept": "application/json" },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(({ authenticated }) => setIsAuthenticated(authenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  // Show loading screen while checking auth
  if (isAuthenticated === null) {
    return (
      <div style={{ textAlign: "center", marginTop: 50, color: "#333" }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      {/* Show navbar only when logged in */}
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}

      <Routes>
        {/* Homepage shows login or redirects to dashboard */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/team-members"
          element={
            isAuthenticated ? <TeamMembers /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/talks"
          element={
            isAuthenticated ? <Talks /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/news-section"
          element={
            isAuthenticated ? <NewsSection /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/publication"
          element={
            isAuthenticated ? <Publication /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/social-media"
          element={
            isAuthenticated ? <SocialMedia /> : <Navigate to="/" replace />
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
