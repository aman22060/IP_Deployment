// src/components/SocialMedia.jsx
import React, { useState, useEffect } from 'react';
import bgImage from '../components/Bgimg.jpeg';
import {
  Box, Card, CardHeader, CardContent, Typography,
  TextField, Button, Grid, TableContainer, Paper,
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const glassStyle = {
  backgroundColor: 'rgba(255,255,255,0.2)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.25)',
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  color: '#fff',
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    marginTop: '80px',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  },
  overlay: {
    position: 'absolute', top: 0, left: 0,
    width: '100%', height: '100%',
    bgcolor: 'rgba(0,0,0,0.6)', zIndex: 1,
  },
  content: {
    position: 'relative', zIndex: 2,
    pt: '80px', px: { xs:2, sm:4, md:8 }, pb:4,
    '& > * + *': { mt: 4 },
  },
  formCard: { ...glassStyle, p:3 },
  formHeader: { color:'#fff', mb:2 },
  formField: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor:'rgba(255,255,255,0.5)',
    },
  },
  textLabel: { sx:{ color:'#fff' } },
  textInput: { sx:{ color:'#fff' } },
  selectInput: { sx:{ color:'#fff','& .MuiSelect-icon':{ color:'#fff' }}},
  tableCard: { ...glassStyle },
  tableContainer: { ...glassStyle, overflowX:'auto' },
  table: { minWidth:650 },
  tableHead: { backgroundColor:'rgba(255,255,255,0.1)' },
  tableHeadCell:{ fontWeight:'bold', color:'#fff' },
  tableCell:{ color:'#fff', p:1 },
  evenRow:{ backgroundColor:'rgba(255,255,255,0.05)' },
};

// Convert LinkedIn share URLs → embed URLs
function toLinkedInEmbed(url) {
  if (url.includes('/embed/')) return url;
  let m = url.match(/activity-(\d+)/);
  if (m && m[1]) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:share:${m[1]}`;
  }
  m = url.match(/share(?:\/|:)(\d+)/);
  if (m && m[1]) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:share:${m[1]}`;
  }
  return null;
}

// Simple tweet URL validator
function isValidTweetUrl(url) {
  return /^https:\/\/twitter\.com\/[^/]+\/status\/\d+/.test(url);
}

export default function SocialMedia() {
  const [posts, setPosts]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [formData, setFormData] = useState({
    id: '', platform: 'twitter', url: ''
  });

  // Fetch existing posts
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/social-media`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setPosts(data))
      .catch(e => setError(e.message || String(e)))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => {
    setError('');
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    let { id, platform, url } = formData;
    url = url.trim();

    // Validate & convert URLs
    if (platform === 'linkedin') {
      const embed = toLinkedInEmbed(url);
      if (!embed) {
        setError(
          'Invalid LinkedIn URL. Provide a share URL (…/activity-1234 or share/1234) or an embed URL.'
        );
        return;
      }
      url = embed;
    } else if (platform === 'twitter') {
      if (!isValidTweetUrl(url)) {
        setError('Invalid Twitter URL. It must be in the form https://twitter.com/.../status/... ');
        return;
      }
    }

    const payload = {
      id: Number(id),
      platform,
      url,
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/social-media`, {
        method: 'POST',
        credentials: "include",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Error ${res.status}`);
      }
      const updated = await res.json();
      setPosts(updated);
      setFormData({ id:'', platform:'twitter', url:'' });
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  const handleDelete = async id => {
    setError('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/social-media/${id}`, {
        credentials: "include",
        method: 'DELETE',
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Error ${res.status}`);
      }
      const updated = await res.json();
      setPosts(updated);
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.overlay}/>
      <Box sx={styles.content}>

        {/* Add Post Form */}
        <Card sx={styles.formCard}>
          <CardHeader
            title="Add Social Post"
            titleTypographyProps={{ align:'center', variant:'h5', sx:styles.formHeader }}
            sx={{ backgroundColor:'rgba(0,0,0,0.3)' }}
          />
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} autoComplete="off">
              <Grid container spacing={2} alignItems="center">
                {/* ID Field: text only, no spinners */}
                <Grid item xs={12} sm={2}>
                  <TextField
                    name="id"
                    label="ID"
                    type="text"
                    required
                    fullWidth
                    value={formData.id}
                    onChange={handleChange}
                    onKeyPress={e => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                    InputLabelProps={styles.textLabel}
                    InputProps={styles.textInput}
                    sx={styles.formField}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                    }}
                  />
                </Grid>

                {/* Platform Select */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="platform"
                    label="Platform"
                    select
                    required
                    fullWidth
                    value={formData.platform}
                    onChange={handleChange}
                    InputLabelProps={styles.textLabel}
                    InputProps={styles.selectInput}
                  >
                    <MenuItem value="twitter">Twitter</MenuItem>
                    <MenuItem value="linkedin">LinkedIn</MenuItem>
                  </TextField>
                </Grid>

                {/* URL Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="url"
                    label="URL / Embed"
                    required
                    fullWidth
                    value={formData.url}
                    onChange={handleChange}
                    InputLabelProps={styles.textLabel}
                    InputProps={styles.textInput}
                    sx={styles.formField}
                  />
                </Grid>

                {/* Validation Error */}
                {error && (
                  <Grid item xs={12}>
                    <Typography color="error" align="center">
                      {error}
                    </Typography>
                  </Grid>
                )}

                {/* Submit Button */}
                <Grid item xs={12} sx={{ textAlign:'center' }}>
                  <Button type="submit" variant="contained" color="primary">
                    Add Post
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>

        {/* Posts Table */}
        <Card sx={styles.tableCard}>
          <CardContent>
            <Typography variant="h5" align="center" sx={styles.formHeader}>
              Social Media Posts
            </Typography>

            {loading ? (
              <Typography align="center" sx={{ color:'#fff' }}>
                Loading…
              </Typography>
            ) : posts.length === 0 ? (
              <Typography align="center" sx={{ color:'#fff' }}>
                No posts found.
              </Typography>
            ) : (
              <TableContainer component={Paper} sx={styles.tableContainer}>
                <Table sx={styles.table}>
                  <TableHead sx={styles.tableHead}>
                    <TableRow>
                      {['ID','Platform','URL','Action'].map(col => (
                        <TableCell key={col} sx={styles.tableHeadCell}>
                          {col}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {posts.map((p, i) => (
                      <TableRow
                        key={p.id}
                        hover
                        sx={i % 2 === 0 ? styles.evenRow : {}}
                      >
                        <TableCell sx={styles.tableCell}>{p.id}</TableCell>
                        <TableCell sx={styles.tableCell}>{p.platform}</TableCell>
                        <TableCell sx={styles.tableCell}>
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color:'#4dabf5' }}
                          >
                            View
                          </a>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(p.id)}
                          >
                            <DeleteIcon/>
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
