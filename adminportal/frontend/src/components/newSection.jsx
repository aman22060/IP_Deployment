// src/components/NewsSection.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

/* ─────────────────────────────────────────────── */
/*                     Styles                      */
/* ─────────────────────────────────────────────── */
const glassStyle = {
  backgroundColor: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  borderRadius: 2,
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
  color: "#fff",
};

const placeholder = "https://via.placeholder.com/400x260.png?text=News+Preview";

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
  formCard: { ...glassStyle, maxWidth: 1000, mx: "auto", mb: 4 },
  formHeader: { color: "#fff", mb: 2 },
  formLayout: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 4,
  },
  leftForm: { flex: 1, display: "flex", flexDirection: "column", gap: 2 },
  textField: {
    sx: {
      mb: 2,
      color: "#fff",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255,255,255,0.6)",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
    },
    InputLabelProps: { sx: { color: "#fff" } },
    InputProps: { sx: { color: "#fff" } },
  },
  previewContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  previewCard: {
    ...glassStyle,
    width: { xs: "100%", md: 400 },
    height: { xs: 200, md: 300 },
    position: "relative",
    overflow: "hidden",
    "&:hover img": { transform: "scale(1.05)" },
    "&:hover .overlay": { transform: "translateY(0)" },
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s",
  },
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
  previewTitleLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  previewDesc: { mt: 0.5, color: "#ddd" },
  tableContainer: { ...glassStyle, width: "100%", overflowX: "auto" },
  tableHead: { backgroundColor: "rgba(255,255,255,0.1)" },
  headCell: { fontWeight: "bold", color: "#fff" },
  rowCell: { color: "#fff", p: 1 },
  descCell: { whiteSpace: "pre-line", maxWidth: 300, color: "#fff", p: 1 },
};

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    link: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const previewUrl = useMemo(() => {
    if (!imageFile) return placeholder;
    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== placeholder)
        URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/news`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(setNewsItems)
      .catch(() => setError("Could not load news."))
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = new FormData();
    Object.entries(formData).forEach(([k,v])=>payload.append(k,v));
    if(imageFile)payload.append("Image",imageFile);


    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/news`, {
        method: "POST",
        credentials: "include",
        body: payload,
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Submission failed");
      }

      const updated = await res.json();
      setNewsItems(updated);
      setFormData({ id: "", Title: "", Tile_Link: "", Description: "" });
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(err.message || "Submission error");
    }
  };

  const handleDelete = async (id) => {
    setNewsItems((prev) => prev.filter((m) => m.id !== id));
    setError("");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/news/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
          if (Array.isArray(updated)) setNewsItems(updated);
    } catch {}
  };


  return (
    <Box sx={styles.container}>
      <Box sx={styles.overlay} />
      <Box sx={styles.content}>
        <Card sx={styles.formCard}>
          <CardHeader
            title="Add News"
            titleTypographyProps={{
              align: "center",
              variant: "h5",
              sx: styles.formHeader,
            }}
            sx={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          />
          <CardContent>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={styles.formLayout}
              autoComplete="off"
            >
              <Box sx={styles.leftForm}>
                <TextField
                  label="ID"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  {...styles.textField}
                />
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  {...styles.textField}
                />
                <TextField
                  label="Link"
                  name="link"
                  type="url"
                  value={formData.link}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  {...styles.textField}
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  required
                  fullWidth
                  {...styles.textField}
                />
                <Button variant="contained" component="label" sx={{ mb: 2 }}>
                  {imageFile ? "Change Image" : "Upload Image"}
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                </Button>
                {error && (
                  <Typography color="error" align="center">
                    {error}
                  </Typography>
                )}
                <Button type="submit" variant="contained" size="large">
                  Submit
                </Button>
              </Box>
              <Box sx={styles.previewContainer}>
                <Card sx={styles.previewCard}>
                  <Box
                    component="img"
                    src={previewUrl}
                    alt="Preview"
                    sx={styles.previewImage}
                  />
                  <Box className="overlay" sx={styles.previewOverlay}>
                    <Typography variant="subtitle1">
                      <a
                        href={formData.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.previewTitleLink}
                      >
                        {formData.title || "Title"}
                      </a>
                    </Typography>
                    <Typography variant="body2" sx={styles.previewDesc}>
                      {formData.description || "Description"}
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Table>
            <TableHead sx={styles.tableHead}>
              <TableRow>
                {["ID", "Title", "Link", "Description", "Image", "Action"].map(
                  (col) => (
                    <TableCell key={col} sx={styles.headCell}>
                      {col}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={styles.rowCell}>
                    Loading…
                  </TableCell>
                </TableRow>
              ) : newsItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={styles.rowCell}>
                    No news found.
                  </TableCell>
                </TableRow>
              ) : (
                newsItems.map((item) => (
                  <TableRow hover key={item.id}>
                    <TableCell sx={styles.rowCell}>{item.id}</TableCell>
                    <TableCell sx={styles.rowCell}>{item.Title}</TableCell>
                    <TableCell>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#4dabf5" }}
                      >
                        Visit
                      </a>
                    </TableCell>
                    <TableCell sx={styles.descCell}>
                      {item.Description}
                    </TableCell>
                    <TableCell>
                      {item.newsImg ? (
                        <Box
                          component="img"
                          src={item.newsImg}
                          alt={item.title}
                          sx={{
                            width: 80,
                            height: 80,
                            objectFit: "cover",
                            borderRadius: 2,
                          }}
                        />
                      ) : (
                        <Typography sx={{ color: "#ccc", fontStyle: "italic" }}>
                          No Image
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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
