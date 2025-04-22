// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import bgImage from "../components/Bgimg.jpeg";
import { Box, Typography } from "@mui/material";

/* ────────────────────────────────────────────────────────────── */
/*                            Styles                             */
/* ────────────────────────────────────────────────────────────── */
const styles = {
  container: {
    position:       "relative",
    width:          "100vw",
    minHeight:      "100vh",
    backgroundImage:`url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    inset:    0,
    bgcolor:  "rgba(0, 0, 0, 0.6)",
    zIndex:   1,
  },
  content: {
    position:     "relative",
    zIndex:       2,
    display:      "flex",
    alignItems:   "center",
    justifyContent:"center",
    px:           { xs: 2, sm: 4, md: 8 },
    py:           { xs: 4, md: 0 },
    minHeight:    "100vh",
  },
  card: {
    bgcolor:               "rgba(255,255,255,0.2)",
    backdropFilter:        "blur(12px)",
    WebkitBackdropFilter:  "blur(12px)",
    borderRadius:          2,
    boxShadow:             3,
    border:                "1px solid rgba(255,255,255,0.18)",
    px:                    { xs: 2, sm: 3, md: 4 },
    py:                    { xs: 4, sm: 5, md: 6 },
    maxWidth:              { xs: "90%", sm: "80%", md: 600 },
    width:                 "100%",
    textAlign:             "center",
  },
  title: {
    fontWeight: 700,
    color:      "#fff",
    fontSize:   { xs: "2rem", sm: "2.5rem", md: "3rem" },
    lineHeight: 1.2,
  },
  highlight: {
    color: "#2563eb",
  },
  caption: {
    mt:        2,
    fontStyle: "italic",
    color:     "#e0e0e0",
    fontSize:  { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
  },
};
/* ────────────────────────────────────────────────────────────── */

export default function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const captions = [
    "The Ground Zero of Computational Gastronomy",
    "Making Food Computable",
    "Transforming Food with Artificial Intelligence",
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % captions.length),
      3000
    );
    return () => clearInterval(interval);
  }, [captions.length]);

  return (
    <Box sx={styles.container}>
      {/* Dark overlay */}
      <Box sx={styles.overlay} />

      {/* Content wrapper */}
      <Box sx={styles.content}>
        {/* Glass card */}
        <Box sx={styles.card}>
          <Typography component="h1" sx={styles.title}>
            Welcome to{" "}
            <Box component="span" sx={styles.highlight}>
              Cosylab Admin Portal
            </Box>
          </Typography>

          <Typography component="p" sx={styles.caption}>
            {captions[currentSlide]}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
