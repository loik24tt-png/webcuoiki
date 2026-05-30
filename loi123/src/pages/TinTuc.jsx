// ========================= TinTuc.jsx =========================
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TinTuc() {
  const [news, setNews] = useState([]);
  const [time, setTime] = useState("");

  const load = () => {
    const now = new Date();
    setTime(now.toLocaleString());

    // ========================= DATA =========================
    setNews([
      {
        title: "🔥 Champions League",
        desc: "Real Madrid và Man City tạo nên trận cầu điên rồ.",
        image:
          "https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=1200&auto=format&fit=crop",
        link: "/tintuc-c1",
        tag: "HOT",
      },

      {
        title: "🌍 World Cup 2026",
        desc: "Các đội tuyển lớn bắt đầu công bố đội hình mạnh nhất.",
        image:
          "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200&auto=format&fit=crop",
        link: "/tintuc-world",
        tag: "NEW",
      },

      {
        title: "🏆 Giải Trường Phường Kon Tum",
    desc: "Những bất ngờ lớn xuất hiện ngay từ vòng bảng.",
    image: "https://toplist.vn/images/800px/san-bong-da-duy-tan-kon-tum-1346298.jpg",
    link: "/tintuc-truong",
    tag: "TRENDING",
      },

      {
        title: "⚽ Phường Kon Tum Mở Rộng",
    desc: "Trận đấu nảy lửa giữa các đội bóng phong trào cuối tuần qua.",
    // Ảnh chụp góc sân phủi, người xem đứng đông quanh sân
    image: "https://cdkontum.edu.vn/uploads/news/2025_10/khong-khi-buoi-hien-mau.png",
    link: "/tintuc-phuong",
    tag: "LIVE",
      },
    ]);
  };

  useEffect(() => {
    load();

    const i = setInterval(load, 5000);

    return () => clearInterval(i);
  }, []);

  return (
    <div className="news-card">
      <div className="news-header">
        <h2>🔥 Tin Tức Bóng Đá</h2>
        <span>{time}</span>
      </div>

      <div className="news-grid">
        {news.map((n, i) => (
          <Link key={i} to={n.link} className="news-item">
            <div className="image-box">
              <img src={n.image} alt={n.title} />

              <div className="overlay"></div>

              <span className="tag">{n.tag}</span>
            </div>

            <div className="content">
              <h3>{n.title}</h3>

              <p>{n.desc}</p>

              <button>Xem ngay →</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}