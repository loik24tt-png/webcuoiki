import { NavLink } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <nav className="navbar">
      <NavLink to="/">Trang chủ</NavLink>
      <NavLink to="/lich">Lịch</NavLink>
      <NavLink to="/bangxephang">BXH</NavLink>
      <NavLink to="/doibong">Đội bóng</NavLink>
      <NavLink to="/tintuc">Tin tức</NavLink>
      <NavLink to="/giaidau">Giải đấu</NavLink>

      {user === "admin" && <NavLink to="/dieuhanh">Điều hành</NavLink>}

      <NavLink to="/dangnhap">Đăng nhập</NavLink>
    </nav>
  );
}