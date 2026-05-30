-- Database setup script for hệ thống quản lý giải đấu
-- Chạy câu lệnh này trong MySQL để setup database

-- Tạo database
CREATE DATABASE IF NOT EXISTS hethongbongda;
USE hethongbongda;

-- Tạo table users
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  full_name varchar(100) DEFAULT NULL,
  role varchar(20) DEFAULT 'user' COMMENT 'user hoặc admin',
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_username (username),
  KEY idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tạo table teams
CREATE TABLE IF NOT EXISTS teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo_type VARCHAR(50) DEFAULT 'academy',
  matches INT DEFAULT 0,
  points INT DEFAULT 0,
  goals INT DEFAULT 0,
  conceded INT DEFAULT 0,
  form VARCHAR(20) DEFAULT '0-0-0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tạo table matches
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert admin user với password đã hash: loicute / 123456
-- Hash: $2b$10$F9w.vvZopJ6.V9M.G9D1qOX2qZnHwWKZ7v8Y2KN1m3c0I6.0eoF7a
-- ⚠️ Chú ý: Đây là password được hash bằng bcrypt rounds=10
-- Trong thực tế, bạn nên tạo password mới sau khi đăng nhập

INSERT INTO users (username, password, full_name, role) 
VALUES (
  'loicute',
  '$2b$10$F9w.vvZopJ6.V9M.G9D1qOX2qZnHwWKZ7v8Y2KN1m3c0I6.0eoF7a',
  'Administrator',
  'admin'
);

-- ✅ Xác nhận admin account
-- SELECT * FROM users WHERE username = 'loicute';
