// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

/* ────────────────────────────────────────────────────────────── */
/*                         Style Constants                       */
/* ────────────────────────────────────────────────────────────── */
const glassStyles = {
  background:            "rgba(0, 0, 0, 0.4)",
  backdropFilter:        "blur(12px)",
  WebkitBackdropFilter:  "blur(12px)",
  boxShadow:             "0 4px 16px rgba(0,0,0,0.5)",
  border:                "1px solid rgba(255,255,255,0.2)",
};

const navStyles = {
  wrapper: {
    ...glassStyles,
    position:    "fixed",
    top:         16,
    left:        "50%",
    transform:   "translateX(-50%)",
    width:       "min(100% - 32px, 1300px)",
    padding:     "12px 24px",
    borderRadius:"16px",
    display:     "flex",
    alignItems:  "center",
    justifyContent: "space-between",
    zIndex:      100,
  },
  brand: {
    fontSize:   20,
    fontWeight: 700,
    color:      "#fff",
  },
  desktopMenu: {
    listStyle:  "none",
    margin:     0,
    padding:    0,
    display:    "flex",
    alignItems: "center",
    gap:        16,
  },
  linkBase: {
    display:        "block",
    padding:        "8px 14px",
    borderRadius:   8,
    fontSize:       15,
    fontWeight:     500,
    textDecoration: "none",
    transition:     "background .2s ease, color .2s ease",
    color:          "#fff",
  },
  hoverBg: "rgba(255,255,255,0.1)",
  activeLink: {
    background: "rgba(37, 99, 235, 0.8)",
    color:      "#fff",
  },
  logoutBtn: {
    display:      "inline-flex",
    alignItems:   "center",
    justifyContent:"center",
    padding:      "6px 12px",
    border:       "none",
    borderRadius: 6,
    background:   "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
    color:        "#fff",
    fontSize:     14,
    fontWeight:   500,
    cursor:       "pointer",
    transition:   "opacity .15s ease, box-shadow .15s ease",
  },
  mobileToggle: {
    background:   "none",
    border:       "none",
    padding:      4,
    fontSize:     24,
    cursor:       "pointer",
    color:        "#fff",
  },
  mobilePanel: {
    ...glassStyles,
    position:    "absolute",
    top:         "100%",
    left:        0,
    right:       0,
    marginTop:   8,
    borderRadius:12,
    overflow:    "hidden",
    zIndex:      99,
  },
  mobileMenu: {
    listStyle:     "none",
    margin:        0,
    padding:       12,
    display:       "flex",
    flexDirection: "column",
    gap:           8,
  },
};

const mergeStyles = (base, extra = {}) => ({ ...base, ...extra });

export default function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        setIsAuthenticated(false);
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Logout error', err);
    }
  };
  
  const navItems = [
    { label: "Dashboard",    to: "/" },
    { label: "Team Members", to: "/team-members" },
    { label: "Talks",        to: "/talks" },
    { label: "News",         to: "/news-section" },
    { label: "Publication",  to: "/publication" },
    { label: "Social Media", to: "/social-media" },
  ];

  return (
    <nav style={navStyles.wrapper}>
      <div style={navStyles.brand}>Cosylab Admin</div>

      {isMobile ? (
        <>
          <button
            style={navStyles.mobileToggle}
            aria-label="Toggle navigation"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
          <div style={{ ...navStyles.mobilePanel, display: open ? 'block' : 'none' }}>
            <ul style={navStyles.mobileMenu}>
              {navItems.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setOpen(false)}
                    style={
                      location.pathname === to
                        ? mergeStyles(navStyles.linkBase, navStyles.activeLink)
                        : navStyles.linkBase
                    }
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button style={{ ...navStyles.logoutBtn, width: '100%' }} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <ul style={navStyles.desktopMenu}>
          {navItems.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                style={
                  location.pathname === to
                    ? mergeStyles(navStyles.linkBase, navStyles.activeLink)
                    : navStyles.linkBase
                }
                onMouseEnter={(e) => (e.currentTarget.style.background = navStyles.hoverBg)}
                onMouseLeave={(e) => (e.currentTarget.style.background =
                  location.pathname === to
                    ? navStyles.activeLink.background
                    : 'transparent')}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button
              style={navStyles.logoutBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = 0.9;
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(255,255,255,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = 1;
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}