// ========================= TinTucPhuong.jsx =========================
import { Link } from "react-router-dom";

export default function TinTucPhuong() {
  return (
    <div className="c1-page">
      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="live-tag">⚽ PHƯỜNG KON TUM MỞ RỘNG 2026</span>
          <h1>Giải Bóng Đá Phường: Nơi Kết Nối Đam Mê</h1>
          <p>Hơn cả một giải đấu, đây là sân chơi gắn kết tinh thần thể thao của người dân toàn phường.</p>
          <div className="hero-info">
            <span>🏟️ Sân cỏ nhân tạo Phường</span>
            <span>📅 Tháng 05/2026</span>
          </div>
        </div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="article-container">
        <div className="main-content">
          <h2>📣 Không khí tại "chảo lửa" Phường Kon Tum</h2>
          <p>Giải đấu năm nay ghi nhận sự tham gia của 16 đội bóng mạnh nhất khu vực. Sự cổ vũ nhiệt tình của người dân quanh sân chính là nét đẹp không thể thiếu mỗi chiều cuối tuần.</p>
          
          <img className="article-image" src="https://live.staticflickr.com/65535/51252777252_08e8b6b06e_b.jpg" alt="Sân bóng phường" />

          <h2>🔥 Diễn biến kịch tính</h2>
          <p>Đội bóng Tổ dân phố 3 đã có màn ngược dòng không tưởng khi bị dẫn trước 0-2 nhưng giành chiến thắng chung cuộc 3-2. Những pha bóng cống hiến thực sự làm mãn nhãn khán giả địa phương.</p>

          <div className="quote-box">
            “Thắng bại không quan trọng, quan trọng là chúng ta được cháy hết mình với anh em hàng xóm.” — Đội trưởng Tổ dân phố 3
          </div>

          <h2>📋 Thông tin hậu trường</h2>
          <p>Ban tổ chức đang lên kế hoạch tổ chức đêm Gala tổng kết giải đấu với sự tham gia của các nhà tài trợ địa phương nhằm động viên phong trào bóng đá bền vững.</p>
          
          <Link to="/tintuc" className="back-btn">← Trở về danh mục tin tức</Link>
        </div>

        {/* SIDEBAR */}
        <div className="sidebar">
          <h3>⚡ Lịch đấu sắp tới</h3>
          <div className="side-news">
            <p><strong>Ngày 27/05:</strong> Tứ kết 1 - Tổ 1 vs Tổ 4</p>
          </div>
          <div className="side-news">
            <p><strong>Ngày 28/05:</strong> Tứ kết 2 - Tổ 2 vs Tổ 5</p>
          </div>

          <h3 style={{ marginTop: '20px' }}>⭐ Cầu thủ ghi bàn nhiều nhất</h3>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Nguyễn Văn A (Tổ 3) - 7 bàn</li>
            <li>Trần Văn B (Tổ 1) - 5 bàn</li>
          </ul>
        </div>
      </div>
    </div>
  );
}