# ⚽ Hệ Thống Quản Lý Giải Đấu Bóng Đá

## 🚀 Quick Start (5 phút)

### 1️⃣ Backend
```bash
cd backend
npm install
npm start
```

### 2️⃣ Frontend
```bash
cd loi123
npm install
npm run dev
```

### 3️⃣ Đăng Nhập Admin
- Mở http://localhost:5173 
- Nhấp vào **FOOTBALL ADMIN** 
- **Username**: `loicute`
- **Password**: `123456`
- Nhấp **Đăng Nhập** → Tự động vào Admin Panel

---

## 🎯 Admin Panel - Quản Lý Tài Khoản

### ➕ Thêm Tài Khoản Mới
```
Tên đăng nhập: [nhập unique username]
Mật khẩu: [nhập password]
Họ và tên: [nhập full name]
Vai trò: User hoặc Admin
→ Nhấp "➕ Thêm"
```

### ✏️ Sửa Tài Khoản
```
→ Nhấp "✏️ Sửa" trên hàng cần sửa
→ Sửa full_name hoặc role
→ Mật khẩu (để trống = không đổi)
→ Nhấp "💾 Cập Nhật"
```

### 🗑️ Xóa Tài Khoản
```
→ Nhấp "🗑️ Xóa" trên hàng cần xóa
→ Xác nhận
→ Tài khoản bị xóa
```

---

## 📋 Danh Sách Tài Khoản

| Username | Password | Role | Full Name |
|----------|----------|------|-----------|
| loicute | 123456 | admin | Administrator |

---

## 🔐 Cơ Chế Bảo Mật

- ✅ **JWT Token** - Hết hạn sau 8 giờ
- ✅ **Bcrypt** - Mật khẩu được hash rounds=10
- ✅ **Role-Based** - Chỉ admin mới quản lý tài khoản
- ✅ **Unique Username** - Database constraint
- ✅ **Protected Routes** - Kiểm tra token

---

## 🛠️ Cấu Hình Database

File `.env` (backend):
```
DB_HOST=localhost
DB_USER=root
DB_PASS=Loi@240102005
DB_NAME=hethongbongda
JWT_SECRET=your_jwt_secret_here
```

**Database tự động được khởi tạo khi server chạy!**

---

## 📚 Tài Liệu Chi Tiết

- 📖 [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Hướng dẫn setup chi tiết
- 📝 [CHANGES_SUMMARY.md](./CHANGES_SUMMARY.md) - Tóm tắt thay đổi
- 🗄️ [database.sql](./database.sql) - SQL script (nếu cần manual setup)

---

## ⚠️ Lỗi Thường Gặp

### "Lỗi kết nối database"
```
→ Kiểm tra MySQL đã chạy chưa
→ Kiểm tra .env DB_PASS có đúng không
→ Port 3306 không bị block
```

### "Sai tài khoản hoặc mật khẩu"
```
→ Username chính xác: loicute
→ Password chính xác: 123456
→ Kiểm tra CAPS LOCK
```

### "Cannot delete yourself"
```
→ Đăng nhập user khác rồi xóa
→ Admin account không thể tự xóa chính mình
```

### CORS Error
```
→ Backend URL: http://localhost:3001 (kiểm tra port)
→ Frontend URL: http://localhost:5173 (hoặc port khác)
→ Kiểm tra DangNhap.jsx const API = "http://localhost:3001"
```

---

## 🎮 API Endpoints

| Method | Endpoint | Auth | Mô Tả |
|--------|----------|------|-------|
| POST | `/login` | ❌ | Đăng nhập |
| POST | `/register` | ❌ | Đăng ký |
| GET | `/me` | ✅ | Info user hiện tại |
| GET | `/users` | ✅👑 | Danh sách users (admin only) |
| POST | `/users` | ✅👑 | Thêm user (admin only) |
| PUT | `/users/:id` | ✅👑 | Sửa user (admin only) |
| DELETE | `/users/:id` | ✅👑 | Xóa user (admin only) |

**Auth Requirement**: `Authorization: Bearer <token>`

---

## 📂 Cấu Trúc Project

```
webcuoiki/
├── backend/
│   ├── server.js
│   ├── db-init.js
│   ├── .env
│   └── package.json
├── loi123/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── DangNhap.jsx (Login)
│   │   │   ├── AdminPanel.jsx (Admin Dashboard)
│   │   │   └── ...
│   │   ├── App.jsx (Routing)
│   │   └── ...
│   └── package.json
├── SETUP_GUIDE.md
├── CHANGES_SUMMARY.md
└── database.sql
```

---

## ✅ Checklist Setup

- [ ] Backend: `npm install` ✅
- [ ] Backend: `npm start` chạy ở port 3001
- [ ] Database: tự động được tạo
- [ ] Admin account: loicute/123456 ✅
- [ ] Frontend: `npm install` ✅
- [ ] Frontend: `npm run dev` chạy ở port 5173
- [ ] Đăng nhập thành công → Vào Admin Panel
- [ ] Có thể quản lý tài khoản (Add/Edit/Delete)

---

## 💡 Tip

- **Đổi password**: Admin có thể sửa password user khác qua Admin Panel
- **Tạo user mới**: Admin có thể thêm user mới với role tùy ý
- **Reset admin**: Nếu quên admin password, restart server sẽ reset toàn bộ users table

---

**🎉 Happy coding! Nếu có vấn đề, kiểm tra console backend/frontend để debug.**
