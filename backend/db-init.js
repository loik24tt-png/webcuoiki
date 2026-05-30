const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function initDatabase() {
  try {
    // Connect to MySQL without database first to create database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
    });

    // Create database if not exists
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "hethongbongda"}`);
    console.log("✅ Database created or already exists");

    // Switch to the database
    await connection.execute(`USE ${process.env.DB_NAME || "hethongbongda"}`);

    // Drop and recreate users table
    await connection.execute("DROP TABLE IF EXISTS users");
    console.log("✅ Old users table dropped");

    // Create users table
    await connection.execute(`
      CREATE TABLE users (
        id int(11) NOT NULL AUTO_INCREMENT,
        username varchar(50) NOT NULL UNIQUE,
        password varchar(255) NOT NULL,
        full_name varchar(100) DEFAULT NULL,
        role varchar(20) DEFAULT 'user',
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log("✅ Users table created");

    // Hash password for admin user
    const hashedPassword = await bcrypt.hash("123456", 10);

    // Insert admin user
    await connection.execute(
      `INSERT INTO users (username, password, full_name, role) VALUES (?, ?, ?, ?)`,
      ["loicute", hashedPassword, "Administrator", "admin"]
    );
    console.log("✅ Admin user created");
    console.log("📝 Admin account: loicute / 123456");

    // Insert sample user
    const samplePassword = await bcrypt.hash("123456", 10);
    await connection.execute(
      `INSERT INTO users (username, password, full_name, role) VALUES (?, ?, ?, ?)`,
      ["user123", samplePassword, "Sample User", "user"]
    );
    console.log("✅ Sample user created (user123 / 123456)");

    await connection.end();
    console.log("✅ Database initialization completed successfully!");
  } catch (err) {
    console.error("❌ Error initializing database:", err.message);
    process.exit(1);
  }
}

initDatabase();
