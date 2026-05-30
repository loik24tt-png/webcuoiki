import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Trang chủ" },
  { to: "/giaidau", label: "Giải đấu" },
  { to: "/lich", label: "Lịch thi đấu" },
  { to: "/bangxephang", label: "Bảng xếp hạng" },
  { to: "/doibong", label: "Đội bóng" },
  { to: "/tintuc", label: "Tin tức" },
];

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('football_token');
    localStorage.removeItem('football_current_user');
    setUser(null);
    setMenuOpen(false);
    navigate('/home');
  };

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "active" : "")}> 
            {item.label}
          </NavLink>
        ))}

        {user === "admin" && (
          <NavLink to="/dieuhanh" className={({ isActive }) => (isActive ? "active" : "")}>Điều hành</NavLink>
        )}
      </div>

      <div className="nav-actions">
        {user ? (
          <div className="user-area">
            <button className="username-button" onClick={handleToggleMenu}>
              {user} <span className="user-toggle">{menuOpen ? "▲" : "▼"}</span>
            </button>
            {menuOpen && (
              <button className="logout-link" onClick={handleLogout}>Đăng xuất</button>
            )}
          </div>
        ) : (
          <NavLink to="/dangnhap" className="nav-login">Đăng nhập</NavLink>
        )}
      </div>
    </nav>
  );
}