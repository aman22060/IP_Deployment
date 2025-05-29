// src/components/Talks.jsx

import React, { useState, useEffect } from "react";
import bgImage from "../components/Bgimg.jpeg";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

/* ────────────────────────────────────────────────────────────── */
/*                            Styles                             */
/* ────────────────────────────────────────────────────────────── */
const glassStyle = {
  backgroundColor: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  borderRadius: 2,
  border: "1px solid rgba(255,255,255,0.25)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  color: "#fff",
};

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    marginTop: "80px",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    overflowX: "hidden",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    bgcolor: "rgba(0,0,0,0.6)",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    pt: "80px",
    px: { xs: 2, sm: 4, md: 8 },
    pb: 4,
    "& > * + *": { mt: 4 },
  },
  formCard: { ...glassStyle, p: 3 },
  formHeader: { color: "#fff", mb: 2 },
  formField: { "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.5)" } },
  textLabel: { sx: { color: "#fff" } },
  textInput: { sx: { color: "#fff" } },
  submitButton: {},
  talksCard: { ...glassStyle },
  talksTableContainer: { ...glassStyle, overflowX: "auto" },
  table: { minWidth: 650 },
  tableHead: { backgroundColor: "rgba(255,255,255,0.1)" },
  tableHeadCell: { fontWeight: "bold", color: "#fff" },
  tableCell: { color: "#fff", p: 1 },
  evenRow: { backgroundColor: "rgba(255,255,255,0.05)" },
  iframe: { width: "100%", height: { xs: 150, sm: 200, md: 250 }, borderRadius: 1 },
};

export default function Talks() {
  const [talks, setTalks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ id: "", video_url: "", Title: "", Speaker: "" });


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/talks`   )
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => setTalks(data))
      .catch((e) => setError(e.message || "Failed to load talks"))
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (e) =>
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));

  const toEmbedUrl = (rawUrl) => {
    if (!rawUrl) return "";
    if (rawUrl.includes("/embed/")) return rawUrl;
    let id = "";
    if (rawUrl.includes("youtube.com/watch?v=")) {
      id = rawUrl.split("v=")[1]?.split("&")[0] || "";
    } else if (rawUrl.includes("youtu.be/")) {
      id = rawUrl.split(".be/")[1]?.split("?")[0] || "";
    }
    return id ? `https://www.youtube.com/embed/${id}` : rawUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = {
      id: formData.id,
      video_url: toEmbedUrl(formData.video_url),
      Title: formData.Title,
      Speaker: formData.Speaker,
    };
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/talks`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Error ${res.status}`);
      }
      const updated = await res.json();
      setTalks(updated);
      setFormData({ id: "", video_url: "", Title: "", Speaker: "" });
    } catch (err) {
      setError(err.message || "Failed to submit");
    }
  };

  const handleDelete = async (talkId) => {
    try {
      setTalks((prev) => prev.filter((t) => t.id !== talkId));
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/talks/${talkId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const updated = await res.json();
      if (Array.isArray(updated)) setTalks(updated);
    } catch {
      setError("Could not delete talk");
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.overlay} />
      <Box sx={styles.content}>
        <Card sx={styles.formCard}>
          <CardContent>
            <Typography variant="h5" align="center" sx={styles.formHeader}>
              Add New Talk
            </Typography>
            <Box component="form" onSubmit={handleSubmit} autoComplete="off">
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth required name="id" label="ID" value={formData.id}
                    onChange={handleInputChange} InputLabelProps={styles.textLabel}
                    InputProps={styles.textInput} sx={styles.formField}
                  />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    fullWidth required name="video_url" label="YouTube URL"
                    value={formData.video_url} onChange={handleInputChange}
                    placeholder="https://youtube.com/..." InputLabelProps={styles.textLabel}
                    InputProps={{ ...styles.textInput, sx: { ...styles.textInput.sx, "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.5)" } } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth required name="Title" label="Title" value={formData.Title}
                    onChange={handleInputChange} InputLabelProps={styles.textLabel}
                    InputProps={styles.textInput} sx={styles.formField}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth required name="Speaker" label="Speaker" value={formData.Speaker}
                    onChange={handleInputChange} InputLabelProps={styles.textLabel}
                    InputProps={styles.textInput} sx={styles.formField}
                  />
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <Typography color="error" align="center">{error}</Typography>
                  </Grid>
                )}
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Button type="submit" variant="contained" color="primary" sx={styles.submitButton}>
                    Add Talk
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
        <Card sx={styles.talksCard}>
          <CardContent>
            <Typography variant="h5" align="center" sx={styles.formHeader}>
              Talks List
            </Typography>
            {loading ? (
              <Typography align="center" sx={{ color: "#fff" }}>Loading…</Typography>
            ) : talks.length === 0 ? (
              <Typography align="center" sx={{ color: "#fff" }}>No talks found.</Typography>
            ) : (
              <TableContainer component={Paper} sx={styles.talksTableContainer}>
                <Table sx={styles.table}>
                  <TableHead sx={styles.tableHead}>
                    <TableRow>
                      {["ID", "Video", "Title", "Speaker", "Action"].map((col) => (
                        <TableCell key={col} sx={styles.tableHeadCell}>{col}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {talks.map((talk, idx) => (
                      <TableRow key={talk.id} hover sx={idx % 2 === 0 ? styles.evenRow : {}}>
                        <TableCell sx={styles.tableCell}>{talk.id}</TableCell>
                        <TableCell sx={styles.tableCell}>
                          {talk.video_url ? (
                            <Box component="iframe" src={talk.video_url} title={`Talk ${talk.id}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen sx={styles.iframe} />
                          ) : (
                            <Typography sx={{ color: "#ccc", fontStyle: "italic" }}>No video</Typography>
                          )}
                        </TableCell>
                        <TableCell sx={styles.tableCell}>{talk.Title}</TableCell>
                        <TableCell sx={styles.tableCell}>{talk.Speaker}</TableCell>
                        <TableCell>
                          <IconButton color="error" onClick={() => handleDelete(talk.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
