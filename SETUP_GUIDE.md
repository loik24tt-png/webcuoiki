# 🎯 Hướng Dẫn Setup Hệ Thống Quản Lý Admin

## 📋 Thông Tin Tài Khoản Admin Mặc Định

- **Username**: `loicute`
- **Password**: `123456`
- **Role**: `admin`

## 🚀 Bước 1: Khởi Động Backend

```bash
cd d:\webcuoiki\backend
npm install
npm start
```

Server sẽ chạy tại `http://localhost:3001`

**⚠️ Điều gì xảy ra khi server khởi động:**
- ✅ Database `hethongbongda` sẽ tự động được tạo
- ✅ Table `users` sẽ được tạo nếu chưa tồn tại
- ✅ Admin account `loicute` sẽ được tạo với password đã được hash bằng bcrypt
- ✅ Console sẽ hiển thị: `✅ Admin account created: loicute / 123456`

## 🚀 Bước 2: Khởi Động Frontend

```bash
cd d:\webcuoiki\loi123
npm install
npm run dev
```

Frontend sẽ chạy tại `http://localhost:5173` (hoặc port khác)

## 🔐 Bước 3: Đăng Nhập Admin

1. Mở ứng dụng frontend
2. Nhấp vào **"FOOTBALL ADMIN"** hoặc vào trang **Đăng Nhập**
3. Nhập:
   - **Username**: `loicute`
   - **Password**: `123456`
4. Nhấp nút **"Đăng Nhập"**
5. Bạn sẽ tự động chuyển hướng tới trang **Admin Panel** (`/admin`)

## 👨‍💼 Chức Năng Quản Lý Admin

Tại trang Admin Panel, bạn có thể:

### ➕ Thêm Tài Khoản Mới
1. Nhấp nút **"➕ Thêm Tài Khoản Mới"**
2. Nhập:
   - **Tên đăng nhập**: (unique)
   - **Mật khẩu**: (bắt buộc)
   - **Họ và tên**: 
   - **Vai trò**: User hoặc Admin
3. Nhấp **"➕ Thêm"**

### ✏️ Sửa Tài Khoản
1. Nhấp nút **"✏️ Sửa"** trên hàng tài khoản
2. Sửa thông tin:
   - **Tên đăng nhập**: Không thể sửa
   - **Mật khẩu**: Để trống nếu không đổi
   - **Họ và tên**: Có thể sửa
   - **Vai trò**: Có thể sửa
3. Nhấp **"💾 Cập Nhật"**

### 🗑️ Xóa Tài Khoản
1. Nhấp nút **"🗑️ Xóa"** trên hàng tài khoản
2. Xác nhận việc xóa
3. Tài khoản sẽ bị xóa khỏi hệ thống

**⚠️ Chú ý**: Bạn không thể tự xóa tài khoản của mình

## 🔐 Cơ Chế Bảo Mật

- ✅ Mật khẩu được hash bằng **bcrypt** (10 rounds)
- ✅ Tất cả requests yêu cầu **JWT Token** (được lưu trong localStorage)
- ✅ Token hết hạn sau **8 giờ**
- ✅ Chỉ **admin** mới có thể quản lý tài khoản
- ✅ Username là **unique** (không thể trùng)

## 📊 API Endpoints

Tất cả endpoints (trừ `/login` và `/register`) yêu cầu header:
```
Authorization: Bearer <token>
```

| Method | Endpoint | Mô Tả |
|--------|----------|-------|
| POST | `/login` | Đăng nhập |
| POST | `/register` | Đăng ký |
| GET | `/me` | Lấy thông tin user hiện tại |
| GET | `/users` | Lấy danh sách users (admin only) |
| POST | `/users` | Thêm user mới (admin only) |
| PUT | `/users/:id` | Cập nhật user (admin only) |
| DELETE | `/users/:id` | Xóa user (admin only) |

## 🛠️ Troubleshooting

### Lỗi: "Cannot read property 'username' of undefined"
- ✅ **Nguyên nhân**: Database chưa được khởi tạo
- ✅ **Giải pháp**: Kiểm tra xem server.js có chạy `initializeDatabase()` không

### Lỗi: "Sai tài khoản hoặc mật khẩu"
- ✅ **Nguyên nhân**: Username hoặc password sai
- ✅ **Giải pháp**: Kiểm tra lại username = `loicute`, password = `123456`

### Lỗi: "Cannot delete yourself"
- ✅ **Nguyên nhân**: Cố gắng xóa tài khoản admin đang đăng nhập
- ✅ **Giải pháp**: Đăng nhập với tài khoản khác rồi xóa

## ✅ Kiểm Tra Hệ Thống

Để kiểm tra database:

```bash
mysql -u root -p -D hethongbongda
SELECT * FROM users;
```

Bạn sẽ thấy:
```
| id | username | password | full_name | role | created_at |
|----|----------|----------|-----------|------|------------|
| 1  | loicute  | $2b$10$... | Administrator | admin | ... |
```

---

**🎉 Chúc mừng! Hệ thống đã sẵn sàng sử dụng!**
