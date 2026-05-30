import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "./compoment/Layout.jsx";

import Home from "./pages/Home.jsx";
import LichThiDau from "./pages/LichThiDau.jsx";
import BangXepHang from "./pages/BangXepHang.jsx";
import DoiBong from "./pages/DoiBong.jsx";
import ChiTietDoi from "./pages/ChiTietDoi.jsx";
import GiaiDau from "./pages/GiaiDau.jsx";
import TinTuc from "./pages/TinTuc.jsx";
import DangNhap from "./pages/DangNhap.jsx";
import TinTucC1 from "./pages/TinTucC1.jsx";
import TinTucWorld from "./pages/TinTucWorld.jsx";
import DieuLeGiaiDau from "./pages/DieuLenhGiaiDau.jsx"; 
import TinTucTruong from "./pages/TinTucTruong.jsx";
import TinTucPhuong from "./pages/TinTucPhuong.jsx";
import CapNhatKetQua from "./pages/CapNhatKetQua.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

function App() {
  const [matches, setMatches] = useState([
    { doi1: "Trường Chinh", doi2: "Duy Tân", score: "2-1" },
    { doi1: "Ngô Mây", doi2: "Quang Trung", score: "1-1" },
    { doi1: "Lê Lợi", doi2: "Nguyễn Trãi", score: "3-2" },
  ]);
  const [user, setUser] = useState(null);

  // Khôi phục user từ localStorage khi app khởi động
  useEffect(() => {
    const saved = localStorage.getItem('football_current_user');
    if (saved) setUser(saved);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          
          {/* ✅ CÔNG KHAI TRANG CHỦ: Mở web lên là vào thẳng Trang chủ xem thoải mái */}
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          
          {/* Các trang dữ liệu khác mở tự do */}
          <Route path="lich" element={<LichThiDau matches={matches} />} />
          <Route path="bangxephang" element={<BangXepHang matches={matches} />} />
          <Route path="cap-nhat-ket-qua/:matchId" element={<CapNhatKetQua />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="doibong" element={<DoiBong />} />
          <Route path="doibong/:id" element={<ChiTietDoi />} />
          <Route path="giaidau" element={<GiaiDau />} />
          <Route path="tintuc" element={<TinTuc />} />
          <Route path="tintuc-c1" element={<TinTucC1 />} />
          <Route path="tintuc-world" element={<TinTucWorld />} />
          <Route path="tintuc-truong" element={<TinTucTruong />} />
          <Route path="tintuc-phuong" element={<TinTucPhuong />} />
          <Route path="thongke" element={<p>📊 Thống kê sắp ra mắt</p>} />
          <Route path="lienhe" element={<p>📞 Liên hệ sắp ra mắt</p>} />
          <Route path="dieulelenggiaidau" element={<DieuLeGiaiDau onBack={() => window.history.back()} />} />
          {/* ✅ TRANG ĐĂNG NHẬP: Nếu đã log xong thì đá về /home, chưa log thì hiện form đăng nhập */}
          <Route 
            path="dangnhap" 
            element={user ? <Navigate to="/home" replace /> : <DangNhap setUser={setUser} />} 
          />

          {/* ✅ TRANG ĐIỀU HÀNH: Chỉ có 1 Route duy nhất chuẩn xác, check quyền Admin */}
          <Route
            path="dieuhanh"
            element={
              user ? (
                <DieuLeGiaiDau />
              ) : (
                <Navigate to="/dangnhap" replace />
              )
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;