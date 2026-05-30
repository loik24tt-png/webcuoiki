import React from "react";

export default function DieuLeGiaiDau({ onBack }) {
  return (
    <div className="kt-regulation-wrapper">
      
      {/* HEADER ĐIỀU LỆ */}
      <div className="kt-reg-header">
        <div>
          <h2 className="kt-reg-title">📜 ĐIỀU LỆ GIẢI BÓNG ĐÁ VÔ ĐỊCH KON TUM</h2>
          <p className="kt-reg-subtitle">Ban hành kèm theo Quyết định của Ban Tổ Chức giải đấu năm 2026</p>
        </div>
        
        {/* Nút quay lại */}
        {onBack && (
          <button onClick={onBack} className="kt-btn-back">
            ← Quay Lại Lịch Thi Đấu
          </button>
        )}
      </div>

      {/* LƯỚI CHIA KHÔNG GIAN (2 CỘT CHUẨN ĐẠI HỘI) */}
      <div className="kt-reg-grid">
        
        {/* CỘT TRÁI: CHI TIẾT NỘI DUNG ĐIỀU LỆ */}
        <div className="kt-reg-sections">
          
          {/* Điều 1 */}
          <div className="kt-reg-card">
            <h3 className="kt-card-title">01. Đối tượng & Hồ sơ tham gia</h3>
            <ul className="kt-card-list">
              <li>Vận động viên là công dân đang sinh sống, học tập tại tỉnh Kon Tum.</li>
              <li>Mỗi đội bóng đăng ký tối thiểu 14 cầu thủ và tối đa 25 cầu thủ.</li>
              <li>Hồ sơ bao gồm danh sách đăng ký chính thức, ảnh thẻ và CCCD đối chiếu.</li>
            </ul>
          </div>

          {/* Điều 2 */}
          <div className="kt-reg-card">
            <h3 className="kt-card-title">02. Thể thức thi đấu & Luật áp dụng</h3>
            <ul className="kt-card-list">
              <li>Áp dụng luật thi đấu bóng đá 7 người do Cục Thể dục thể thao ban hành.</li>
              <li>Vòng bảng chia làm các bảng đấu đá vòng tròn tính điểm. Thắng được 3 điểm, Hòa 1 điểm, Thua 0 điểm.</li>
              <li>Vòng loại trực tiếp nếu hòa sau 2 hiệp chính sẽ tiến hành đá luân lưu 9m phân định thắng bại.</li>
            </ul>
          </div>

          {/* Điều 3 */}
          <div className="kt-reg-card">
            <h3 className="kt-card-title">03. Quy định kỷ luật & Thẻ phạt</h3>
            <ul className="kt-card-list">
              <li>Cầu thủ tích lũy đủ 2 thẻ vàng sẽ bị đình chỉ thi đấu ở trận tiếp theo.</li>
              <li>Đội bóng đi muộn quá 15 phút so với lịch thi đấu quy định sẽ bị xử thua 0-3.</li>
            </ul>
          </div>

        </div>

        {/* CỘT PHẢI: BẢNG GIẢI THƯỞNG ĐẲNG CẤP ĐÃ ĐỒNG BỘ CSS */}
        <div className="kt-prize-sidebar">
          <h3 className="kt-prize-header">💰 Cơ cấu giải thưởng</h3>
          
          <div className="kt-prize-item">
            <div className="kt-prize-info">
              <span className="kt-prize-medal">🥇</span>
              <div>
                <p className="kt-prize-name">Đội Vô Địch</p>
                <p className="kt-prize-detail">Cúp + Huy chương vàng</p>
              </div>
            </div>
            <span className="kt-prize-value">15.000.000đ</span>
          </div>

          <div className="kt-prize-item">
            <div className="kt-prize-info">
              <span className="kt-prize-medal">🥈</span>
              <div>
                <p className="kt-prize-name">Đội Á Quân</p>
                <p className="kt-prize-detail">Huy chương bạc</p>
              </div>
            </div>
            <span className="kt-prize-value" style={{ color: "#cbd5e1" }}>10.000.000đ</span>
          </div>

          <div className="kt-prize-item">
            <div className="kt-prize-info">
              <span className="kt-prize-medal">🥉</span>
              <div>
                <p className="kt-prize-name">Đồng Hạng Ba</p>
                <p className="kt-prize-detail">Huy chương đồng</p>
              </div>
            </div>
            <span className="kt-prize-value" style={{ color: "#fb923c" }}>5.000.000đ</span>
          </div>

          {/* Giải phụ */}
          <div className="kt-sub-prizes">
            <p className="kt-sub-title">🏅 Giải thưởng cá nhân</p>
            <div className="kt-sub-row">
              <span>⚽ Vua phá lưới:</span>
              <span className="kt-sub-value">1.000.000đ</span>
            </div>
            <div className="kt-sub-row">
              <span>🧤 Thủ môn xuất sắc:</span>
              <span className="kt-sub-value">1.000.000đ</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}