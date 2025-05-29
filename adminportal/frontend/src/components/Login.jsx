import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../components/Bgimg.jpeg";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function Login({ setIsAuthenticated }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
      const res = await fetch(`${apiBaseUrl}/login`, {
        method: "POST",
        credentials: "include",  // Important to send and receive cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      let data;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      if (!res.ok) {
        setError(data.message || data || "Login failed");
        setPassword("");
        inputRef.current?.focus();
      } else {
        setIsAuthenticated(true);
        setPassword("");
        navigate("/");
      }
    } catch (err) {
      console.error(" [Login] Network or unexpected error:", err);
      setError("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const glassSx = {
    backgroundColor: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(12px)",
    borderRadius: 4,
    boxShadow: 4,
    border: "1px solid rgba(255,255,255,0.3)",
    maxWidth: 360,
    width: "100%",
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.6)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          px: 2,
        }}
      >
        <Card sx={glassSx}>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ color: "#fff", fontWeight: 600 }}
            >
              Admin Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              autoComplete="off"
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="Password"
                name="password"
                type="password"
                value={password}
                inputRef={inputRef}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                error={!!error}
                helperText={error}
                disabled={loading}
                required
                fullWidth
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{ style: { color: "#fff" } }}
                sx={{
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor: "rgba(255,255,255,0.6)",
                  },
                  "&:hover .MuiOutlinedInput-root fieldset": {
                    borderColor: "#fff",
                  },
                }}
                autoComplete="new-password"
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 1 }}
                disabled={loading || password.trim().length === 0}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ mt: 1 }}
                onClick={() =>
                  (window.location.href =
                    process.env.REACT_APP_MAIN_WEB_API_URL)
                }
              >
                Back to Website
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
