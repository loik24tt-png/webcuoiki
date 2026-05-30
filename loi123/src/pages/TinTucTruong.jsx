// ========================= TinTucTruong.jsx =========================
import { Link } from "react-router-dom";

export default function TinTucTruong() {
  // Danh sách 12 đội bóng (mày thay tên vào đây)
  const teams = [
    "10A1", "10A2", "11A1", "11A2", "12A1", "12A2", 
    "10B1", "10B2", "11B1", "11B2", "12B1", "12B2"
  ];

  return (
    <div className="c1-page">
      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="live-tag">🔥 ĐANG DIỄN RA: MÙA GIẢI 2026</span>
          <h1>Giải Bóng Đá Trường: 12 Anh Tài Hội Ngộ</h1>
          <p>Chứng kiến màn so tài của 12 đội bóng xuất sắc nhất. Ai sẽ nâng cao chiếc cúp vô địch danh giá?</p>
          <div className="hero-info">
            <span>⚽ 12 Đội bóng tham dự</span>
            <span>🕒 Cập nhật: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="article-container">
        <div className="main-content">
          {/* PHẦN DANH SÁCH 12 ĐỘI */}
          <section className="teams-grid">
            <h2>🏆 12 Đội bóng tranh tài</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {teams.map((team, index) => (
                <div key={index} className="team-card" style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                  {team}
                </div>
              ))}
            </div>
          </section>

          <h2>⚡ Tin nóng từ sân cỏ</h2>
          <p>Các trận đấu vòng bảng đang diễn ra cực kỳ kịch tính. Đội 12A1 vừa có chiến thắng hủy diệt 4-0, trong khi 10A2 tạo nên bất ngờ lớn khi cầm hòa đội đương kim vô địch.</p>
          
          <div className="quote-box">
            “Kỹ thuật cá nhân của các em học sinh năm nay thực sự vượt xa kỳ vọng của ban huấn luyện.” — HLV trưởng giải đấu
          </div>
        </div>

        {/* SIDEBAR - CẬP NHẬT TRỰC TIẾP */}
        <div className="sidebar">
          <h3>🕒 Bản tin nóng (Live)</h3>
          <div className="side-news">
            <p><strong>10:30:</strong> Kết thúc lượt trận thứ 3 bảng A.</p>
          </div>
          <div className="side-news">
            <p><strong>09:15:</strong> 11B1 dẫn đầu bảng B với 6 điểm tuyệt đối.</p>
          </div>
          
          <h3 style={{ marginTop: '20px' }}>⚡ Tin liên quan</h3>
          {/* ... giữ nguyên các link sidebar cũ của mày ... */}
          <Link to="/tintuc" className="back-btn" style={{ display: 'block', marginTop: '20px' }}>← Về trang chủ</Link>
        </div>
      </div>
    </div>
  );
}