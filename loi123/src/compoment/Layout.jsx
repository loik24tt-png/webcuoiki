import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout({ user, setUser }) {
  return (
    <>
      <header className="app-header">
        <div className="header-top">
          <div className="brand">
            <div className="brand-logo">⚽</div>
            <div>
              <p className="brand-name">HỆ THỐNG QUẢN LÝ GIẢI ĐẤU CHUYÊN NGHIỆP</p>
              <p className="brand-subtitle">Tìm kiếm giải đấu, lịch thi đấu và tin tức ngay trên cùng một nền tảng.</p>
            </div>
          </div>

          <div className="header-actions">
          </div>
        </div>

        <Navbar user={user} setUser={setUser} />
      </header>

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}