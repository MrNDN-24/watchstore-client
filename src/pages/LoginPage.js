import React, { useState, useEffect } from "react";
import { loginUser, loginUserWithGoogle } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Auth.css";

const LoginPage = () => {
  const [username, setUsername] = useState(""); // Đổi name thành username
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState(""); // Đổi errorName thành errorUsername
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (input) => {
    if (input === "username") {
      setErrorUsername(""); // Đổi name thành username
    } else if (input === "password") {
      setErrorPassword("");
    }
  };

  const handleFocus = (input) => {
    handleInputChange(input); // Reset lỗi khi focus vào trường nhập
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    // Kiểm tra dữ liệu nhập
    if (!username.trim()) {
      // Đổi name thành username
      setErrorUsername("Tên đăng nhập không được để trống.");
      hasError = true;
    }
    if (!password.trim()) {
      setErrorPassword("Mật khẩu không được để trống.");
      hasError = true;
    }

    // Nếu có lỗi, dừng lại không gửi yêu cầu
    if (hasError) return;

    try {
      const user = await loginUser({ username, password }); // Đổi name thành username
      toast.success("Đăng nhập thành công");
      localStorage.setItem("token", user.token);
      navigate("/homepage");
    } catch (err) {
      toast.error("Tài khoản hoặc mật khẩu không chính xác"); // Thông báo lỗi nếu đăng nhập thất bại
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const user = await loginUserWithGoogle(response.credential);
      toast.success("Đăng nhập thành công với Google");
      localStorage.setItem("token", user.token);
      navigate("/homepage");
    } catch (err) {
      toast.error("Đăng nhập Google thất bại");
    }
  };

  const handleGoogleLoginFailure = () => {
    toast.error("Đăng nhập Google thất bại");
  };

  useEffect(() => {
    toast.info("Chào mừng bạn đến với trang đăng nhập!");
  }, []);

  return (
    <div className="auth-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="image-section"></div>
      <div className="form-section">
        <h2>Đăng Nhập</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username} // Đổi name thành username
              onChange={(e) => {
                setUsername(e.target.value); // Đổi name thành username
                handleInputChange("username"); // Đổi name thành username
              }}
              onFocus={() => handleFocus("username")} // Đổi name thành username
            />
            {errorUsername && <p className="error">{errorUsername}</p>}{" "}
            {/* Hiển thị lỗi nếu có */}
          </div>
          <div>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange("password"); // Reset lỗi khi nhập
              }}
              onFocus={() => handleFocus("password")} // Reset lỗi khi focus vào trường
            />
            {errorPassword && <p className="error">{errorPassword}</p>}{" "}
            {/* Hiển thị lỗi nếu có */}
          </div>
          <button type="submit">Đăng Nhập</button>
        </form>

        <div className="google-login-container">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            useOneTap={false}
            render={(renderProps) => (
              <button
                className="google-login-button"
                onClick={renderProps.onClick}
              >
                <i className="fab fa-google"></i> Đăng nhập với Google
              </button>
            )}
          />
        </div>

        <p>
          Chưa có tài khoản?
          <span className="account-link" onClick={() => navigate("/register")}>
            Đăng ký
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
