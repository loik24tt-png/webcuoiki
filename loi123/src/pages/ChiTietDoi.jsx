import { useParams, useNavigate } from "react-router-dom";
import "../App.css"; // Đảm bảo đường dẫn này đúng với cấu trúc thư mục của mày

// Component vẽ Logo bằng SVG đồng bộ từ trang danh sách
function TeamLogo({ type, name, size = "65px" }) {
  const themeColors = {
    academy: { primary: "#1e3a8a", secondary: "#3b82f6", text: "#ffffff" },
    modern: { primary: "#0f172a", secondary: "#64748b", text: "#ffffff" },
    warrior: { primary: "#991b1b", secondary: "#ef4444", text: "#ffffff" },
    royal: { primary: "#1e1b4b", secondary: "#eab308", text: "#facc15" },
    shield: { primary: "#854d0e", secondary: "#eab308", text: "#ffffff" },
    star: { primary: "#065f46", secondary: "#10b981", text: "#facc15" },
    coffee: { primary: "#451a03", secondary: "#78350f", text: "#ffffff" },
    forest: { primary: "#064e3b", secondary: "#059669", text: "#ffffff" },
    global: { primary: "#111827", secondary: "#06b6d4", text: "#ffffff" },
    steel: { primary: "#374151", secondary: "#9ca3af", text: "#ffffff" },
    wave: { primary: "#0369a1", secondary: "#0ea5e9", text: "#ffffff" },
    mountain: { primary: "#047857", secondary: "#34d399", text: "#facc15" },
  };

  const colors = themeColors[type] || themeColors.modern;

  return (
    <svg
      viewBox="0 0 100 100"
      style={{
        width: size,
        height: size,
        filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.3))",
      }}
    >
      <circle cx="50" cy="50" r="48" fill="none" stroke={colors.secondary} strokeWidth="1" opacity="0.5"/>
      
      {/* Hình dáng Huy hiệu chính */}
      {type === "shield" || type === "steel" || type === "warrior" ? (
        <path d="M20,20 C20,20 50,10 50,10 C50,10 80,20 80,20 C80,55 70,80 50,92 C30,80 20,55 20,20 Z" fill={colors.primary} stroke={colors.secondary} strokeWidth="3" />
      ) : type === "royal" || type === "academy" || type === "mountain" ? (
        <circle cx="50" cy="50" r="42" fill={colors.primary} stroke={colors.secondary} strokeWidth="3" />
      ) : (
        <polygon points="50,8 85,25 85,70 50,92 15,70 15,25" fill={colors.primary} stroke={colors.secondary} strokeWidth="3" />
      )}

      {/* Chi tiết lõi bên trong */}
      {type === "academy" && <path d="M35,40 L50,25 L65,40 L50,55 Z M50,55 L50,80" stroke={colors.secondary} strokeWidth="2" fill="none" />}
      {type === "modern" && <circle cx="50" cy="50" r="20" fill="none" stroke={colors.secondary} strokeWidth="4" strokeDasharray="5,3" />}
      {type === "warrior" && <path d="M50,25 L58,45 L78,45 L62,58 L68,78 L50,65 L32,78 L38,58 L22,45 L42,45 Z" fill={colors.secondary} />}
      {type === "royal" && (
        <>
          <line x1="38" y1="18" x2="38" y2="82" stroke={colors.secondary} strokeWidth="4" />
          <line x1="50" y1="12" x2="50" y2="88" stroke={colors.secondary} strokeWidth="4" />
          <line x1="62" y1="18" x2="62" y2="82" stroke={colors.secondary} strokeWidth="4" />
        </>
      )}
      {type === "shield" && <path d="M50,25 L50,75 M30,45 L70,45" stroke={colors.secondary} strokeWidth="5" strokeLinecap="round" />}
      {type === "star" && <path d="M50,20 L59,38 L79,41 L65,55 L68,75 L50,66 L32,75 L35,55 L21,41 L41,38 Z" fill={colors.text} />}
      {type === "coffee" && <path d="M35,45 C35,35 65,35 65,45 C65,65 50,75 50,75 C50,75 35,65 35,45 Z" fill="none" stroke={colors.secondary} strokeWidth="3" />}
      {type === "forest" && <path d="M50,22 L75,68 L60,68 L70,82 L30,82 L40,68 L25,68 Z" fill={colors.secondary} />}
      {type === "global" && <circle cx="50" cy="50" r="22" fill="none" stroke={colors.secondary} strokeWidth="2" />}
      {type === "steel" && <path d="M32,35 L50,22 L68,35 L62,70 L50,82 L38,70 Z" fill={colors.secondary} opacity="0.7" />}
      {type === "wave" && <path d="M25,45 Q37.5,35 50,45 T75,45 M25,58 Q37.5,48 50,58 T75,58" fill="none" stroke={colors.secondary} strokeWidth="3" strokeLinecap="round" />}
      {type === "mountain" && <path d="M25,75 L50,30 L75,75 Z M40,75 L50,50 L60,75 Z" fill={colors.secondary} opacity="0.8" />}

      {/* Quả bóng tâm điểm */}
      <circle cx="50" cy="50" r="8" fill="#ffffff" stroke="#000000" strokeWidth="1" />
      <circle cx="50" cy="50" r="4" fill="#000000" />

      {/* Tên viết tắt */}
      <text x="50" y="84" textAnchor="middle" fill={colors.text} fontSize="9" fontWeight="bold" fontFamily="sans-serif">
        {name ? name.split(" ")[0].substring(0, 3).toUpperCase() : "FC"}
      </text>
    </svg>
  );
}

export default function ChiTietDoi() {
  const { id } = useParams();
  const navigate = useNavigate();

  const teamsData = {
    "1": { 
      name: "Trường Chinh", 
      logoType: "academy", 
      matches: 12, goals: 28, conceded: 10, 
      players: ["Nguyễn Văn Anh", "Trần Minh Bảo", "Lê Hoàng Cường", "Phạm Thành Long", "Nguyễn Tiến Đạt", "Vũ Hoàng Nam", "Đặng Phan Đăng", "Bùi Huy Toàn", "Nguyễn Tuấn Tài"],
      history: [
        { year: "2025", prize: "Vô địch giải bóng đá vô địch Tỉnh Kon Tum", type: "gold" },
        { year: "2024", prize: "Á quân Đại hội Thể thao Đông Dương", type: "silver" }
      ]
    },
    "2": { 
      name: "Duy Tân", 
      logoType: "modern", 
      matches: 12, goals: 25, conceded: 12, 
      players: ["Phạm Hải Dương", "Hoàng Anh Duy", "Võ Tiến Danh", "Nguyễn Đình Trọng", "Bùi Duy Mạnh", "Lê Văn Xuân", "Phan Tuấn Tài", "Nguyễn Văn Toản", "Nguyễn Hai Long", "Cao Văn Triền"],
      history: [
        { year: "2025", prize: "Á quân giải vô địch Tỉnh Kon Tum", type: "silver" },
        { year: "2024", prize: "Vô địch Cup Các CLB Mạnh Tây Nguyên", type: "gold" }
      ]
    },
    "3": { 
      name: "Ngô Mây", 
      logoType: "warrior", 
      matches: 12, goals: 18, conceded: 15, 
      players: ["Bùi Xuân Hiếu", "Đỗ Hoài Nam", "Lý Gia Kiệt", "Trần Đình Khương", "Nguyễn Văn Toàn", "Phạm Đức Huy", "Lê Tiến Anh", "Nguyễn Trọng Đại"],
      history: [
        { year: "2024", prize: "Hạng Ba giải bóng đá vô địch Tỉnh Kon Tum", type: "bronze" }
      ]
    },
    "4": { 
      name: "Quang Trung", 
      logoType: "royal", 
      matches: 12, goals: 16, conceded: 18, 
      players: ["Nguyễn Triệu Vỹ", "Phan Văn Phong", "Vũ Hoàng Gia", "Đặng Văn Lâm", "Quế Ngọc Hải", "Đỗ Hùng Dũng", "Phạm Xuân Mạnh", "Trần Nguyên Mạnh"],
      history: [
        { year: "2023", prize: "Vô địch giải bóng đá phong trào Thành phố Kon Tum", type: "gold" }
      ]
    },
    "5": { 
      name: "Lê Lợi", 
      logoType: "shield", 
      matches: 12, goals: 10, conceded: 22, 
      players: ["Trần Thanh Tâm", "Lê Hữu Đức", "Đặng Văn Lộc", "Nguyễn Công Phượng", "Nguyễn Tuấn Anh", "Nguyễn Phong Hồng Duy", "Lê Văn Sơn", "A Hoàng", "Vũ Văn Thanh"],
      history: [
        { year: "2022", prize: "Giải phong cách toàn tỉnh", type: "bronze" }
      ]
    },
    "6": { 
      name: "Nguyễn Trãi", 
      logoType: "star", 
      matches: 12, goals: 22, conceded: 14, 
      players: ["Võ Hoàng Yến", "Phạm Minh Thái", "Nguyễn Hoàng Đức", "Phan Văn Đức", "Hồ Tấn Tài", "Nguyễn Thanh Bình", "Bùi Tiến Dũng", "Nguyễn Đức Chiến", "Khuất Văn Khang"],
      history: [
        { year: "2025", prize: "Hạng Ba Cúp các CLB vùng Cao Nguyên", type: "bronze" }
      ]
    },
    "7": { 
      name: "Đăk Hà FC", 
      logoType: "coffee", 
      matches: 12, goals: 24, conceded: 11, 
      players: ["A Káp", "A Sân", "Nguyễn Tiến Linh", "A Hoàng", "Nguyễn Quang Hải", "Trần Đình Trọng", "Nguyễn Phong Hồng Duy", "Sầm Ngọc Đức"],
      history: [
        { year: "2025", prize: "Vô địch Siêu cúp Cà phê Đăk Hà", type: "gold" },
        { year: "2024", prize: "Hạng Ba giải vô địch Tỉnh Kon Tum", type: "bronze" }
      ]
    },
    "8": { 
      name: "Sa Thầy FC", 
      logoType: "forest", 
      matches: 12, goals: 8, conceded: 25, 
      players: ["A Nhút", "A Lăng", "Trần Minh Vương", "Lương Xuân Trường", "Nguyễn Văn Toản", "Phạm Xuân Mạnh", "A Mít", "A Hờ", "A Phong", "Nguyễn Vũ Linh"],
      history: [
        { year: "2023", prize: "Vô địch Giải bóng đá phong trào huyện Sa Thầy", type: "gold" }
      ]
    },
    "9": { 
      name: "Ngọc Hồi FC", 
      logoType: "global", 
      matches: 12, goals: 15, conceded: 17, 
      players: ["A Thứ", "A Quy", "Nguyễn Việt Anh", "Nguyễn Thành Chung", "Phạm Tuấn Hải", "Trần Nguyên Mạnh", "Lê Xuân Tú", "Đậu Văn Toàn", "Nguyễn Văn Vĩ"],
      history: [
        { year: "2024", prize: "Á quân Cúp Hữu Nghị Ngã ba Biên Giới", type: "silver" }
      ]
    },
    "10": { 
      name: "Đăk Tô FC", 
      logoType: "steel", 
      matches: 12, goals: 21, conceded: 13, 
      players: ["A Đội", "A Thiết", "Nguyễn Văn Quyết", "Đỗ Duy Mạnh", "Bùi Hoàng Việt Anh", "Đặng Văn Lâm", "Phạm Tuấn Hải", "Nguyễn Thành Chung"],
      history: [
        { year: "2025", prize: "Vô địch giải bóng đá Truyền thống huyện Đăk Tô", type: "gold" }
      ]
    },
    "11": { 
      name: "Kon Rẫy FC", 
      logoType: "wave", 
      matches: 12, goals: 5, conceded: 30, 
      players: ["A Nghĩa", "A Trọng", "Nguyễn Hải Huy", "Mạc Hồng Quân", "Nghiêm Xuân Tú", "Dương Thanh Hào", "Nguyễn Tiến Duy", "Trần Bửu Ngọc", "Nguyễn Xuân Hùng"],
      history: [
        { year: "2022", prize: "Giải Đội bóng phong trào tiến bộ nhất năm", type: "bronze" }
      ]
    },
    "12": { 
      name: "Đăk Glei FC", 
      logoType: "mountain", 
      matches: 12, goals: 17, conceded: 16, 
      players: ["A Chinh", "A Vương", "Hà Đức Chinh", "Nguyễn Trung Đại Dương", "Sầm Ngọc Đức", "Nguyễn Xuân Nam", "Lê Văn Đại", "Nguyễn Hoàng Quốc Chí", "Trần Phi Sơn", "Phan Thanh Hậu"],
      history: [
        { year: "2024", prize: "Vô địch Cúp sâm Ngọc Linh vùng cao", type: "gold" }
      ]
    }
  };

  const team = teamsData[String(id)];

  if (!team) {
    return (
      <div className="no-data-container">
        <h2>❌ Không tìm thấy thông tin đội bóng này!</h2>
        <button onClick={() => navigate(-1)} className="no-data-btn">
          ➔ Quay lại Trang Trước
        </button>
      </div>
    );
  }

  return (
    <div className="teams-page-container">
      
      {/* Nút quay lại */}
      <button onClick={() => navigate(-1)} className="kt-btn-back">
        ← Quay Lại
      </button>

      {/* HEADER CHI TIẾT ĐỘI */}
      <div className="teams-header-section">
        <div className="teams-header-logo-wrap">
          <TeamLogo type={team.logoType} name={team.name} size="85px" />
        </div>
        <div className="teams-header-info">
          <h2>CLB {team.name}</h2>
          <p>Thông tin hồ sơ, đội hình chính thức và lịch sử thành tích giải đấu ({team.players.length} cầu thủ)</p>
        </div>
      </div>

      {/* NỘI DUNG CHI TIẾT CHIA KHỐI */}
      <div className="teams-grid-layout">
        
        {/* Khối 1: Thông số chiến thuật */}
        <div className="modern-team-card">
          <h3>📊 Thông Số Mùa Giải</h3>
          <div className="stats-boxes-container">
            <div className="stat-box matches">
              <span>Số trận</span>
              <h4>{team.matches}</h4>
            </div>
            <div className="stat-box goals">
              <span>Bàn thắng</span>
              <h4>{team.goals}</h4>
            </div>
            <div className="stat-box conceded">
              <span>Bàn thua</span>
              <h4>{team.conceded}</h4>
            </div>
          </div>
        </div>

        {/* Khối 2: Phòng truyền thống */}
        <div className="modern-team-card">
          <h3>🏆 Phòng Truyền Thống</h3>
          <ul className="history-list">
            {team.history && team.history.map((h, index) => (
              <li key={index} className="history-item">
                <span className={`badge-year ${h.type}`}>{h.year}</span>
                <span className="prize-title">{h.prize}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Khối 3: Đội hình đăng ký thi đấu */}
      <div className="players-section-card">
        <h3>👥 Danh Sách Đội Hình Đăng Ký</h3>
        <div className="players-list-grid">
          {team.players && team.players.map((player, i) => (
            <div key={i} className="player-item-card">
              <span className="player-number">{i + 1}</span>
              <span className="player-name">{player}</span>
              <span className="player-role-tag">VĐV</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}