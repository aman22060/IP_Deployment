// server.js
const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config({ path: "./assets/imp.env" });

const app = express();

// ─── Trust proxy for secure cookies behind proxies ───────────────
app.set("trust proxy", 1);

// Log env info
console.log("DB_HOST:", process.env.DB_HOST);
console.log("ADMIN_PASSWORD_HASH set:", !!process.env.ADMIN_PASSWORD_HASH);

// ─── Security Middlewares ─────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
      },
    },
    hsts: { maxAge: 3153600000 },
  })
);

// Rate-limit all requests to 100 per 15 min per IP
app.use(
  rateLimit({
    windowMs: 30 * 60 * 1000,
    max: 10000,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ─── CORS setups ───────────────────────────────────────────────────
// Allowed origins from env or fallback localhost:3000
const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [
  "http://localhost:3000",
];

// CORS for requests without credentials (GET/fetch)
const corsNoCredentials = cors({
  origin: allowedOrigins,
  credentials: false,
});

// CORS for requests with credentials (POST/DELETE + session)
const corsWithCredentials = cors({
  origin: allowedOrigins,
  credentials: true,
});

// Enable OPTIONS preflight for all routes with credentials
app.options("*", corsWithCredentials);

// ─── Body parsers ─────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Session setup ────────────────────────────────────────────────
app.use(
  session({
    name: "admin.sid",
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    },
  })
);

// ─── Multer setup ──────────────────────────────────────────────────
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadNone = multer().none();

// ─── Database setup ────────────────────────────────────────────────
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Cosylab@123",
  database: process.env.DB_NAME || "Admin_Portal",
  connectTimeout: 10000,
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL");
});

// ─── Authentication Helpers ────────────────────────────────────────
async function checkPassword(plain) {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) throw new Error("Admin password hash not configured");
  return bcrypt.compare(plain, hash);
}

function ensureAdmin(req, res, next) {
  if (req.session?.isAuthenticated) return next();
  res.status(401).json({ message: "Not authorized" });
}

// ─── ROUTES ────────────────────────────────────────────────────────

// LOGIN - no auth required, credentials enabled for session
app.post("/api/login", corsWithCredentials, async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: "Password required" });

  try {
    const valid = await checkPassword(password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ message: "Server error" });
      req.session.isAuthenticated = true;
      res.json({ message: "Logged in" });
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGOUT - credentials required
app.post("/api/logout", corsWithCredentials, (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Could not log out" });
    res.clearCookie("admin.sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.json({ message: "Logged out" });
  });
});

// AUTH STATUS - credentials required
app.get("/auth-status", corsWithCredentials, ensureAdmin, (req, res) => {
  res.json({ authenticated: !!req.session?.isAuthenticated });
});

// TEAM MEMBERS

// GET all team members - no credentials needed
app.get("/api/team-members", corsNoCredentials, (req, res) => {
  db.query("SELECT * FROM Team_Members", (err, results) => {
    if (err) return res.status(500).send("Error fetching team members");
    results.forEach((m) => {
      if (m.Image) m.Image = m.Image.toString("base64");
    });
    res.json(results);
  });
});

// POST new team member - credentials + auth required
app.post(
  "/api/team-members",
  corsWithCredentials,
  ensureAdmin,
  upload.single("Image"),
  (req, res) => {
    const { Id, Name, Position, About } = req.body;
    const imgBuf = req.file?.buffer || null;

    // Shift existing Ids
    const shiftQuery =
      "UPDATE Team_Members SET Id=Id+1 WHERE Id>=? ORDER BY Id DESC";
    db.query(shiftQuery, [Id], (err) => {
      if (err) return res.status(500).json({ message: "Error shifting IDs" });

      const insertQuery =
        "INSERT INTO Team_Members (Id, Name, Position, About, Image) VALUES (?, ?, ?, ?, ?)";
      db.query(insertQuery, [Id, Name, Position, About, imgBuf], (err2) => {
        if (err2) return res.status(500).send("Error saving member");

        db.query("SELECT * FROM Team_Members", (e3, r3) => {
          if (e3) return res.status(500).send("Error fetching after insert");
          r3.forEach((m) => {
            if (m.Image) m.Image = m.Image.toString("base64");
          });
          res.json(r3);
        });
      });
    });
  }
);

// DELETE team member - credentials + auth required
app.delete(
  "/api/team-members/:id",
  corsWithCredentials,
  ensureAdmin,
  (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    db.query("DELETE FROM Team_Members WHERE Id=?", [id], (err) => {
      if (err) return res.status(500).json({ message: "Error deleting" });

      const reindexQuery = "UPDATE Team_Members SET Id=Id-1 WHERE Id>?";
      db.query(reindexQuery, [id], (err2) => {
        if (err2) return res.status(500).json({ message: "Error reindexing" });

        db.query("SELECT * FROM Team_Members", (e, r) => {
          if (e) return res.status(500).json({ message: "Error fetching" });
          r.forEach((m) => {
            if (m.Image) m.Image = m.Image.toString("base64");
          });
          res.json(r);
        });
      });
    });
  }
);

// TALKS

// GET talks - no credentials needed
app.get("/api/talks", corsNoCredentials, uploadNone, (req, res) => {
  db.query("SELECT * FROM talks ORDER BY id", (e, r) =>
    e ? res.status(500).send("Error fetching talks") : res.json(r)
  );
});

// POST talks - credentials + auth required
app.post(
  "/api/talks",
  corsWithCredentials,
  ensureAdmin,
  express.json(),
  (req, res) => {
    const { id, video_url, Title, Speaker } = req.body;
    if (!(id && video_url && Title && Speaker)) {
      return res.status(400).json({ message: "All fields required" });
    }
    const shiftQuery = "UPDATE Talks SET id=id+1 WHERE id>=? ORDER BY id DESC";
    db.query(shiftQuery, [id], (err) => {
      if (err) return res.status(500).json({ message: "Error shifting talks" });

      const insertQuery =
        "INSERT INTO Talks (id, video_url, Title, Speaker) VALUES (?, ?, ?, ?)";
      db.query(insertQuery, [id, video_url, Title, Speaker], (err2) => {
        if (err2)
          return res.status(500).json({ message: "Error inserting talk" });

        db.query("SELECT * FROM Talks ORDER BY id", (e3, r3) => {
          if (e3)
            return res.status(500).json({ message: "Error fetching talks" });
          res.json(r3);
        });
      });
    });
  }
);

// DELETE talks - credentials + auth required
app.delete("/api/talks/:id", corsWithCredentials, ensureAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

  db.query("DELETE FROM Talks WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Error deleting talk" });

    const reindexQuery = "UPDATE Talks SET id=id-1 WHERE id>?";
    db.query(reindexQuery, [id], (err2) => {
      if (err2)
        return res.status(500).json({ message: "Error reindexing talks" });

      db.query("SELECT * FROM Talks ORDER BY id", (e, r) => {
        if (e) return res.status(500).json({ message: "Error fetching talks" });
        res.json(r);
      });
    });
  });
});

// NEWS

app.get("/api/news", corsNoCredentials, (req, res) => {
  db.query("SELECT * FROM News_Section ORDER BY id", (err, results) => {
    if (err) {
      console.error("Database error fetching news:", err);
      return res.status(500).send("Error fetching news");
    }

    results.forEach((item) => {
      if (item.newsImg && Buffer.isBuffer(item.newsImg)) {
        // Add MIME prefix for an image (assuming JPEG, change if needed)
        item.newsImg =
          "data:image/jpeg;base64," + item.newsImg.toString("base64");
      }
    });

    res.json(results);
  });
});

app.post(
  "/api/news",
  corsWithCredentials,
  ensureAdmin,
  upload.single("Image"),
  (req, res) => {
    const { id, title, link, description } = req.body;
    const imgBuf = req.file?.buffer || null;

    if (!(id && title && link && description && req.file)) {
      return res
        .status(400)
        .json({ message: "All fields required including image" });
    }

    const shiftQuery =
      "UPDATE News_Section SET id = id + 1 WHERE id >= ? ORDER BY id DESC";
    db.query(shiftQuery, [id], (err) => {
      if (err) return res.status(500).json({ message: "Error shifting news" });

      const insertQuery =
        "INSERT INTO News_Section (id, Title, Tile_Link, Description, newsImg) VALUES (?, ?, ?, ?, ?)";
      db.query(insertQuery, [id, title, link, description, imgBuf], (err2) => {
        if (err2)
          return res.status(500).json({ message: "Error inserting news" });

        db.query("SELECT * FROM News_Section ORDER BY id", (e3, r3) => {
          if (e3)
            return res
              .status(500)
              .json({ message: "Error fetching after insert" });
          r3.forEach((m) => {
            if (m.newsImg && Buffer.isBuffer(m.newsImg)) m.newsImg = "data:image/jpeg;base64,"+ m.newsImg.toString("base64");
          });
          res.json(r3);
        });
      });
    });
  }
);

// DELETE news - credentials + auth required
app.delete("/api/news/:id", corsWithCredentials, ensureAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

  db.query("DELETE FROM News_Section WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Error deleting news" });

    const reindexQuery = "UPDATE News_Section SET id=id-1 WHERE id>?";
    db.query(reindexQuery, [id], (err2) => {
      if (err2)
        return res.status(500).json({ message: "Error reindexing news" });

      db.query("SELECT * FROM News_Section ORDER BY id", (e3, r3) => {
        if (e3) return res.status(500).send("Error fetching after insert");
        r3.forEach((m) => {
          if (m.newsImg && Buffer.isBuffer(m.newsImg)) m.newsImg =  "data:image/jpeg;base64,"+  m.newsImg.toString("base64");
        });
        res.json(r3);
      });
    });
  });
});

// PUBLICATIONS

// GET publications - no credentials needed
app.get("/api/publications", corsNoCredentials, (req, res) => {
  db.query("SELECT * FROM Publications ORDER BY id", (e, r) =>
    e ? res.status(500).send("Error fetching publications") : res.json(r)
  );
});

// POST publications - credentials + auth required
app.post(
  "/api/publications",
  corsWithCredentials,
  ensureAdmin,
  express.json(),
  (req, res) => {
    const { id, Year, Title, TitleLink, Anchor_text, Tags, addComments } = req.body;

    // Validate all fields are present
    if (!(id && Year && Title && TitleLink && Anchor_text && Tags && addComments)) {
      console.warn("Missing field(s) in request:", req.body);
      return res.status(400).json({ message: "All fields required" });
    }

    // Shift existing IDs to make room for new one
    const shiftQuery = "UPDATE Publications SET id = id + 1 WHERE id >= ? ORDER BY id DESC";
    db.query(shiftQuery, [id], (err) => {
      if (err) {
        console.error("Error shifting publications:", err);
        return res.status(500).json({ message: "Error shifting publications", error: err.message });
      }

      // INSERT new publication (Fix order: Title comes before Year in query)
      const insertQuery = `
        INSERT INTO Publications (id, Title, TitleLink, Year, Anchor_text, Tags, addComments)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const insertValues = [id, Title, TitleLink, Year, Anchor_text, Tags, addComments];

      db.query(insertQuery, insertValues, (err2) => {
        if (err2) {
          console.error("Error inserting publication:", err2);
          return res.status(500).json({
            message: "Error inserting publication",
            error: err2.message,
            values: insertValues,
          });
        }

        // Fetch all publications after insert
        db.query("SELECT * FROM Publications ORDER BY id", (e3, r3) => {
          if (e3) {
            console.error("Error fetching publications after insert:", e3);
            return res.status(500).json({ message: "Error fetching publications", error: e3.message });
          }

          res.json(r3);
        });
      });
    });
  }
);


// DELETE publications - credentials + auth required
app.delete(
  "/api/publications/:id",
  corsWithCredentials,
  ensureAdmin,
  (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    db.query("DELETE FROM Publications WHERE id=?", [id], (err) => {
      if (err)
        return res.status(500).json({ message: "Error deleting publication" });

      const reindexQuery = "UPDATE Publications SET id=id-1 WHERE id>?";
      db.query(reindexQuery, [id], (err2) => {
        if (err2)
          return res
            .status(500)
            .json({ message: "Error reindexing publications" });

        db.query("SELECT * FROM Publications ORDER BY id", (e, r) => {
          if (e)
            return res
              .status(500)
              .json({ message: "Error fetching publications" });
          res.json(r);
        });
      });
    });
  }
);

// SOCIAL MEDIA

// GET social media - no credentials needed
app.get("/api/social-media", corsNoCredentials, (req, res) => {
  db.query("SELECT * FROM SocialMedia ORDER BY id", (e, r) =>
    e ? res.status(500).send("Error fetching social media") : res.json(r)
  );
});

// POST social media - credentials + auth required
app.post(
  "/api/social-media",
  corsWithCredentials,
  ensureAdmin,
  express.json(),
  (req, res) => {
    const { id, platform, url } = req.body;
    if (!(id && platform && url)) {
      return res.status(400).json({ message: "All fields required" });
    }
    const shiftQuery =
      "UPDATE SocialMedia SET id=id+1 WHERE id>=? ORDER BY id DESC";
    db.query(shiftQuery, [id], (err) => {
      if (err)
        return res.status(500).json({ message: "Error shifting social media" });

      const insertQuery =
        "INSERT INTO SocialMedia (id, platform, url) VALUES (?, ?, ?)";
      db.query(insertQuery, [id, platform, url], (err2) => {
        if (err2)
          return res
            .status(500)
            .json({ message: "Error inserting social media" });

        db.query("SELECT * FROM SocialMedia ORDER BY id", (e3, r3) => {
          if (e3)
            return res
              .status(500)
              .json({ message: "Error fetching social media" });
          res.json(r3);
        });
      });
    });
  }
);

// DELETE social media - credentials + auth required
app.delete(
  "/api/social-media/:id",
  corsWithCredentials,
  ensureAdmin,
  (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    db.query("DELETE FROM SocialMedia WHERE id=?", [id], (err) => {
      if (err)
        return res.status(500).json({ message: "Error deleting social media" });

      const reindexQuery = "UPDATE SocialMedia SET id=id-1 WHERE id>?";
      db.query(reindexQuery, [id], (err2) => {
        if (err2)
          return res
            .status(500)
            .json({ message: "Error reindexing social media" });

        db.query("SELECT * FROM SocialMedia ORDER BY id", (e, r) => {
          if (e)
            return res
              .status(500)
              .json({ message: "Error fetching social media" });
          res.json(r);
        });
      });
    });
  }
);

// Catch-all 404
app.use((req, res) => res.status(404).json({ message: "Not found" }));

// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
