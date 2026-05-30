// ========================= TinTucC1.jsx =========================

import { Link } from "react-router-dom";

export default function TinTucC1() {
  return (
    <div className="c1-page">
      {/* HERO */}
      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=1400&auto=format&fit=crop"
          alt=""
        />

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="live-tag">🔥 BREAKING NEWS</span>

          <h1>
            Champions League tạo nên trận đấu điên rồ nhất mùa giải
          </h1>

          <p>
            Real Madrid và Man City khiến cả thế giới bóng đá bùng nổ
            với màn rượt đuổi tỷ số nghẹt thở.
          </p>

          <div className="hero-info">
            <span>⚽ UEFA Champions League</span>
            <span>🕒 22/05/2026</span>
            <span>👁 2.4M lượt xem</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="article-container">
        <div className="main-content">
          <p className="intro">
            Trận đấu giữa Real Madrid và Manchester City được xem là
            màn thư hùng hấp dẫn nhất Champions League mùa này.
          </p>

          <img
            className="article-image"
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop"
            alt=""
          />

          <h2>🔥 Bầu không khí bùng nổ</h2>

          <p>
            Hàng chục nghìn cổ động viên phủ kín khán đài tạo nên bầu
            không khí cuồng nhiệt. Ngay từ phút đầu tiên, tốc độ trận
            đấu đã được đẩy lên cực cao.
          </p>

          <p>
            Những pha phối hợp tốc độ, sút xa và phản công liên tục
            khiến người xem gần như không thể rời mắt khỏi màn hình.
          </p>

          <div className="quote-box">
            “Đây là một trong những trận đấu hay nhất lịch sử Champions
            League.” — Chuyên gia bóng đá châu Âu
          </div>

          <img
            className="article-image"
            src="https://images.unsplash.com/photo-1508098682722-e99c643e7485?q=80&w=1200&auto=format&fit=crop"
            alt=""
          />

          <h2>⚽ Những khoảnh khắc định đoạt</h2>

          <p>
            Các siêu sao liên tục tỏa sáng bằng những bàn thắng đẳng cấp
            thế giới. Cả hai đội đều tạo ra rất nhiều cơ hội nguy hiểm.
          </p>

          <p>
            Người hâm mộ đánh giá đây là trận cầu xứng đáng với đẳng cấp
            của giải đấu danh giá nhất châu Âu.
          </p>

          <Link to="/tintuc" className="back-btn">
            ← Quay lại tin tức
          </Link>
        </div>

        {/* SIDEBAR */}
        <div className="sidebar">
          <h3>🔥 Tin nổi bật</h3>

          <div className="side-news">
            <img
              src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=500&auto=format&fit=crop"
              alt=""
            />

            <div>
              <h4>World Cup 2026</h4>
              <p>Các đội tuyển lớn công bố đội hình.</p>
            </div>
          </div>

          <div className="side-news">
            <img
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500&auto=format&fit=crop"
              alt=""
            />

            <div>
              <h4>Asian Cup</h4>
              <p>Những bất ngờ lớn xuất hiện.</p>
            </div>
          </div>

          <div className="side-news">
            <img
              src="https://images.unsplash.com/photo-1508098682722-e99c643e7485?q=80&w=500&auto=format&fit=crop"
              alt=""
            />

            <div>
              <h4>Premier League</h4>
              <p>Cuộc đua vô địch cực căng.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}