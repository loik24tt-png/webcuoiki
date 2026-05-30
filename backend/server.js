const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// MYSQL CONNECT
// ======================
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "hethongbongda",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ======================
// JWT TOKEN
// ======================
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET || "football_secret",
    {
      expiresIn: "8h",
    }
  );
}

// ======================
// FIND USER
// ======================
async function findUserByUsername(username) {
  const [rows] = await pool.execute(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  return rows[0];
}

// ======================
// REGISTER
// ======================
app.post("/register", async (req, res) => {
  try {
    const { username, password, full_name } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Thiếu tài khoản hoặc mật khẩu",
      });
    }

    // CHECK USER EXIST
    const existing = await findUserByUsername(username);

    if (existing) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // INSERT USER
    const [result] = await pool.execute(
      `
      INSERT INTO users
      (username, password, full_name, role)
      VALUES (?, ?, ?, ?)
      `,
      [
        username,
        hashedPassword,
        full_name || null,
        "user",
      ]
    );

    const user = {
      id: result.insertId,
      username,
      full_name,
      role: "user",
    };

    const token = generateToken(user);

    res.status(201).json({
      message: "Đăng ký thành công",
      user,
      token,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ======================
// LOGIN
// ======================
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Thiếu tài khoản hoặc mật khẩu",
      });
    }

    // FIND USER
    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(401).json({
        message: "Sai tài khoản hoặc mật khẩu",
      });
    }

    // CHECK PASSWORD
    const ok = await bcrypt.compare(
      password,
      user.password
    );

    if (!ok) {
      return res.status(401).json({
        message: "Sai tài khoản hoặc mật khẩu",
      });
    }

    // TOKEN
    const token = generateToken(user);

    res.json({
      message: "Đăng nhập thành công",

      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        role: user.role,
      },

      token,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ======================
// AUTH MIDDLEWARE
// ======================
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No token",
    });
  }

  const token = auth.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "football_secret"
    );

    req.user = payload;

    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

// ======================
// CURRENT USER
// ======================
app.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await findUserByUsername(
      req.user.username
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      role: user.role,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ==========================================
// USER MANAGEMENT (ADMIN ONLY)
// ==========================================
// Get all users
app.get('/users', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    const user = await findUserByUsername(req.user.username);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const [rows] = await pool.execute('SELECT id, username, full_name, role FROM users ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new user (admin only)
app.post('/users', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    const user = await findUserByUsername(req.user.username);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { username, password, full_name, role } = req.body;

    if (!username || !password || !full_name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await findUserByUsername(username);
    if (existing) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (username, password, full_name, role) VALUES (?, ?, ?, ?)',
      [username, hashed, full_name, role || 'user']
    );

    res.status(201).json({ 
      message: 'User created',
      user: { id: result.insertId, username, full_name, role: role || 'user' }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user (admin only)
app.put('/users/:id', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    const currentUser = await findUserByUsername(req.user.username);
    if (currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { id } = req.params;
    const { password, full_name, role } = req.body;

    let updateQuery = 'UPDATE users SET ';
    const params = [];

    if (full_name) {
      updateQuery += 'full_name = ?';
      params.push(full_name);
    }

    if (role) {
      if (params.length > 0) updateQuery += ', ';
      updateQuery += 'role = ?';
      params.push(role);
    }

    if (password) {
      if (params.length > 0) updateQuery += ', ';
      const hashed = await bcrypt.hash(password, 10);
      updateQuery += 'password = ?';
      params.push(hashed);
    }

    if (params.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updateQuery += ' WHERE id = ?';
    params.push(id);

    await pool.execute(updateQuery, params);
    res.json({ message: 'User updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user (admin only)
app.delete('/users/:id', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin
    const user = await findUserByUsername(req.user.username);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { id } = req.params;

    // Prevent deleting yourself
    const [targetUser] = await pool.execute('SELECT id FROM users WHERE id = ?', [id]);
    if (targetUser.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (targetUser[0].id === user.id) {
      return res.status(400).json({ message: 'Cannot delete yourself' });
    }

    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ======================
// STANDINGS
// ======================
app.get("/standings", async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT
        id,
        name,
        logo_type,
        matches,
        points,
        goals,
        conceded,
        form
      FROM teams
      ORDER BY
        points DESC,
        (goals - conceded) DESC
    `);

    res.json(rows);

  } catch (err) {
    console.error(err);

    if (err.code === "ER_NO_SUCH_TABLE") {
      return res.json([]);
    }

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ======================
// MATCHES
// ======================
app.get("/matches", async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT
        id,
        round,
        doi1,
        doi2,
        score,
        date,
        time,
        scorers1,
        scorers2,
        assists1,
        assists2,
        cards1,
        cards2
      FROM matches
      ORDER BY date DESC, time DESC
    `);

    res.json(rows);

  } catch (err) {
    console.error(err);

    if (err.code === "ER_NO_SUCH_TABLE") {
      return res.json([]);
    }

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ======================
// MATCH DETAIL
// ======================
app.get("/matches/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute(
      `
      SELECT *
      FROM matches
      WHERE id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy trận đấu",
      });
    }

    res.json(rows[0]);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ======================
// INITIALIZE DATABASE
// ======================
async function initializeDatabase() {

  // USERS
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      full_name VARCHAR(100),
      role VARCHAR(20) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // TEAMS
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS teams (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      logo_type VARCHAR(50) DEFAULT 'academy',
      matches INT DEFAULT 0,
      points INT DEFAULT 0,
      goals INT DEFAULT 0,
      conceded INT DEFAULT 0,
      form VARCHAR(20) DEFAULT '0-0-0'
    )
  `);

  // MATCHES
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS matches (
      id INT AUTO_INCREMENT PRIMARY KEY,
      round VARCHAR(100),
      doi1 VARCHAR(255),
      doi2 VARCHAR(255),
      score VARCHAR(20) DEFAULT '0-0',
      date DATE,
      time TIME,
      scorers1 JSON,
      scorers2 JSON,
      assists1 JSON,
      assists2 JSON,
      cards1 JSON,
      cards2 JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // CREATE ADMIN
  // Delete old incorrect admin accounts
  await pool.execute(`DELETE FROM users WHERE username IN ('loicute', 'Loi')`);
  
  const hashedPassword = await bcrypt.hash("123456", 10);

  await pool.execute(
    `
    INSERT INTO users
    (username, password, full_name, role)
    VALUES (?, ?, ?, ?)
    `,
    [
      "loicute",
      hashedPassword,
      "Administrator",
      "admin",
    ]
  );

  console.log("✅ Admin account created: loicute / 123456");
  console.log("✅ Database initialized");
}

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 3001;

initializeDatabase()
  .then(() => {

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running at http://localhost:${PORT}`
      );
    });

  })
  .catch((err) => {
    console.error("❌ Database init error:", err);
  });

module.exports = app;