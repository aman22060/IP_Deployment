// src/components/TeamMembers.jsx
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
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Avatar,
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
  card: { ...glassStyle, maxWidth: 1000, mx: "auto", mb: 4 },
  cardHeaderSX: { backgroundColor: "rgba(0,0,0,0.3)" },
  cardHeaderTitle: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  form: { display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 },
  formFields: { flex: 1, display: "flex", flexDirection: "column", gap: 2 },
  textFieldLabel: { sx: { color: "#fff" } },
  textFieldInput: {
    sx: {
      color: "#fff",
      "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.6)" },
      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
    },
  },
  uploadButton: { mt: 1, bgcolor: "rgba(37,99,235,0.8)" },
  submitButton: {},
  previewContainer: { flex: 1, display: "flex", justifyContent: "center" },
  previewCard: {
    ...glassStyle,
    width: { xs: "100%", md: 300 },
    height: 450,
    position: "relative",
    overflow: "hidden",
    "&:hover img": { transform: "scale(1.05)" },
    "&:hover .overlay": { transform: "translateY(0)" },
  },
  previewImage: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" },
  previewOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    bgcolor: "rgba(0,0,0,0.7)",
    color: "#fff",
    p: 2,
    transform: "translateY(100%)",
    transition: "transform 0.3s",
  },
  previewName: { fontWeight: "bold", textTransform: "uppercase" },
  previewPosition: { mt: 0.5, color: "#ddd" },
  previewAbout: { mt: 0.5, color: "#ccc" },
  tableContainer: { ...glassStyle, width: "100%", overflowX: "auto", p: 2 },
  tableHeadCell: { fontWeight: "bold", color: "#fff" },
  tableRow: { "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } },
  tableCell: { color: "#fff" },
  aboutCell: { color: "#fff", whiteSpace: "normal", wordBreak: "break-word", maxWidth: 200 },
  deleteButton: { color: "#f44336" },
};

export default function TeamMembers() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [formData, setFormData] = useState({ Id: "", Name: "", Position: "", About: "" });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Fetch existing members
  useEffect(() => {
    fetch("/team-members", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setTeamMembers)
      .catch(() => {});
  }, []);

  const handleInputChange = (e) => setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = new FormData();
    Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
    if (imageFile) payload.append("Image", imageFile);

    try {
      const res = await fetch("/team-members", {
        method: "POST",
        credentials: "include",
        body: payload,
      });
      if (!res.ok) throw new Error("Submission failed");
      const updated = await res.json();
      setTeamMembers(updated);
      setFormData({ Id: "", Name: "", Position: "", About: "" });
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  const handleDelete = async (id) => {
    setTeamMembers((prev) => prev.filter((m) => m.Id !== id));
    try {
      const res = await fetch(`/team-members/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      if (Array.isArray(updated)) setTeamMembers(updated);
    } catch {}
  };

  const placeholder = "https://via.placeholder.com/400x260.png?text=Team+Member";

  return (
    <Box sx={styles.container}>
      <Box sx={styles.overlay} />
      <Box sx={styles.content}>
        <Card sx={styles.card}>
          <CardHeader
            title="Add Team Member"
            titleTypographyProps={{ variant: "h5", sx: styles.cardHeaderTitle }}
            sx={styles.cardHeaderSX}
          />
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} sx={styles.form} autoComplete="off">
              <Box sx={styles.formFields}>
                {Object.keys(formData).map((field) => (
                  <TextField
                    key={field}
                    label={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    autoComplete="off"
                    required
                    fullWidth
                    multiline={field === "About"}
                    rows={field === "About" ? 3 : 1}
                    InputLabelProps={styles.textFieldLabel}
                    InputProps={styles.textFieldInput}
                  />
                ))}
                <Button component="label" variant="contained" sx={styles.uploadButton}>
                  {imageFile ? "Change Image" : "Upload Image"}
                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                    autoComplete="off"
                  />
                </Button>
                {error && <Typography color="error" align="center">{error}</Typography>}
                <Button type="submit" variant="contained" size="large" sx={styles.submitButton}>
                  Submit
                </Button>
              </Box>
              <Box sx={styles.previewContainer}>
                <Card sx={styles.previewCard}>
                  <Box
                    component="img"
                    src={imageFile ? URL.createObjectURL(imageFile) : placeholder}
                    alt="Preview"
                    sx={styles.previewImage}
                  />
                  <Box className="overlay" sx={styles.previewOverlay}>
                    <Typography variant="subtitle1" sx={styles.previewName}>
                      {formData.Name || "Name"}
                    </Typography>
                    <Typography variant="body2" sx={styles.previewPosition}>
                      {formData.Position || "Position"}
                    </Typography>
                    <Typography variant="caption" sx={styles.previewAbout}>
                      {formData.About || "About"}
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                {["Id", "Name", "Position", "About", "Image", "Actions"].map((col) => (
                  <TableCell key={col} sx={styles.tableHeadCell}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {teamMembers.map((m) => (
                <TableRow key={m.Id} hover sx={styles.tableRow}>
                  <TableCell sx={styles.tableCell}>{m.Id}</TableCell>
                  <TableCell sx={styles.tableCell}>{m.Name}</TableCell>
                  <TableCell sx={styles.tableCell}>{m.Position}</TableCell>
                  <TableCell sx={styles.aboutCell}>{m.About}</TableCell>
                  <TableCell>
                    {m.Image && <Avatar src={`data:image/jpeg;base64,${m.Image}`} variant="rounded" />}
                  </TableCell>
                  <TableCell>
                    <IconButton sx={styles.deleteButton} onClick={() => handleDelete(m.Id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
