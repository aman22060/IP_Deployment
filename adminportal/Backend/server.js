// server.js
const express       = require('express');
const mysql         = require('mysql2');
const multer        = require('multer');
const cors          = require('cors');
const session       = require('express-session');
const bcrypt        = require('bcrypt');
const helmet        = require('helmet');
const rateLimit     = require('express-rate-limit');
require('dotenv').config({ path: './assets/imp.env' });

const app = express();

// ─── Trust proxy for secure cookies behind proxies ───────────────
app.set('trust proxy', 1);

// Log that env variables are loaded
console.log('DB_HOST:', process.env.DB_HOST);
console.log('ADMIN_PASSWORD_HASH set:', !!process.env.ADMIN_PASSWORD_HASH);

// ─── Security Middlewares ─────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'"],
      styleSrc:   ["'self'", "'unsafe-inline'"],
      imgSrc:     ["'self'", 'data:'],
      connectSrc: ["'self'"],
    }
  },
  hsts: { maxAge: 31536000 }
}));

// Rate‑limit all requests to 100 per 15 min per IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));

// Allow cross‑origin with credentials for your front‑end
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// JSON & URL‑encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Session setup ────────────────────────────────────────────────
app.use(session({
  name: 'admin.sid',
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
  }
}));

// ─── Authentication Helpers ────────────────────────────────────────
async function checkPassword(plain) {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) throw new Error('Admin password hash not configured');
  return bcrypt.compare(plain, hash);
}

function ensureAdmin(req, res, next) {
  if (req.session?.isAuthenticated) return next();
  res.status(401).json({ message: 'Not authorized' });
}

// ─── Multer setup ──────────────────────────────────────────────────
const storage     = multer.memoryStorage();
const upload      = multer({ storage });
const uploadNone  = multer().none();

// ─── Database setup ────────────────────────────────────────────────
const db = mysql.createConnection({
  host:     process.env.DB_HOST || 'localhost',
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD ||'siddharth',
  database: process.env.DB_NAME || 'Admin_Portal',
  connectTimeout: 10000,
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

// ─── LOGIN ROUTE (no auth required) ───────────────────────────────
app.post('/login', async (req, res) => {
  const { password } = req.body;
  console.log('[LOGIN] received password:', password);
  if (!password) {
    console.warn('[LOGIN] no password sent');
    return res.status(400).json({ message: 'Password required' });
  }
  try {
    console.log('[LOGIN] comparing to hash:', process.env.ADMIN_PASSWORD_HASH?.slice(0,10) + '…');
    const valid = await checkPassword(password);
    console.log('[LOGIN] bcrypt.compare result:', valid);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });
    req.session.regenerate(err => {
      if (err) {
        console.error('[LOGIN] session.regenerate error:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      req.session.isAuthenticated = true;
      console.log('[LOGIN] success, session created');
      res.json({ message: 'Logged in' });
    });
  } catch (e) {
    console.error('[LOGIN] unexpected error:', e);
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── LOGOUT ROUTE ───────────────────────────────
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Could not log out' });
    }
    // clear the cookie on the client
    res.clearCookie('admin.sid', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    res.json({ message: 'Logged out' });
  });
});

// ─── PROTECTED ROUTES ─────────────────────────────────────────────
app.get('/auth-status', ensureAdmin, (req, res) => {
  res.json({ authenticated: !!req.session?.isAuthenticated });
});





// Team Members
app.get('/team-members', cors(), (req, res) => {
  db.query('SELECT * FROM Team_Members', (e, r) => {
    if (e) return res.status(500).send('Error fetching team members');
    r.forEach(m => { if (m.Image) m.Image = m.Image.toString('base64'); });
    res.json(r);
  });
});
app.post('/team-members', cors(), upload.single('Image'), (req, res) => {
  const { Id, Name, Position, About } = req.body;
  const imgBuf = req.file?.buffer || null;
  const shift = 'UPDATE Team_Members SET Id=Id+1 WHERE Id>=? ORDER BY Id DESC';
  db.query(shift, [Id], err => {
    if (err) return res.status(500).json({ message: 'Error shifting IDs' });
    const ins = 'INSERT INTO Team_Members (Id,Name,Position,About,Image) VALUES(?,?,?,?,?)';
    db.query(ins, [Id, Name, Position, About, imgBuf], err2 => {
      if (err2) return res.status(500).send('Error saving member');
      db.query('SELECT * FROM Team_Members', (e3, r3) => {
        if (e3) return res.status(500).send('Error fetching after insert');
        r3.forEach(m => { if (m.Image) m.Image = m.Image.toString('base64'); });
        res.json(r3);
      });
    });
  });
});
app.delete('/team-members/:id', ensureAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.query('DELETE FROM Team_Members WHERE Id=?', [id], err => {
    if (err) return res.status(500).json({ message: 'Error deleting' });
    const down = 'UPDATE Team_Members SET Id=Id-1 WHERE Id>?';
    db.query(down, [id], err2 => {
      if (err2) return res.status(500).json({ message: 'Error reindexing' });
      db.query('SELECT * FROM Team_Members', (e, r) => {
        if (e) return res.status(500).json({ message: 'Error fetching' });
        r.forEach(m => { if (m.Image) m.Image = m.Image.toString('base64'); });
        res.json(r);
      });
    });
  });
});

// Talks
app.get('/talks', cors(), uploadNone, (req, res) => {
  db.query('SELECT * FROM Talks ORDER BY id', (e, r) => e ? res.status(500).send('Error') : res.json(r));
});
app.post('/talks', ensureAdmin, express.json(), (req, res) => {
  const { id, video_url, Title, Speaker } = req.body;
  if (!(id && video_url && Title && Speaker)) {
    return res.status(400).json({ message: 'All fields required' });
  }
  const shift = 'UPDATE Talks SET id=id+1 WHERE id>=? ORDER BY id DESC';
  db.query(shift, [id], err => {
    if (err) return res.status(500).json({ message: 'Error shifting' });
    const ins = 'INSERT INTO Talks (id,video_url,Title,Speaker) VALUES(?,?,?,?)';
    db.query(ins, [id, video_url, Title, Speaker], err2 => {
      if (err2) return res.status(500).json({ message: 'Error inserting' });
      db.query('SELECT * FROM Talks ORDER BY id', (e3, r3) => {
        if (e3) return res.status(500).json({ message: 'Fetch error' });
        res.json(r3);
      });
    });
  });
});
app.delete('/talks/:id', ensureAdmin, (req, res) => {
  const tid = parseInt(req.params.id, 10);
  if (isNaN(tid)) return res.status(400).json({ message: 'Invalid ID' });
  db.query('DELETE FROM Talks WHERE id=?', [tid], err => {
    if (err) return res.status(500).json({ message: 'Delete error' });
    const down = 'UPDATE Talks SET id=id-1 WHERE id>?';
    db.query(down, [tid], err2 => {
      if (err2) return res.status(500).json({ message: 'Reindex error' });
      db.query('SELECT * FROM Talks ORDER BY id', (e, r) => {
        if (e) return res.status(500).json({ message: 'Fetch error' });
        res.json(r);
      });
    });
  });
});

// News Section
app.get('/news-section', cors(), (req, res) => {
  db.query('SELECT * FROM News_Section ORDER BY id', (e, r) => {
    if (e) return res.status(500).send('Error');
    r.forEach(n => { if (n.newsImg) n.newsImg = n.newsImg.toString('base64'); });
    res.json(r);
  });
});
app.post('/news-section', ensureAdmin, upload.single('Image'), (req, res) => {
  const { id, Title, Tile_Link, Description } = req.body;
  const buf = req.file?.buffer || null;
  const shift = 'UPDATE News_Section SET id=id+1 WHERE id>=? ORDER BY id DESC';
  db.query(shift, [id], err => {
    if (err) return res.status(500).json({ message: 'Shift error' });
    const ins = 'INSERT INTO News_Section (id,Title,Tile_Link,Description,newsImg) VALUES(?,?,?,?,?)';
    db.query(ins, [id, Title, Tile_Link, Description, buf], err2 => {
      if (err2) return res.status(500).send('Insert error');
      db.query('SELECT * FROM News_Section ORDER BY id', (e3, r3) => {
        if (e3) return res.status(500).send('Fetch error');
        r3.forEach(n => { if (n.newsImg) n.newsImg = n.newsImg.toString('base64'); });
        res.json(r3);
      });
    });
  });
});
app.delete('/news-section/:id', ensureAdmin, (req, res) => {
  const nid = parseInt(req.params.id, 10);
  db.query('DELETE FROM News_Section WHERE id=?', [nid], err => {
    if (err) return res.status(500).json({ message: 'Delete error' });
    db.query('UPDATE News_Section SET id=id-1 WHERE id>?', [nid], err2 => {
      if (err2) return res.status(500).json({ message: 'Reindex error' });
      db.query('SELECT * FROM News_Section ORDER BY id', (e, r) => {
        if (e) return res.status(500).json({ message: 'Fetch error' });
        r.forEach(n => { if (n.newsImg) n.newsImg = n.newsImg.toString('base64'); });
        res.json(r);
      });
    });
  });
});

// Publications
app.get('/publications', cors(), uploadNone, (req, res) => {
  db.query('SELECT * FROM Publications ORDER BY id DESC', (e, r) => e ? res.status(500).send('Error') : res.json(r));
});
app.post('/publications', ensureAdmin, express.json(), (req, res) => {
  const { id, TitleLink, Title, Year, Anchor_text, Tags, addComments } = req.body;
  const shift = 'UPDATE Publications SET id=id+1 WHERE id>=? ORDER BY id DESC';
  db.query(shift, [id], err => {
    if (err) return res.status(500).json({ message: 'Shift error' });
    const ins = 'INSERT INTO Publications (id,TitleLink,Title,Year,Anchor_text,Tags,addComments) VALUES(?,?,?,?,?,?,?)';
    db.query(ins, [id, TitleLink, Title, Year, Anchor_text, Tags, addComments], err2 => {
      if (err2) return res.status(500).send('Insert error');
      db.query('SELECT * FROM Publications ORDER BY id DESC', (e3, r3) => e3 ? res.status(500).send('Fetch error') : res.json(r3));
    });
  });
});
app.delete('/publications/:id', ensureAdmin, (req, res) => {
  const pid = parseInt(req.params.id, 10);
  db.query('DELETE FROM Publications WHERE id=?', [pid], err => {
    if (err) return res.status(500).json({ message: 'Delete error' });
    db.query('UPDATE Publications SET id=id-1 WHERE id>?', [pid], err2 => {
      if (err2) return res.status(500).json({ message: 'Reindex error' });
      db.query('SELECT * FROM Publications ORDER BY id DESC', (e, r) => e ? res.status(500).send('Fetch error') : res.json(r));
    });
  });
});

// Social Media
app.get('/social-media', cors(), uploadNone, (req, res) => {
  db.query('SELECT * FROM SocialMedia ORDER BY id', (e, r) => e ? res.status(500).send('Error') : res.json(r));
});
app.post('/social-media', ensureAdmin, express.json(), (req, res) => {
  let { id, platform, url } = req.body;
  id = parseInt(id, 10);
  if (isNaN(id) || !['twitter','linkedin'].includes(platform) || typeof url !== 'string') {
    return res.status(400).json({ message: 'Invalid body' });
  }
  const shiftUp = 'UPDATE SocialMedia SET id=id+1 WHERE id>=? ORDER BY id DESC';
  db.query(shiftUp, [id], err => {
    if (err) return res.status(500).json({ message: 'Shift error' });
    const ins = 'INSERT INTO SocialMedia (id,platform,url) VALUES(?,?,?)';
    db.query(ins, [id, platform, url], err2 => {
      if (err2) return res.status(500).send('Insert error');
      db.query('SELECT * FROM SocialMedia ORDER BY id', (e3, r3) => e3 ? res.status(500).send('Fetch error') : res.status(201).json(r3));
    });
  });
});
app.delete('/social-media/:id', ensureAdmin, (req, res) => {
  const sid = parseInt(req.params.id, 10);
  if (isNaN(sid)) return res.status(400).json({ message: 'Invalid ID' });
  db.query('DELETE FROM SocialMedia WHERE id=?', [sid], err => {
    if (err) return res.status(500).json({ message: 'Delete error' });
    db.query('UPDATE SocialMedia SET id=id-1 WHERE id>?', [sid], err2 => {
      if (err2) return res.status(500).json({ message: 'Reindex error' });
      db.query('SELECT * FROM SocialMedia ORDER BY id', (e, r) => e ? res.status(500).send('Fetch error') : res.json(r));
    });
  });
});

// ─── Start server ────────────────────────────────────────────────
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
