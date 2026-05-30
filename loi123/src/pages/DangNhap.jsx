import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DangNhap({ setUser }) {
  const navigate = useNavigate();

  const API = "http://localhost:3001";

  // =========================
  // STATES
  // =========================
  const [isRegister, setIsRegister] = useState(false);

  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [confirmP, setConfirmP] = useState("");
  const [fullName, setFullName] = useState("");

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const [loading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);

  // =========================
  // CHECK LOGIN
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("football_token");

    const name = localStorage.getItem(
      "football_current_user"
    );

    if (token && name) {
      setCurrentUser(name);
      setUser(name);
    }
  }, [setUser]);

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async () => {
    setMsg("");

    if (!u || !p) {
      setMsgType("error");

      return setMsg(
        "⚠️ Vui lòng nhập tài khoản và mật khẩu"
      );
    }

    try {
      setLoading(true);

      const res = await fetch(
        API + "/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            username: u,
            password: p,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Đăng nhập thất bại"
        );
      }

      console.log(data);

      const name =
        data.user.full_name ||
        data.user.username;

      // =========================
      // SAVE LOCAL STORAGE
      // =========================
      localStorage.setItem(
        "football_token",
        data.token
      );

      localStorage.setItem(
        "football_current_user",
        name
      );

      localStorage.setItem(
        "football_role",
        data.user.role
      );

      setCurrentUser(name);

      setUser(name);

      setMsgType("success");

      setMsg("✅ Đăng nhập thành công");

      // =========================
      // ADMIN / USER
      // =========================
      setTimeout(() => {

        if (
          data.user.role === "admin"
        ) {
          navigate("/admin");
        } else {
          navigate("/home");
        }

      }, 1000);

    } catch (err) {
      console.error(err);

      setMsgType("error");

      setMsg(
        "❌ Sai tài khoản hoặc mật khẩu"
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // REGISTER
  // =========================
  const handleRegister = async () => {

    setMsg("");

    if (
      !fullName ||
      !u ||
      !p ||
      !confirmP
    ) {
      setMsgType("error");

      return setMsg(
        "⚠️ Vui lòng nhập đầy đủ thông tin"
      );
    }

    if (p.length < 6) {
      setMsgType("error");

      return setMsg(
        "⚠️ Mật khẩu tối thiểu 6 ký tự"
      );
    }

    if (p !== confirmP) {
      setMsgType("error");

      return setMsg(
        "❌ Mật khẩu xác nhận không khớp"
      );
    }

    try {
      setLoading(true);

      const res = await fetch(
        API + "/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            username: u,
            password: p,
            full_name: fullName,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Register failed"
        );
      }

      setMsgType("success");

      setMsg(
        "✅ Đăng ký thành công"
      );

      setIsRegister(false);

      setP("");
      setConfirmP("");
      setFullName("");

    } catch (err) {

      console.error(err);

      setMsgType("error");

      if (
        err.message.includes(
          "exists"
        )
      ) {
        setMsg(
          "❌ Tài khoản đã tồn tại"
        );
      } else {
        setMsg(
          "❌ Không thể đăng ký"
        );
      }

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {

    localStorage.removeItem(
      "football_token"
    );

    localStorage.removeItem(
      "football_current_user"
    );

    localStorage.removeItem(
      "football_role"
    );

    setCurrentUser(null);

    setUser(null);

    setMenuOpen(false);

    setMsgType("success");

    setMsg(
      "✅ Đăng xuất thành công"
    );

    setTimeout(() => {
      window.location.href =
        "/home";
    }, 1000);
  };

  // =========================
  // ENTER KEY
  // =========================
  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      if (isRegister) {
        handleRegister();
      } else {
        handleLogin();
      }

    }
  };

  return (
    <div className="login-page">

      <div className="login-box">

        <h2>
          FOOTBALL ADMIN
        </h2>

        <p className="subtitle">
          Hệ thống quản lý giải đấu
        </p>

        {/* ========================= */}
        {/* USER INFO */}
        {/* ========================= */}

        {currentUser && (
          <div className="logged-info">

            <div
              className="user-summary"
              onClick={() =>
                setMenuOpen(
                  !menuOpen
                )
              }
            >
              <span>
                {currentUser}
              </span>

              <span>
                {menuOpen
                  ? "▲"
                  : "▼"}
              </span>
            </div>

            {menuOpen && (
              <button
                className="logout-btn"
                onClick={
                  handleLogout
                }
              >
                Đăng xuất
              </button>
            )}
          </div>
        )}

        {/* ========================= */}
        {/* REGISTER */}
        {/* ========================= */}

        {isRegister ? (

          <div className="form-container">

            <div className="input-box">
              <label>
                Họ và tên
              </label>

              <input
                type="text"
                placeholder="Nhập họ tên"
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
              />
            </div>

            <div className="input-box">
              <label>
                Tài khoản
              </label>

              <input
                type="text"
                placeholder="Nhập tài khoản"
                value={u}
                onChange={(e) =>
                  setU(
                    e.target.value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
              />
            </div>

            <div className="input-box">
              <label>
                Mật khẩu
              </label>

              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={p}
                onChange={(e) =>
                  setP(
                    e.target.value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
              />
            </div>

            <div className="input-box">
              <label>
                Xác nhận mật khẩu
              </label>

              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmP}
                onChange={(e) =>
                  setConfirmP(
                    e.target.value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
              />
            </div>

            <button
              className="login-btn"
              onClick={
                handleRegister
              }
              disabled={loading}
            >
              {loading
                ? "Đang xử lý..."
                : "Đăng ký"}
            </button>

            <div className="divider"></div>

            <p className="toggle-form-text">
              Đã có tài khoản?{" "}

              <span
                className="link-text"
                onClick={() => {
                  setIsRegister(
                    false
                  );

                  setMsg("");
                }}
              >
                Đăng nhập
              </span>
            </p>

          </div>

        ) : (

          <div className="form-container">

            <div className="input-box">
              <label>
                Tài khoản
              </label>

              <input
                type="text"
                placeholder="Nhập tài khoản"
                value={u}
                onChange={(e) =>
                  setU(
                    e.target.value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
              />
            </div>

            <div className="input-box">
              <label>
                Mật khẩu
              </label>

              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={p}
                onChange={(e) =>
                  setP(
                    e.target.value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
              />
            </div>

            <button
              className="login-btn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading
                ? "Đang xử lý..."
                : "Đăng nhập"}
            </button>

            <div className="divider"></div>

            <button
              className="create-btn"
              onClick={() => {
                setIsRegister(
                  true
                );

                setMsg("");
              }}
            >
              Tạo tài khoản mới
            </button>

          </div>
        )}

        {/* ========================= */}
        {/* MESSAGE */}
        {/* ========================= */}

        {msg && (
          <p
            className={
              "login-msg " +
              (msgType ===
              "success"
                ? "msg-success"
                : "msg-error")
            }
          >
            {msg}
          </p>
        )}

      </div>
    </div>
  );
}

export default DangNhap;