import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


// 1. TÁCH MOCK DATA RA NGOÀI - GIẢ LẬP DỮ LIỆU TỪ HỆ THỐNG QUẢN TRỊ
const MOCK_MATCHES = [
  { id: 1, round: "Vòng 1 - Bảng A", doi1: "Trường Chinh FC", doi2: "Duy Tân FC", score: "2-1", status: "FINISHED" },
  { id: 2, round: "Vòng 1 - Bảng A", doi1: "Ngô Mây FC", doi2: "Quang Trung FC", score: "1-0", status: "FINISHED" },
  { id: 3, round: "Vòng 1 - Bảng B", doi1: "Lê Lợi FC", doi2: "Nguyễn Trãi FC", score: "2-2", status: "FINISHED" },
  { id: 4, round: "Vòng 1 - Bảng B", doi1: "Đăk Hà FC", doi2: "Sa Thầy FC", score: "3-1", status: "FINISHED" },
  { id: 5, round: "Vòng 2 - Bảng A", doi1: "Trường Chinh FC", doi2: "Ngô Mây FC", score: "1-1", status: "LIVE" }, // Trận đang trực tiếp
  { id: 6, round: "Vòng 2 - Bảng B", doi1: "Đăk Hà FC", doi2: "Lê Lợi FC", score: "0-0", status: "SCHEDULED" } // Trận chưa đá
];

const MOCK_NOTICES = [
  { id: "n1", title: "📜 Thông báo: Ban hành chính thức Điều lệ giải bóng đá Kon Tum 2026", date: "28/05/2026" },
  { id: "n2", title: "⚽ Cập nhật: Hoàn tất danh sách 12 đội bóng tham gia tranh tài khối Trường", date: "26/05/2026" }
];

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Giả lập hiệu ứng tải trang (Loading) trong 0.5 giây cho chuyên nghiệp
  useEffect(() => {
    const timer = setTimeout(() => {
      setMatches(MOCK_MATCHES);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Thuật toán xử lý tự động tính điểm Bảng Xếp Hạng từ mảng trận đấu (Frontend thuần)
  const getTopStandings = () => {
    const table = {};
    matches.forEach((m) => {
      if (!m.score || m.status === "SCHEDULED") return;
      const [a, b] = m.score.split("-").map(Number);

      if (!table[m.doi1]) table[m.doi1] = { name: m.doi1, played: 0, won: 0, drawn: 0, lost: 0, points: 0 };
      if (!table[m.doi2]) table[m.doi2] = { name: m.doi2, played: 0, won: 0, drawn: 0, lost: 0, points: 0 };

      table[m.doi1].played += 1;
      table[m.doi2].played += 1;

      if (a > b) {
        table[m.doi1].won += 1;
        table[m.doi2].lost += 1;
        table[m.doi1].points += 3;
      } else if (a < b) {
        table[m.doi2].won += 1;
        table[m.doi1].lost += 1;
        table[m.doi2].points += 3;
      } else {
        table[m.doi1].drawn += 1;
        table[m.doi2].drawn += 1;
        table[m.doi1].points += 1;
        table[m.doi2].points += 1;
      }
    });

    // Sắp xếp theo điểm số giảm dần và lấy Top 3 đội cao điểm nhất
    return Object.values(table)
      .sort((x, y) => y.points - x.points)
      .slice(0, 3);
  };

  const topTeams = getTopStandings();

  if (loading) {
    return <div className="text-center p-10 font-bold text-gray-500">🔄 Đang tải dữ liệu trang chủ...</div>;
  }

  return (
    <div className="home-modern-container" style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      
      {/* KHU VỰC 1: BANNER CHÀO MỪNG */}
      <header className="home-hero-banner" style={{ backgroundColor: "#1e3a8a", color: "#fff", padding: "30px", borderRadius: "16px", marginBottom: "30px", textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>🏆 GIẢI BÓNG ĐÁ VÔ ĐỊCH PHONG TRÀO KON TUM 2026</h1>
        <p style={{ opacity: 0.9 }}>Hệ thống quản lý lịch thi đấu, kết quả và bảng xếp hạng tự động cập nhật</p>
      </header>

      <div className="home-grid-layout" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "25px" }}>
        
        {/* CỘT TRÁI: TIÊU ĐIỂM TRẬN ĐẤU */}
        <main className="home-main-content">
          <section className="match-section" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "bold", borderLeft: "4px solid #3b82f6", paddingLeft: "10px", marginBottom: "20px" }}>
              ⚽ Kết Quả & Trận Đấu Tiêu Điểm
            </h2>
            
            <div className="matches-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {matches.slice(-3).map((match) => (
                <div key={match.id} className="match-item-card" style={{ display: "flex", justifyContent: "between", alignItems: "center", padding: "15px", border: "1px solid #e2e8f0", borderRadius: "8px", background: match.status === "LIVE" ? "#fef2f2" : "#fff" }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: "12px", padding: "3px 8px", borderRadius: "12px", background: match.status === "LIVE" ? "#ef4444" : "#e2e8f0", color: match.status === "LIVE" ? "#fff" : "#475569", fontWeight: "bold" }}>
                      {match.status === "LIVE" ? "🔴 LIVE" : match.status === "FINISHED" ? "KẾT THÚC" : "SẮP ĐÁ"}
                    </span>
                    <p style={{ fontSize: "13px", color: "#64748b", marginTop: "5px" }}>{match.round}</p>
                  </div>
                  
                  <div style={{ flex: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", fontWeight: "bold" }}>
                    <span style={{ textAlign: "right", minWidth: "100px" }}>{match.doi1}</span>
                    <span style={{ background: "#0f172a", color: "#fff", padding: "4px 12px", borderRadius: "4px", fontFamily: "monospace" }}>
                      {match.status === "SCHEDULED" ? "vs" : match.score}
                    </span>
                    <span style={{ textAlign: "left", minWidth: "100px" }}>{match.doi2}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* CỘT PHẢI: BẢNG XẾP HẠNG THU NHỎ & THÔNG BÁO */}
        <aside className="home-sidebar" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          {/* TOP 3 BẢNG XẾP HẠNG */}
          <section className="sidebar-widget" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px", color: "#1e3a8a" }}>🏆 Top 3 Đội Dẫn Đầu</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #edf2f7", fontSize: "13px", color: "#718096" }}>
                  <th style={{ textAlign: "center", paddingBottom: "8px" }}>Hạng</th>
                  <th style={{ textAlign: "left", paddingBottom: "8px" }}>Đội</th>
                  <th style={{ textAlign: "center", paddingBottom: "8px" }}>Điểm</th>
                </tr>
              </thead>
              <tbody>
                {topTeams.map((team, idx) => (
                  <tr key={team.name} style={{ borderBottom: "1px solid #edf2f7", fontSize: "14px" }}>
                    <td style={{ textAlign: "center", padding: "10px 0", fontWeight: "bold", color: idx === 0 ? "#eab308" : "#4a5568" }}>{idx + 1}</td>
                    <td style={{ padding: "10px 0", fontWeight: "500" }}>{team.name}</td>
                    <td style={{ textAlign: "center", padding: "10px 0", fontWeight: "bold", color: "#3b82f6" }}>{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/bangxephang" style={{ display: "block", textAlign: "center", marginTop: "15px", fontSize: "13px", color: "#3b82f6", fontWeight: "bold", decoration: "none" }}>
              Xem bảng xếp hạng đầy đủ ➔
            </Link>
          </section>

          {/* TIN TỨC / THÔNG BÁO NỘI BỘ GIẢI ĐẤU */}
          <section className="sidebar-widget" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px", color: "#1e3a8a" }}>📢 Thông Báo Từ BTC</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {MOCK_NOTICES.map(notice => (
                <div key={notice.id} style={{ fontSize: "13px", borderBottom: "1px dashed #e2e8f0", paddingBottom: "8px" }}>
                  <Link to="/tintuc" style={{ color: "#334155", textDecoration: "none", fontWeight: "500", hover: { color: "#3b82f6" } }}>
                    {notice.title}
                  </Link>
                  <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "3px" }}>📅 {notice.date}</p>
                </div>
              ))}
            </div>
          </section>

        </aside>
      </div>
    </div>
  );
}