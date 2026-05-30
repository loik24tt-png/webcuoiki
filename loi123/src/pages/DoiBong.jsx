import { useState } from "react";
import { Link } from "react-router-dom";

// Component vẽ Logo bằng SVG - Đẳng cấp, gọn nhẹ, không bao giờ lo lỗi link ảnh
function TeamLogo({ type, name }) {
  // Bộ màu sắc chuẩn bóng đá theo đặc trưng từng đội
  const themeColors = {
    academy: { primary: "#1e3a8a", secondary: "#3b82f6", text: "#ffffff" }, // Xanh học viện
    modern: { primary: "#0f172a", secondary: "#64748b", text: "#ffffff" },  // Xám/Đen Châu Âu
    warrior: { primary: "#991b1b", secondary: "#ef4444", text: "#ffffff" }, // Đỏ lửa chiến binh
    royal: { primary: "#1e1b4b", secondary: "#eab308", text: "#facc15" },   // Sọc hoàng gia vàng tím
    shield: { primary: "#854d0e", secondary: "#eab308", text: "#ffffff" },  // Khiên vàng Lê Lợi
    star: { primary: "#065f46", secondary: "#10b981", text: "#facc15" },    // Sao rực rỡ văn hóa
    coffee: { primary: "#451a03", secondary: "#78350f", text: "#ffffff" },  // Nâu đậm Đăk Hà
    forest: { primary: "#064e3b", secondary: "#059669", text: "#ffffff" },  // Xanh đại ngàn Sa Thầy
    global: { primary: "#111827", secondary: "#06b6d4", text: "#ffffff" },  // Giao thoa biên giới
    steel: { primary: "#374151", secondary: "#9ca3af", text: "#ffffff" },   // Khiên thép Đăk Tô
    wave: { primary: "#0369a1", secondary: "#0ea5e9", text: "#ffffff" },    // Sóng nước cầu treo
    mountain: { primary: "#047857", secondary: "#34d399", text: "#facc15" },// Đỉnh núi Ngọc Linh
  };

  const colors = themeColors[type] || themeColors.modern;

  return (
    <svg
      viewBox="0 0 100 100"
      className="team-svg-badge"
      style={{
        width: "65px",
        height: "65px",
        filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.2))",
      }}
    >
      {/* Khung viền hiệu ứng tỏa sáng */}
      <circle cx="50" cy="50" r="48" fill="none" stroke={colors.secondary} strokeWidth="1" opacity="0.5"/>
      
      {/* Hình khối Huy hiệu chính dựa theo type */}
      {type === "shield" || type === "steel" || type === "warrior" ? (
        // Dáng Khiên Tây Ban Nha / Ý quyền lực
        <path d="M20,20 C20,20 50,10 50,10 C50,10 80,20 80,20 C80,55 70,80 50,92 C30,80 20,55 20,20 Z" fill={colors.primary} stroke={colors.secondary} strokeWidth="3" />
      ) : type === "royal" || type === "academy" || type === "mountain" ? (
        // Dáng Khiên Tròn truyền thống Anh Quốc
        <circle cx="50" cy="50" r="42" fill={colors.primary} stroke={colors.secondary} strokeWidth="3" />
      ) : (
        // Dáng Khiên Lục Giác hiện đại phong cách Đức
        <polygon points="50,8 85,25 85,70 50,92 15,70 15,25" fill={colors.primary} stroke={colors.secondary} strokeWidth="3" />
      )}

      {/* Chi tiết đặc trưng bên trong từng logo */}
      {type === "academy" && (
        <path d="M35,40 L50,25 L65,40 L50,55 Z M50,55 L50,80" stroke={colors.secondary} strokeWidth="2" fill="none" />
      )}
      {type === "modern" && (
        <circle cx="50" cy="50" r="20" fill="none" stroke={colors.secondary} strokeWidth="4" strokeDasharray="5,3" />
      )}
      {type === "warrior" && (
        <path d="M50,25 L58,45 L78,45 L62,58 L68,78 L50,65 L32,78 L38,58 L22,45 L42,45 Z" fill={colors.secondary} />
      )}
      {type === "royal" && (
        <>
          <line x1="38" y1="18" x2="38" y2="82" stroke={colors.secondary} strokeWidth="4" />
          <line x1="50" y1="12" x2="50" y2="88" stroke={colors.secondary} strokeWidth="4" />
          <line x1="62" y1="18" x2="62" y2="82" stroke={colors.secondary} strokeWidth="4" />
        </>
      )}
      {type === "shield" && (
        <path d="M50,25 L50,75 M30,45 L70,45" stroke={colors.secondary} strokeWidth="5" strokeLinecap="round" />
      )}
      {type === "star" && (
        <path d="M50,20 L59,38 L79,41 L65,55 L68,75 L50,66 L32,75 L35,55 L21,41 L41,38 Z" fill={colors.text} />
      )}
      {type === "coffee" && (
        <path d="M35,45 C35,35 65,35 65,45 C65,65 50,75 50,75 C50,75 35,65 35,45 Z" fill="none" stroke={colors.secondary} strokeWidth="3" />
      )}
      {type === "forest" && (
        <path d="M50,22 L75,68 L60,68 L70,82 L30,82 L40,68 L25,68 Z" fill={colors.secondary} />
      )}
      {type === "global" && (
        <circle cx="50" cy="50" r="22" fill="none" stroke={colors.secondary} strokeWidth="2" />
      )}
      {type === "steel" && (
        <path d="M32,35 L50,22 L68,35 L62,70 L50,82 L38,70 Z" fill={colors.secondary} opacity="0.7" />
      )}
      {type === "wave" && (
        <path d="M25,45 Q37.5,35 50,45 T75,45 M25,58 Q37.5,48 50,58 T75,58" fill="none" stroke={colors.secondary} strokeWidth="3" strokeLinecap="round" />
      )}
      {type === "mountain" && (
        <path d="M25,75 L50,30 L75,75 Z M40,75 L50,50 L60,75 Z" fill={colors.secondary} opacity="0.8" />
      )}

      {/* Quả bóng mini làm điểm nhấn trung tâm cho mọi logo */}
      <circle cx="50" cy="50" r="8" fill="#ffffff" stroke="#000000" strokeWidth="1" />
      <circle cx="50" cy="50" r="4" fill="#000000" />

      {/* Chữ viết tắt tên đội uốn hoặc bo theo viền dưới */}
      <text
        x="50"
        y="84"
        textAnchor="middle"
        fill={colors.text}
        fontSize="9"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        {name.split(" ")[0].substring(0, 3).toUpperCase()}
      </text>
    </svg>
  );
}

export default function DoiBong() {
  const [search, setSearch] = useState("");

  // Dữ liệu đã thay thuộc tính `logo` cũ thành `logoType` để vẽ SVG chất lượng cao
  const teams = [
    { id: 1, name: "Trường Chinh", form: "W-W-D", logoType: "academy", matches: 12, points: 28 },
    { id: 2, name: "Duy Tân", form: "W-L-W", logoType: "modern", matches: 12, points: 25 },
    { id: 3, name: "Ngô Mây", form: "D-D-L", logoType: "warrior", matches: 12, points: 18 },
    { id: 4, name: "Quang Trung", form: "L-W-W", logoType: "royal", matches: 12, points: 16 },
    { id: 5, name: "Lê Lợi", form: "L-L-D", logoType: "shield", matches: 12, points: 10 },
    { id: 6, name: "Nguyễn Trãi", form: "W-D-W", logoType: "star", matches: 12, points: 22 },
    { id: 7, name: "Đăk Hà FC", form: "W-W-L", logoType: "coffee", matches: 12, points: 24 },
    { id: 8, name: "Sa Thầy FC", form: "L-D-L", logoType: "forest", matches: 12, points: 8 },
    { id: 9, name: "Ngọc Hồi FC", form: "D-W-L", logoType: "global", matches: 12, points: 15 },
    { id: 10, name: "Đăk Tô FC", form: "W-L-W", logoType: "steel", matches: 12, points: 21 },
    { id: 11, name: "Kon Rẫy FC", form: "L-L-L", logoType: "wave", matches: 12, points: 5 },
    { id: 12, name: "Đăk Glei FC", form: "W-D-D", logoType: "mountain", matches: 12, points: 17 }
  ];

  const filtered = teams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="teams-page-container">
      <div className="teams-header-section">
        <div className="title-box">
          <h2>⚽ Danh Sách Đội Bóng</h2>
          <p>Quản lý danh sách và thông số các câu lạc bộ trong giải đấu</p>
        </div>
        
        <div className="search-wrapper">
          <input
            type="text"
            className="modern-search-input"
            placeholder="🔍 Tìm kiếm tên đội bóng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="teams-grid-layout">
        {filtered.length > 0 ? (
          filtered.map((t) => (
            <Link key={t.id} to={`/doibong/${t.id}`} className="modern-team-link">
              <div className="modern-team-card">
                
                {/* KHU VỰC HIỂN THỊ LOGO SVG CAO CẤP */}
                <div className="team-badge" style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
                  <TeamLogo type={t.logoType} name={t.name} />
                </div>
                
                <h3 className="team-title">{t.name}</h3>
                
                <div className="team-mini-stats">
                  <div><span>Trận:</span> <strong>{t.matches}</strong></div>
                  <div><span>Điểm:</span> <strong className="highlight-pts">{t.points}</strong></div>
                </div>

                <div className="team-form-wrapper">
                  <span className="form-label">Phong độ:</span>
                  <span className={`form-badge ${t.form.startsWith('W') ? 'form-good' : t.form.startsWith('D') ? 'form-normal' : 'form-bad'}`}>
                    {t.form}
                  </span>
                </div>
                
                <div className="card-hover-footer">
                  <span>Xem chi tiết đội ➔</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="no-data-alert">
            <p>❌ Không tìm thấy đội bóng nào phù hợp với từ khóa.</p>
          </div>
        )}
      </div>
    </div>
  );
}