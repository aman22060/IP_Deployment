// src/components/Publication.jsx

import React, { useState, useEffect, useRef } from "react";
import bgImage from "../components/Bgimg.jpeg";
import {
  Box,
  Card,
  CardHeader,
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
  border: "1px solid rgba(255,255,255,0.3)",
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
    px: { xs: 2, md: 4 },
    pb: 4,
  },
  formCard: { ...glassStyle, maxWidth: 1000, mx: "auto", mb: 4 },
  headerSX: { backgroundColor: "rgba(255,255,255,0.15)" },
  headerTitle: { color: "#fff", fontWeight: "bold" },
  textField: {
    sx: {
      mb: 2,
      color: "#fff",
      "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.6)" },
      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
    },
    InputLabelProps: { sx: { color: "#fff" } },
    InputProps: { sx: { color: "#fff" } },
  },
  submitButton: {},
  tableContainer: { ...glassStyle, width: "100%", overflowX: "auto" },
  tableHead: { backgroundColor: "rgba(255,255,255,0.1)" },
  headCell: { fontWeight: "bold", color: "#fff" },
  rowCell: { color: "#fff" },
  evenRow: { backgroundColor: "rgba(255,255,255,0.05)" },
};

export default function Publication() {
  const [pubs, setPubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    Year: "",
    Title: "",
    TitleLink: "",
    Anchor_text: "",
    Tags: "",
    addComments: "",
  });

  const fileInputRef = useRef(null);

  // Fetch existing publications via proxy
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/publications`   )
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => setPubs(data))
      .catch((e) => setError(e.message || "Failed to load publications"))
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/publications`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `Error ${res.status}`);
      setPubs(json);
      setFormData({
        id: "",
        Year: "",
        Title: "",
        TitleLink: "",
        Anchor_text: "",
        Tags: "",
        addComments: "",
      });
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      setPubs((prev) => prev.filter((p) => p.id !== id));
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/publications/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) setPubs(data);
    } catch (err) {
      setError(err.message || "Could not delete publication");
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.overlay} />
      <Box sx={styles.content}>
        <Card sx={styles.formCard}>
          <CardHeader
            title="Add Publication"
            titleTypographyProps={{ variant: "h4", align: "center", sx: styles.headerTitle }}
            sx={styles.headerSX}
          />
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="id"
                    label="ID"
                    value={formData.id}
                    onChange={handleInputChange}
                    required
                    {...styles.textField}
                  />
                  <TextField
                    fullWidth
                    name="Year"
                    label="Year"
                    value={formData.Year}
                    onChange={handleInputChange}
                    required
                    {...styles.textField}
                  />
                  <TextField
                    fullWidth
                    name="Title"
                    label="Title"
                    value={formData.Title}
                    onChange={handleInputChange}
                    required
                    {...styles.textField}
                  />
                  <TextField
                    fullWidth
                    name="TitleLink"
                    label="Link"
                    type="url"
                    value={formData.TitleLink}
                    onChange={handleInputChange}
                    required
                    {...styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="Anchor_text"
                    label="Anchor Text"
                    value={formData.Anchor_text}
                    onChange={handleInputChange}
                    required
                    {...styles.textField}
                  />
                  <TextField
                    fullWidth
                    name="Tags"
                    label="Tags"
                    value={formData.Tags}
                    onChange={handleInputChange}
                    required
                    {...styles.textField}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    name="addComments"
                    label="Comments"
                    value={formData.addComments}
                    onChange={handleInputChange}
                    required
                    {...styles.textField}
                  />
                  <Box textAlign="left" sx={{ mb: 2 }}>
                    <Button type="submit" variant="contained" size="large" sx={styles.submitButton}>
                      Submit Publication
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              {error && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>

        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Table>
            <TableHead sx={styles.tableHead}>
              <TableRow>
                {["ID","Year","Title","Link","Anchor Text","Tags","Comments","Action"].map(col => (
                  <TableCell key={col} sx={styles.headCell}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={styles.rowCell}>Loading…</TableCell>
                </TableRow>
              ) : pubs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={styles.rowCell}>No publications found.</TableCell>
                </TableRow>
              ) : (
                pubs.map((p, idx) => (
                  <TableRow key={p.id} hover sx={idx % 2 === 0 ? styles.evenRow : {}}>
                    <TableCell sx={styles.rowCell}>{p.id}</TableCell>
                    <TableCell sx={styles.rowCell}>{p.Year}</TableCell>
                    <TableCell sx={styles.rowCell}>{p.Title}</TableCell>
                    <TableCell><a href={p.TitleLink} target="_blank" rel="noopener noreferrer" style={{color: '#4dabf5'}}>Visit</a></TableCell>
                    <TableCell sx={styles.rowCell}>{p.Anchor_text}</TableCell>
                    <TableCell sx={styles.rowCell}>{p.Tags}</TableCell>
                    <TableCell sx={styles.rowCell}>{p.addComments}</TableCell>
                    <TableCell><IconButton color="error" onClick={() => handleDelete(p.id)}><DeleteIcon/></IconButton></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
