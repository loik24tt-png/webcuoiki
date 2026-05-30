import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3001";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    full_name: "",
    role: "user"
  });

  // Check admin permission
  useEffect(() => {
    const role = localStorage.getItem("football_role");
    if (role !== "admin") {
      alert("❌ Bạn không có quyền truy cập trang này");
      navigate("/home");
    }
    fetchUsers();
  }, [navigate]);

  // Fetch users list
  const fetchUsers = async () => {
    try {
      // Mock - trong thực tế cần tạo API endpoint lấy danh sách users
      const token = localStorage.getItem("football_token");
      const res = await fetch(API + "/users", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error("Lỗi tải danh sách user:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add/Update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!formData.username || !formData.full_name) {
      setMsgType("error");
      return setMsg("⚠️ Vui lòng nhập đầy đủ thông tin");
    }

    if (!editingUser && !formData.password) {
      setMsgType("error");
      return setMsg("⚠️ Mật khẩu là bắt buộc khi thêm tài khoản");
    }

    try {
      const payload = {
        username: formData.username,
        full_name: formData.full_name,
        role: formData.role
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      const method = editingUser ? "PUT" : "POST";
      const url = editingUser ? `${API}/users/${editingUser.id}` : `${API}/users`;
      const token = localStorage.getItem("football_token");

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Lỗi xử lý");
      }

      setMsgType("success");
      setMsg(editingUser ? "✅ Cập nhật tài khoản thành công" : "✅ Thêm tài khoản thành công");
      
      setFormData({ username: "", password: "", full_name: "", role: "user" });
      setEditingUser(null);
      setShowForm(false);
      
      setTimeout(() => {
        fetchUsers();
      }, 1000);

    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg("❌ " + err.message);
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) return;

    try {
      const token = localStorage.getItem("football_token");
      const res = await fetch(`${API}/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Lỗi xóa tài khoản");

      setMsgType("success");
      setMsg("✅ Xóa tài khoản thành công");
      fetchUsers();

    } catch (err) {
      console.error(err);
      setMsgType("error");
      setMsg("❌ " + err.message);
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: "",
      full_name: user.full_name,
      role: user.role
    });
    setShowForm(true);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>👨‍💼 Quản Lý Tài Khoản Admin</h1>
        <button
          onClick={() => navigate("/home")}
          style={{
            padding: "0.5rem 1rem",
            background: "#999",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Quay Lại
        </button>
      </div>

      {msg && (
        <div style={{
          padding: "1rem",
          marginBottom: "1rem",
          background: msgType === "success" ? "#d4edda" : "#f8d7da",
          color: msgType === "success" ? "#155724" : "#721c24",
          borderRadius: "4px"
        }}>
          {msg}
        </div>
      )}

      {/* Form thêm/sửa */}
      {showForm && (
        <div style={{
          background: "#f9f9f9",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "2rem",
          border: "1px solid #ddd"
        }}>
          <h3>{editingUser ? "✏️ Sửa Tài Khoản" : "➕ Thêm Tài Khoản Mới"}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Tên đăng nhập</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  disabled={editingUser}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    opacity: editingUser ? 0.6 : 1
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                  Mật khẩu {editingUser && "(để trống nếu không đổi)"}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={editingUser ? "Không bắt buộc" : "Bắt buộc"}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Họ và tên</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Vai trò</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "4px"
                  }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                type="submit"
                style={{
                  padding: "0.7rem 1.5rem",
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                {editingUser ? "💾 Cập Nhật" : "➕ Thêm"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingUser(null);
                  setFormData({ username: "", password: "", full_name: "", role: "user" });
                }}
                style={{
                  padding: "0.7rem 1.5rem",
                  background: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Nút thêm mới */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "0.7rem 1.5rem",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "1.5rem"
          }}
        >
          ➕ Thêm Tài Khoản Mới
        </button>
      )}

      {/* Danh sách users */}
      <h3>📋 Danh Sách Tài Khoản</h3>
      {loading ? (
        <p>Đang tải...</p>
      ) : users.length === 0 ? (
        <p style={{ color: "#999" }}>Không có tài khoản nào</p>
      ) : (
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd"
        }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={{ padding: "0.8rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>ID</th>
              <th style={{ padding: "0.8rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>Tên Đăng Nhập</th>
              <th style={{ padding: "0.8rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>Họ và Tên</th>
              <th style={{ padding: "0.8rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>Vai Trò</th>
              <th style={{ padding: "0.8rem", textAlign: "center", borderBottom: "2px solid #ddd" }}>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "0.8rem" }}>{user.id}</td>
                <td style={{ padding: "0.8rem" }}>{user.username}</td>
                <td style={{ padding: "0.8rem" }}>{user.full_name}</td>
                <td style={{ padding: "0.8rem" }}>
                  <span style={{
                    padding: "0.3rem 0.8rem",
                    background: user.role === "admin" ? "#dc3545" : "#6c757d",
                    color: "white",
                    borderRadius: "4px",
                    fontSize: "0.9rem"
                  }}>
                    {user.role === "admin" ? "👑 Admin" : "👤 User"}
                  </span>
                </td>
                <td style={{ padding: "0.8rem", textAlign: "center" }}>
                  <button
                    onClick={() => handleEdit(user)}
                    style={{
                      padding: "0.4rem 0.8rem",
                      background: "#ffc107",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "0.5rem",
                      fontWeight: "bold"
                    }}
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{
                      padding: "0.4rem 0.8rem",
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    🗑️ Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
