import React, { useState, useEffect } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Auth.css";

const RegisterPage = () => {
  const [username, setUsername] = useState(""); // Thay đổi từ name thành username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState(""); // Lỗi cho tên đăng nhập
  const [errorEmail, setErrorEmail] = useState(""); // Lỗi cho email
  const [errorPassword, setErrorPassword] = useState(""); // Lỗi cho mật khẩu
  const navigate = useNavigate();

  const handleInputChange = (input) => {
    if (input === "username") {
      setErrorUsername(""); // Xóa lỗi tên khi nhập
    } else if (input === "email") {
      setErrorEmail(""); // Xóa lỗi email khi nhập
    } else if (input === "password") {
      setErrorPassword(""); // Xóa lỗi mật khẩu khi nhập
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    // Kiểm tra độ dài tên đăng nhập
    if (username.length < 3) {
      setErrorUsername("Tên đăng nhập phải có ít nhất 3 ký tự");
      hasError = true;
    }

    // Kiểm tra định dạng email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorEmail("Email không hợp lệ");
      hasError = true;
    }

    // Kiểm tra mật khẩu
    if (password.length < 6) {
      setErrorPassword("Mật khẩu phải có ít nhất 6 ký tự");
      hasError = true;
    }

    // Nếu có lỗi, dừng lại không gửi yêu cầu
    if (hasError) return;

    try {
      await registerUser({ username, email, password }); // Gửi username thay vì name
      toast.success("Người dùng đã đăng ký thành công");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const apiErrors = err.response?.data?.errors || {};
      if (typeof apiErrors === "string") {
        toast.error(apiErrors); // Hiển thị thông báo lỗi chung nếu có
      }
    }
  };

  useEffect(() => {
    toast.info("Chào mừng bạn đến với trang đăng ký!");
  }, []);

  return (
    <div className="auth-container">
      <ToastContainer />
      <div className="image-section"></div>
      <div className="form-section">
        <h2>Đăng Ký</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tên đăng nhập" // Cập nhật placeholder
            value={username} // Cập nhật giá trị
            onChange={(e) => {
              setUsername(e.target.value);
              handleInputChange("username"); // Reset lỗi khi nhập
            }}
            onFocus={() => handleInputChange("username")} // Xóa lỗi khi người dùng click vào trường tên đăng nhập
          />
          {errorUsername && <p className="error">{errorUsername}</p>}{" "}
          {/* Hiển thị lỗi cho tên đăng nhập */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleInputChange("email"); // Reset lỗi khi nhập
            }}
            onFocus={() => handleInputChange("email")} // Xóa lỗi khi người dùng click vào trường email
          />
          {errorEmail && <p className="error">{errorEmail}</p>}{" "}
          {/* Hiển thị lỗi cho email */}
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleInputChange("password"); // Reset lỗi khi nhập
            }}
            onFocus={() => handleInputChange("password")} // Xóa lỗi khi người dùng click vào trường mật khẩu
          />
          {errorPassword && <p className="error">{errorPassword}</p>}{" "}
          {/* Hiển thị lỗi cho mật khẩu */}
          <button type="submit">Đăng Ký</button>
        </form>
        <p>
          Đã có tài khoản?
          <span className="account-link" onClick={() => navigate("/login")}>
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
