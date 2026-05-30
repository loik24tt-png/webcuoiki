import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GiaiDau() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teamName: "",
    representative: "",
    phone: "",
    memberCount: "7", // Mặc định là 7 cầu thủ
  });

  // Lưu danh sách thành viên dưới dạng mảng các object [{ name: "", shirtNumber: "" }, ...]
  const [members, setMembers] = useState(
    Array.from({ length: 7 }, () => ({ name: "", shirtNumber: "" }))
  );

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Xử lý khi thay đổi số lượng cầu thủ (Tự động tăng/giảm số ô nhập thành viên)
  const handleMemberCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setFormData({ ...formData, memberCount: e.target.value });

    // Cập nhật lại mảng thành viên tương ứng với số lượng mới
    if (count >= 7 && count <= 10) {
      setMembers((prevMembers) => {
        if (count > prevMembers.length) {
          // Nếu tăng số lượng, giữ lại người cũ và thêm ô trống mới
          const extra = Array.from({ length: count - prevMembers.length }, () => ({
            name: "",
            shirtNumber: "",
          }));
          return [...prevMembers, ...extra];
        } else {
          // Nếu giảm số lượng, cắt bớt phần đuôi
          return prevMembers.slice(0, count);
        }
      });
    }
  };

  // Xử lý thay đổi thông tin từng thành viên
  const handleMemberInputChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dữ liệu cuối cùng bao gồm cả thông tin đội và danh sách thành viên
    const finalData = {
      ...formData,
      memberList: members,
    };

    console.log("Dữ liệu đăng ký hoàn chỉnh:", finalData);
    setIsSubmitted(true);
  };

  const handleViewRules = () => {
    navigate("/dieulelenggiaidau");
  };

  // Giao diện hiển thị sau khi gửi đơn thành công (Đơn chờ duyệt)
  if (isSubmitted) {
    return (
      <div className="max-w-2xl p-8 mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 text-center my-10">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-200">
          <span className="text-4xl text-amber-500 animate-pulse">⏳</span>
        </div>
        <h2 className="text-2xl font-black text-gray-800 uppercase mb-2">Đơn đang chờ duyệt</h2>
        <p className="text-gray-600 mb-6">
          Hệ thống đã ghi nhận thông tin đăng ký của đội <strong className="text-blue-600">{formData.teamName}</strong>. 
          Ban tổ chức sẽ kiểm tra danh sách cầu thủ và liên hệ lại qua số điện thoại <strong className="text-gray-800">{formData.phone}</strong> trong thời gian sớm nhất.
        </p>

        <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 text-left text-sm text-gray-600 space-y-3 mb-6">
          <div>• <strong>Đội trưởng (Đại diện):</strong> {formData.representative}</div>
          <div>• <strong>Tổng số cầu thủ đăng ký:</strong> {formData.memberCount} thành viên</div>
          <div className="pt-2 border-t border-gray-200">
            <strong>Danh sách cầu thủ dự kiến:</strong>
            <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto pr-2">
              {members.map((m, idx) => (
                <div key={idx} className="bg-white p-2 rounded border border-gray-100 text-xs">
                  {idx + 1}. {m.name || "Chưa nhập tên"} (Số áo: {m.shirtNumber || "Chưa chọn"})
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsSubmitted(false)}
          className="text-sm font-bold text-blue-600 hover:underline"
        >
          Trở lại chỉnh sửa thông tin đơn
        </button>
      </div>
    );
  }

  // Giao diện Form đăng ký ban đầu
  return (
    <div className="max-w-3xl p-8 mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 my-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-gray-800 uppercase">Đăng ký tham gia giải đấu</h2>
        <p className="text-gray-500 mt-2">Điền chính xác thông tin đội bóng và danh sách cầu thủ để Ban tổ chức xét duyệt</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Tên Đội bóng */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Tên đội bóng <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" required placeholder="VD: Kon Tum FC"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.teamName}
            onChange={(e) => setFormData({...formData, teamName: e.target.value})}
          />
        </div>

        {/* Thông tin Người đại diện & Số điện thoại */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Đại diện (Đội trưởng) <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" required placeholder="Họ và tên"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.representative}
              onChange={(e) => setFormData({...formData, representative: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Số điện thoại liên hệ <span className="text-red-500">*</span>
            </label>
            <input 
              type="tel" required placeholder="09xxxxxxxx"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>

        {/* Số lượng cầu thủ */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Số lượng cầu thủ đăng ký (7 - 10 người) <span className="text-red-500">*</span>
          </label>
          <input 
            type="number" min="7" max="10" required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.memberCount}
            onChange={handleMemberCountChange}
          />
        </div>

        {/* ================= DANH SÁCH THÀNH VIÊN ĐỘNG ================= */}
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            🏃‍♂️ Danh sách cầu thủ đăng ký chi tiết
          </h3>
          
          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
            {members.map((member, index) => (
              <div key={index} className="flex gap-4 items-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <span className="w-6 text-sm font-bold text-gray-400 text-center">#{index + 1}</span>
                
                <div className="flex-1">
                  <input 
                    type="text" required placeholder="Họ và tên cầu thủ"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={member.name}
                    onChange={(e) => handleMemberInputChange(index, "name", e.target.value)}
                  />
                </div>

                <div className="w-24">
                  <input 
                    type="number" min="1" max="99" required placeholder="Số áo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-center"
                    value={member.shirtNumber}
                    onChange={(e) => handleMemberInputChange(index, "shirtNumber", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ============================================================= */}

        {/* Nút gửi đơn */}
        <button 
          type="submit"
          className="w-full text-white font-bold py-4 rounded-xl transition-all shadow-lg bg-blue-600 hover:bg-blue-700"
        >
          Nộp đơn đăng ký giải đấu
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-400 mb-4">Vui lòng đọc kỹ điều lệ trước khi đăng ký để tránh đơn bị từ chối</p>
        <button 
          onClick={handleViewRules}
          className="text-blue-600 font-bold hover:underline"
        >
          Xem Điều Lệ Giải đấu 📜
        </button>
      </div>
    </div>
  );
}