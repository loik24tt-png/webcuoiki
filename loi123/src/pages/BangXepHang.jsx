import { useState, useEffect } from "react";

// Thay đổi URL về cổng 3001 và gọi endpoint chung /matches
const API_URL = "http://localhost:3001";

export default function BangXepHang() {
  const [matches, setMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // State quản lý Tab đang xem: 'bxh' | 'pha-luoi' | 'kien-tao' | 'the-phat'
  const [activeTab, setActiveTab] = useState("bxh");

  // Hàm fetch dữ liệu
  const fetchMatches = async () => {
    try {
      setRefreshing(true);
      const [matchesRes, standingsRes] = await Promise.all([
        fetch(`${API_URL}/matches`),
        fetch(`${API_URL}/standings`)
      ]);
      
      if (!matchesRes.ok) throw new Error("Không thể tải dữ liệu trận đấu từ server.");
      if (!standingsRes.ok) throw new Error("Không thể tải bảng xếp hạng từ server.");
      
      const matchesData = await matchesRes.json();
      const standingsData = await standingsRes.json();
      
      setMatches(Array.isArray(matchesData) ? matchesData : []);
      setStandings(Array.isArray(standingsData) ? standingsData : []);
    } catch (err) {
      console.error("Lỗi kết nối API trận đấu:", err);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  // Gọi API lấy danh sách trận đấu từ Database
  useEffect(() => {
    fetchMatches();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  // --- THUẬT TOÁN XỬ LÝ DỮ LIỆU FRONTEND GIỮ NGUYÊN TỪ BẢN GỐC ---
  const table = {};
  const scorersMap = {};
  const assistsMap = {};
  const cardsMap = {};

  matches.forEach((m) => {
    // 1. XỬ LÝ BÀN THẮNG VÀ SỰ KIỆN TRẬN ĐẤU
    if (m.scorers1 && Array.isArray(m.scorers1)) {
      m.scorers1.forEach(scorer => {
        scorersMap[scorer] = (scorersMap[scorer] || 0) + 1;
      });
    }
    if (m.scorers2 && Array.isArray(m.scorers2)) {
      m.scorers2.forEach(scorer => {
        scorersMap[scorer] = (scorersMap[scorer] || 0) + 1;
      });
    }

    // 2. XỬ LÝ KIẾN TẠO
    if (m.assists1 && Array.isArray(m.assists1)) {
      m.assists1.forEach(assist => {
        assistsMap[assist] = (assistsMap[assist] || 0) + 1;
      });
    }
    if (m.assists2 && Array.isArray(m.assists2)) {
      m.assists2.forEach(assist => {
        assistsMap[assist] = (assistsMap[assist] || 0) + 1;
      });
    }

    // 3. XỬ LÝ THẺ PHẠT
    if (m.cards1 && Array.isArray(m.cards1)) {
      m.cards1.forEach(card => {
        // Giả sử card là {player: ..., type: ...}
        if (!cardsMap[card.player]) cardsMap[card.player] = { name: card.player, team: m.doi1, yellow: 0, red: 0 };
        if (card.type === 'yellow') cardsMap[card.player].yellow += 1;
        if (card.type === 'red') cardsMap[card.player].red += 1;
      });
    }
    if (m.cards2 && Array.isArray(m.cards2)) {
      m.cards2.forEach(card => {
        if (!cardsMap[card.player]) cardsMap[card.player] = { name: card.player, team: m.doi2, yellow: 0, red: 0 };
        if (card.type === 'yellow') cardsMap[card.player].yellow += 1;
        if (card.type === 'red') cardsMap[card.player].red += 1;
      });
    }
  });

  // Sắp xếp thành tích
  const sortedStandings = [...standings].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const gdA = a.goals - a.conceded;
    const gdB = b.goals - b.conceded;
    if (gdB !== gdA) return gdB - gdA;
    return b.goals - a.goals;
  });

  const scorers = Object.entries(scorersMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  const assists = Object.entries(assistsMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  const cards = Object.values(cardsMap).sort((a, b) => b.red - a.red || b.yellow - a.yellow);

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px", fontWeight: "bold" }}>Đang tải dữ liệu giải đấu...</div>;
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "30px auto", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h2 style={{ textAlign: "center", color: "#1e3a8a", flex: 1, margin: 0 }}>THỐNG KÊ GIẢI ĐẤU CHI TIẾT</h2>
        <button 
          onClick={fetchMatches}
          disabled={refreshing}
          style={{ 
            padding: "10px 16px", 
            background: refreshing ? "#94a3b8" : "#3b82f6", 
            color: "#fff", 
            border: "none", 
            borderRadius: "6px", 
            cursor: refreshing ? "not-allowed" : "pointer",
            fontWeight: "bold",
            opacity: refreshing ? 0.6 : 1
          }}
        >
          {refreshing ? "⏳ Đang tải..." : "🔄 Cập nhập"}
        </button>
      </div>

      {/* THANH CHUYỂN TABS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={() => setActiveTab("bxh")} style={{ padding: "10px 20px", cursor: "pointer", border: "none", borderRadius: "6px", fontWeight: "bold", background: activeTab === "bxh" ? "#3b82f6" : "#e2e8f0", color: activeTab === "bxh" ? "#fff" : "#334155" }}>🏆 Bảng Xếp Hạng</button>
        <button onClick={() => setActiveTab("pha-luoi")} style={{ padding: "10px 20px", cursor: "pointer", border: "none", borderRadius: "6px", fontWeight: "bold", background: activeTab === "pha-luoi" ? "#3b82f6" : "#e2e8f0", color: activeTab === "pha-luoi" ? "#fff" : "#334155" }}>⚽ Vua Phá Lưới</button>
        <button onClick={() => setActiveTab("kien-tao")} style={{ padding: "10px 20px", cursor: "pointer", border: "none", borderRadius: "6px", fontWeight: "bold", background: activeTab === "kien-tao" ? "#3b82f6" : "#e2e8f0", color: activeTab === "kien-tao" ? "#fff" : "#334155" }}>👟 Kiến Tạo</button>
        <button onClick={() => setActiveTab("the-phat")} style={{ padding: "10px 20px", cursor: "pointer", border: "none", borderRadius: "6px", fontWeight: "bold", background: activeTab === "the-phat" ? "#3b82f6" : "#e2e8f0", color: activeTab === "the-phat" ? "#fff" : "#334155" }}>🟨 Thẻ Phạt</button>
      </div>

      {/* NỘI DUNG TAB 1: BẢNG XẾP HẠNG */}
      {activeTab === "bxh" && (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0", background: "#f8fafc" }}>
                <th style={{ padding: "12px", textAlign: "center" }}>STT</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Đội Bóng</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Trận</th>
                <th style={{ padding: "12px", textAlign: "center" }}>BT</th>
                <th style={{ padding: "12px", textAlign: "center" }}>BH</th>
                <th style={{ padding: "12px", textAlign: "center" }}>HS</th>
                <th style={{ padding: "12px", textAlign: "center", color: "#3b82f6" }}>Điểm</th>
                <th style={{ padding: "12px", textAlign: "center" }}>5 Trận gần nhất</th>
              </tr>
            </thead>
            <tbody>
              {sortedStandings.map((team, i) => (
                <tr key={team.name || team.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px", textAlign: "center", fontWeight: "bold" }}>{i + 1}</td>
                  <td style={{ padding: "12px", fontWeight: "bold" }}>{team.name}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{team.matches}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{team.goals}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{team.conceded}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>{team.goals - team.conceded}</td>
                  <td style={{ padding: "12px", textAlign: "center", fontWeight: "bold", color: "#3b82f6" }}>{team.points}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {team.form && team.form.length > 0 ? (
                      team.form.split('-').slice(-5).map((f, idx) => (
                        <span key={idx} style={{ padding: "2px 6px", margin: "0 2px", borderRadius: "4px", fontSize: "11px", color: "#fff", fontWeight: "bold", background: f === "W" ? "#22c55e" : f === "D" ? "#64748b" : "#ef4444" }}>{f}</span>
                      ))
                    ) : <span style={{ color: "#94a3b8" }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* NỘI DUNG TAB 2: VUA PHÁ LƯỚI */}
      {activeTab === "pha-luoi" && (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0", background: "#f8fafc" }}>
                <th style={{ padding: "12px", textAlign: "center", width: "60px" }}>STT</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Cầu thủ</th>
                <th style={{ padding: "12px", textAlign: "center", width: "150px" }}>⚽ Số bàn thắng</th>
              </tr>
            </thead>
            <tbody>
              {scorers.map((player, i) => (
                <tr key={player.name} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px", textAlign: "center" }}>{i + 1}</td>
                  <td style={{ padding: "12px", fontWeight: "500" }}>{player.name}</td>
                  <td style={{ padding: "12px", textAlign: "center", fontWeight: "bold", color: "#10b981" }}>{player.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* NỘI DUNG TAB 3: KIẾN TẠO */}
      {activeTab === "kien-tao" && (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0", background: "#f8fafc" }}>
                <th style={{ padding: "12px", textAlign: "center", width: "60px" }}>STT</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Cầu thủ</th>
                <th style={{ padding: "12px", textAlign: "center", width: "150px" }}>👟 Kiến tạo</th>
              </tr>
            </thead>
            <tbody>
              {assists.map((player, i) => (
                <tr key={player.name} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px", textAlign: "center" }}>{i + 1}</td>
                  <td style={{ padding: "12px", fontWeight: "500" }}>{player.name}</td>
                  <td style={{ padding: "12px", textAlign: "center", fontWeight: "bold", color: "#f59e0b" }}>{player.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* NỘI DUNG TAB 4: THẺ PHẠT */}
      {activeTab === "the-phat" && (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0", background: "#f8fafc" }}>
                <th style={{ padding: "12px", textAlign: "center", width: "60px" }}>STT</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Cầu thủ</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Đội bóng</th>
                <th style={{ padding: "12px", textAlign: "center", width: "120px" }}>🟨 Thẻ Vàng</th>
                <th style={{ padding: "12px", textAlign: "center", width: "120px" }}>🟥 Thẻ Đỏ</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((player, i) => (
                <tr key={player.name} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px", textAlign: "center" }}>{i + 1}</td>
                  <td style={{ padding: "12px", fontWeight: "500" }}>{player.name}</td>
                  <td style={{ padding: "12px", color: "#475569" }}>{player.team}</td>
                  <td style={{ padding: "12px", textAlign: "center", fontWeight: "bold", color: "#eab308" }}>{player.yellow}</td>
                  <td style={{ padding: "12px", textAlign: "center", fontWeight: "bold", color: "#dc2626" }}>{player.red}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}