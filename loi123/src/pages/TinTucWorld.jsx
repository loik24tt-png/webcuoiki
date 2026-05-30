// ========================= WorldCup2026.jsx =========================

import { Link } from "react-router-dom";

export default function WorldCup2026() {
  return (
    <div className="modern-news-page">
      {/* HERO */}
      <section className="modern-hero">
        <img
          src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1800&auto=format&fit=crop"
          alt=""
        />

        <div className="modern-overlay"></div>

        <div className="floating-gradient"></div>

        <div className="modern-hero-content">
          <div className="top-tags">
            <span className="live-pill">LIVE</span>
            <span className="category-pill">WORLD CUP 2026</span>
          </div>

          <h1>
            World Cup 2026 sẽ thay đổi lịch sử bóng đá thế giới
          </h1>

          <p>
            FIFA xác nhận đây sẽ là kỳ World Cup lớn nhất mọi thời đại
            với 48 đội tuyển và hàng tỷ người theo dõi toàn cầu.
          </p>

          <div className="hero-stats">
            <div className="stat-box">
              <h3>48</h3>
              <span>Đội tuyển</span>
            </div>

            <div className="stat-box">
              <h3>16</h3>
              <span>Thành phố</span>
            </div>

            <div className="stat-box">
              <h3>5.8B</h3>
              <span>Lượt xem</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="modern-layout">
        {/* LEFT */}
        <div className="modern-main">
          <div className="glass-card">
            <span className="mini-tag">BREAKING</span>

            <h2>
              🌍 Những siêu cường bóng đá đã sẵn sàng cho cuộc chiến lớn nhất hành tinh
            </h2>

            <p>
              Brazil, Pháp, Argentina và Anh đều mang tới những thế hệ
              cầu thủ cực kỳ chất lượng với tham vọng thống trị thế giới.
            </p>

            <img
              className="modern-image"
              src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1400&auto=format&fit=crop"
              alt=""
            />

            <div className="modern-grid-info">
              <div className="info-card">
                <span>🏆</span>
                <h4>Giải đấu lớn nhất</h4>
                <p>
                  World Cup 2026 sẽ có số đội tuyển tham gia cao nhất lịch sử.
                </p>
              </div>

              <div className="info-card">
                <span>🔥</span>
                <h4>Trận cầu đỉnh cao</h4>
                <p>
                  Người hâm mộ kỳ vọng xuất hiện thêm nhiều trận đấu kinh điển.
                </p>
              </div>

              <div className="info-card">
                <span>⚽</span>
                <h4>Siêu sao hội tụ</h4>
                <p>
                  Mbappe, Bellingham, Vinicius và Haaland được chú ý nhất.
                </p>
              </div>
            </div>

            <div className="big-quote">
              “World Cup 2026 sẽ mở ra kỷ nguyên bóng đá hoàn toàn mới.”
            </div>

            <img
              className="modern-image"
              src="https://images.unsplash.com/photo-1508098682722-e99c643e7485?q=80&w=1400&auto=format&fit=crop"
              alt=""
            />

            <h2>⚡ Công nghệ và trải nghiệm hiện đại</h2>

            <p>
              FIFA đang đầu tư mạnh vào AI, camera góc rộng và công nghệ
              VAR thế hệ mới nhằm nâng trải nghiệm người xem lên mức cao nhất.
            </p>

            <p>
              Các sân vận động cũng được nâng cấp với hệ thống ánh sáng,
              màn hình LED và hiệu ứng trình diễn hiện đại.
            </p>

            <Link to="/tintuc" className="modern-btn">
              ← Quay lại trang tin tức
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <aside className="modern-sidebar">
          <div className="sidebar-card">
            <h3>🔥 Trending</h3>

            <div className="trend-item">
              <img
                src="https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=500&auto=format&fit=crop"
                alt=""
              />

              <div>
                <h4>Champions League</h4>
                <span>2.4M lượt xem</span>
              </div>
            </div>

            <div className="trend-item">
              <img
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500&auto=format&fit=crop"
                alt=""
              />

              <div>
                <h4>Asian Cup</h4>
                <span>Tin nóng hôm nay</span>
              </div>
            </div>

            <div className="trend-item">
              <img
                src="https://images.unsplash.com/photo-1508098682722-e99c643e7485?q=80&w=500&auto=format&fit=crop"
                alt=""
              />

              <div>
                <h4>Premier League</h4>
                <span>Cuộc đua nghẹt thở</span>
              </div>
            </div>
          </div>

          <div className="score-card">
            <h3>⚽ Match Preview</h3>

            <div className="match-box">
              <div className="team">🇧🇷 Brazil</div>

              <div className="vs">VS</div>

              <div className="team">🇫🇷 France</div>
            </div>

            <button className="watch-btn">
              Xem phân tích trận đấu
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}