import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LichThiDauChuyenNghiep() {
  const navigate = useNavigate();
  // 1. Giả lập Data Giải đấu từ Database
  const [tournaments] = useState([
    { id: "t1", name: "Giải Bóng Đá Vô Địch Kon Tum 2026", logo: "🏆" },
    { id: "t2", name: "Cúp Ngoại Hạng Sinh Viên IT - UDLC", logo: "💻" }
  ]);

  // 2. Nạp sẵn Mock Data quy mô lớn trên 12 đội bóng (Trường Chinh, Duy Tân, Lê Lợi, Đăk Hà, Sa Thầy, Ngọc Hồi...)
  const [matches, setMatches] = useState([
    // ================== VÒNG 1 ==================
    {
      id: "m1",
      tournamentId: "t1",
      round: "Vòng 1",
      homeTeam: "Trường Chinh FC",
      homeLogo: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=80&q=80",
      awayTeam: "Duy Tân FC",
      awayLogo: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=80&q=80",
      homeScore: 2,
      awayScore: 1,
      datetime: "2026-06-25T15:30:00",
      status: "FINISHED"
    },
    {
      id: "m2",
      tournamentId: "t1",
      round: "Vòng 1",
      homeTeam: "Ngô Mây FC",
      homeLogo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&q=80",
      awayTeam: "Quang Trung FC",
      awayLogo: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=80&q=80",
      homeScore: 1,
      awayScore: 0,
      datetime: "2026-06-25T17:00:00",
      status: "FINISHED"
    },
    {
      id: "m3",
      tournamentId: "t1",
      round: "Vòng 1",
      homeTeam: "Lê Lợi FC",
      homeLogo: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=80&q=80",
      awayTeam: "Nguyễn Trãi FC",
      awayLogo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&q=80",
      homeScore: 2,
      awayScore: 2,
      datetime: "2026-06-25T19:00:00",
      status: "FINISHED"
    },
    {
      id: "m4",
      tournamentId: "t1",
      round: "Vòng 1",
      homeTeam: "Đăk Hà FC",
      homeLogo: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=80&q=80",
      awayTeam: "Sa Thầy FC",
      awayLogo: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=80&q=80",
      homeScore: 3,
      awayScore: 1,
      datetime: "2026-06-25T20:30:00",
      status: "LIVE" // Đang diễn ra trực tiếp trên sân
    },

    // ================== VÒNG 2 ==================
    {
      id: "m5",
      tournamentId: "t1",
      round: "Vòng 2",
      homeTeam: "Ngọc Hồi FC",
      homeLogo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&q=80",
      awayTeam: "Đăk Tô FC",
      awayLogo: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=80&q=80",
      homeScore: null,
      awayScore: null,
      datetime: "2026-06-26T15:30:00",
      status: "SCHEDULED"
    },
    {
      id: "m6",
      tournamentId: "t1",
      round: "Vòng 2",
      homeTeam: "Kon Rẫy FC",
      homeLogo: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=80&q=80",
      awayTeam: "Tu Mơ Rông FC",
      awayLogo: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=80&q=80",
      homeScore: null,
      awayScore: null,
      datetime: "2026-06-26T17:00:00",
      status: "SCHEDULED"
    },
    {
      id: "m7",
      tournamentId: "t1",
      round: "Vòng 2",
      homeTeam: "Trường Chinh FC",
      homeLogo: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=80&q=80",
      awayTeam: "Ngô Mây FC",
      awayLogo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&q=80",
      homeScore: null,
      awayScore: null,
      datetime: "2026-06-28T15:30:00",
      status: "SCHEDULED"
    },
    {
      id: "m8",
      tournamentId: "t1",
      round: "Vòng 2",
      homeTeam: "Duy Tân FC",
      homeLogo: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=80&q=80",
      awayTeam: "Quang Trung FC",
      awayLogo: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=80&q=80",
      homeScore: null,
      awayScore: null,
      datetime: "2026-06-28T17:00:00",
      status: "SCHEDULED"
    },

    // ================== VÒNG PLAYOFFS / HẬU CẦN ==================
    {
      id: "m9",
      tournamentId: "t1",
      round: "Tứ kết",
      homeTeam: "Nhất Bảng A",
      homeLogo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&q=80",
      awayTeam: "Hạng 3 có thành tích tốt 1",
      awayLogo: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=80&q=80",
      homeScore: null,
      awayScore: null,
      datetime: "2026-07-02T15:30:00",
      status: "SCHEDULED"
    },
    {
      id: "m10",
      tournamentId: "t1",
      round: "Chung kết",
      homeTeam: "Thắng Bán Kết 1",
      homeLogo: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=80&q=80",
      awayTeam: "Thắng Bán Kết 2",
      awayLogo: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=80&q=80",
      homeScore: null,
      awayScore: null,
      datetime: "2026-07-10T17:00:00",
      status: "SCHEDULED"
    }
  ]);

  // Bộ lọc State trên UI
  const [selectedTournament, setSelectedTournament] = useState("all");
  const [activeTab, setActiveTab] = useState("all"); // all, SCHEDULED, LIVE, FINISHED

  // State xử lý Form Thêm mới / Cập nhật
  const [formTournament, setFormTournament] = useState("t1");
  const [formRound, setFormRound] = useState("Vòng 1");
  const [formHome, setFormHome] = useState("");
  const [formAway, setFormAway] = useState("");
  const [formDatetime, setFormDatetime] = useState("");
  const [formStatus, setFormStatus] = useState("SCHEDULED");
  const [formHomeScore, setFormHomeScore] = useState("");
  const [formAwayScore, setFormAwayScore] = useState("");

  // Hàm xử lý submit thêm trận đấu động
  const handleSubmitMatch = (e) => {
    e.preventDefault();
    if (!formRound || !formHome || !formAway || !formDatetime) {
      return alert("Vui lòng điền đủ thông tin trận đấu!");
    }
    if (formHome.trim().toLowerCase() === formAway.trim().toLowerCase()) {
      return alert("Tên đội nhà và đội khách không được trùng nhau!");
    }

    const newMatch = {
      id: `m_${Date.now()}`,
      tournamentId: formTournament,
      round: formRound.trim(),
      homeTeam: formHome.trim(),
      homeLogo: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=80&q=80",
      awayTeam: formAway.trim(),
      awayLogo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=80&q=80",
      homeScore: formStatus !== "SCHEDULED" ? parseInt(formHomeScore) || 0 : null,
      awayScore: formStatus !== "SCHEDULED" ? parseInt(formAwayScore) || 0 : null,
      datetime: formDatetime,
      status: formStatus
    };

    setMatches([newMatch, ...matches]);
    
    // Reset Form nhập liệu
    setFormHome(""); 
    setFormAway(""); 
    setFormDatetime("");
    setFormHomeScore(""); 
    setFormAwayScore("");
  };

  // Logic lọc dữ liệu tối ưu
  const filteredMatches = matches.filter(match => {
    const matchTour = selectedTournament === "all" || match.tournamentId === selectedTournament;
    const matchTab = activeTab === "all" || match.status === activeTab;
    return matchTour && matchTab;
  });

  // Nhóm các trận đấu theo Vòng đấu (Round) để phân cụm chuyên nghiệp
  const groupedMatches = filteredMatches.reduce((groups, match) => {
    const round = match.round;
    if (!groups[round]) groups[round] = [];
    groups[round].push(match);
    return groups;
  }, {});

  // Hàm định dạng ngày giờ hiển thị gọn đẹp chuẩn SofaScore
  const formatDateTime = (isoString) => {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "Chưa định ngày";
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    return `${hours}:${minutes} - ${day}/${month}`;
  };

  return (
    <div className="pro-soccer-dashboard">
      
      {/* HEADER BANNER CAO CẤP */}
      <header className="dashboard-header">
        <div className="header-brand">
          <div className="live-dot-pulsing"></div>
          <h1>LEAGUE CENTRAL</h1>
          <p>Hệ thống điều hành giải đấu & Trực tiếp kết quả phong trào</p>
        </div>
        
        {/* THANH BỘ LỌC GIẢI ĐẤU ĐỘNG */}
        <div className="tournament-selector">
          <button 
            className={selectedTournament === "all" ? "active" : ""} 
            onClick={() => setSelectedTournament("all")}
          >
            Tất cả giải đấu
          </button>
          {tournaments.map(t => (
            <button 
              key={t.id} 
              className={selectedTournament === t.id ? "active" : ""} 
              onClick={() => setSelectedTournament(t.id)}
            >
              {t.logo} {t.name}
            </button>
          ))}
        </div>
      </header>

      <div className="dashboard-content">
        
        {/* CỘT HIỂN THỊ LỊCH THI ĐẤU / KẾT QUẢ */}
        <main className="matches-section">
          
          {/* TAB TRẠNG THÁI TRẬN ĐẤU */}
          <div className="status-tabs-row">
            <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>Tất cả</button>
            <button className={activeTab === "LIVE" ? "active live" : ""} onClick={() => setActiveTab("LIVE")}>Trực tiếp 🟢</button>
            <button className={activeTab === "SCHEDULED" ? "active" : ""} onClick={() => setActiveTab("SCHEDULED")}>Sắp đá</button>
            <button className={activeTab === "FINISHED" ? "active" : ""} onClick={() => setActiveTab("FINISHED")}>Lịch sử / Kết quả</button>
          </div>

          {/* HIỂN THỊ DANH SÁCH THEO TỪNG VÒNG ĐẤU GIẢI ĐẤU QUY MÔ LỚN */}
          {Object.keys(groupedMatches).length > 0 ? (
            Object.keys(groupedMatches).map(roundName => (
              <div key={roundName} className="round-group">
                <div className="round-header-title">{roundName}</div>
                
                <div className="round-matches-list">
                  {groupedMatches[roundName].map(match => (
                    <div key={match.id} className={`pro-match-card ${match.status.toLowerCase()}`}>
                      
                      <div className="match-info-meta">
                        <span className="tour-name-badge">
                          {tournaments.find(t => t.id === match.tournamentId)?.name}
                        </span>
                        <span className="match-time-string">{formatDateTime(match.datetime)}</span>
                      </div>

                      <div className="match-scoreboard-core">
                        {/* Đội nhà */}
                        <div className="team-block home">
                          <span className="team-title">{match.homeTeam}</span>
                          <img src={match.homeLogo} alt={match.homeTeam} />
                        </div>

                        {/* Điểm số trung tâm */}
                        <div className="score-display-hub">
                          {match.status === "SCHEDULED" ? (
                            <div className="vs-txt">VS</div>
                          ) : (
                            <div className={`score-numbers ${match.status === 'LIVE' ? 'live-color' : ''}`}>
                              <span>{match.homeScore}</span>
                              <span className="colon">:</span>
                              <span>{match.awayScore}</span>
                            </div>
                          )}
                          
                          <div className={`status-pill ${match.status.toLowerCase()}`}>
                            {match.status === "LIVE" && "ĐANG ĐÁ"}
                            {match.status === "FINISHED" && "KẾT THÚC"}
                            {match.status === "SCHEDULED" && "SẮP DIỄN RA"}
                          </div>
                        </div>

                        {/* Đội khách */}
                        <div className="team-block away">
                          <img src={match.awayLogo} alt={match.awayTeam} />
                          <span className="team-title">{match.awayTeam}</span>
                        </div>
                      </div>

                      {/* Nút cập nhật kết quả */}
                      <div style={{ marginTop: '0.8rem', textAlign: 'center' }}>
                        <button 
                          onClick={() => navigate(`/cap-nhat-ket-qua/${match.id}`)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#2196F3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 'bold'
                          }}
                        >
                          📝 Cập nhật kết quả
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state-card">Không có dữ liệu trận đấu nào khớp với bộ lọc dữ liệu hiện tại.</div>
          )}
        </main>

        {/* CỘT QUẢN TRỊ CONSOLE */}
        <aside className="admin-sidebar">
          <div className="sticky-admin-box">
            <h3>🤖 BACKEND CONSOLE</h3>
            <p className="subtitle">Thêm trận đấu mới cho hệ thống trên 12 đội bóng</p>
            
            <form onSubmit={handleSubmitMatch} className="pro-admin-form">
              <label>Thuộc giải đấu (tournament_id)</label>
              <select value={formTournament} onChange={e => setFormTournament(e.target.value)}>
                {tournaments.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>

              <label>Giai đoạn / Vòng đấu (round_name)</label>
              <select value={formRound} onChange={e => setFormRound(e.target.value)}>
                <option value="Vòng 1">Vòng 1</option>
                <option value="Vòng 2">Vòng 2</option>
                <option value="Vòng 3">Vòng 3</option>
                <option value="Tứ kết">Tứ kết</option>
                <option value="Bán kết">Bán kết</option>
                <option value="Chung kết">Chung kết</option>
              </select>

              <div className="form-split">
                <div>
                  <label>Đội chủ nhà</label>
                  <input placeholder="Ví dụ: Đăk Hà FC" value={formHome} onChange={e => setFormHome(e.target.value)} required />
                </div>
                <div>
                  <label>Đội khách</label>
                  <input placeholder="Ví dụ: Sa Thầy FC" value={formAway} onChange={e => setFormAway(e.target.value)} required />
                </div>
              </div>

              <label>Thời gian diễn ra (match_datetime)</label>
              <input type="datetime-local" value={formDatetime} onChange={e => setFormDatetime(e.target.value)} required />

              <label>Trạng thái trận đấu (status)</label>
              <select value={formStatus} onChange={e => setFormStatus(e.target.value)}>
                <option value="SCHEDULED">SCHEDULED (Chưa diễn ra)</option>
                <option value="LIVE">LIVE (Đang trực tiếp)</option>
                <option value="FINISHED">FINISHED (Đã kết thúc)</option>
              </select>

              {formStatus !== "SCHEDULED" && (
                <div className="form-split score-input-animation">
                  <div>
                    <label>Bàn chủ nhà</label>
                    <input type="number" min="0" value={formHomeScore} onChange={e => setFormHomeScore(e.target.value)} />
                  </div>
                  <div>
                    <label>Bàn khách</label>
                    <input type="number" min="0" value={formAwayScore} onChange={e => setFormAwayScore(e.target.value)} />
                  </div>
                </div>
              )}

              <button type="submit" className="pro-submit-btn">Đẩy dữ liệu lên Hệ thống</button>
            </form>
          </div>
        </aside>

      </div>
    </div>
  );
}