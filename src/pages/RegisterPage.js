import React, { useState, useEffect } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import "../styles/Auth.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, setErrorName] = useState(""); // Lỗi cho tên
  const [errorEmail, setErrorEmail] = useState(""); // Lỗi cho email
  const [errorPassword, setErrorPassword] = useState(""); // Lỗi cho mật khẩu
  const navigate = useNavigate();

  const handleInputChange = (input) => {
    if (input === 'name') {
      setErrorName(""); // Xóa lỗi tên khi nhập
    } else if (input === 'email') {
      setErrorEmail(""); // Xóa lỗi email khi nhập
    } else if (input === 'password') {
      setErrorPassword(""); // Xóa lỗi mật khẩu khi nhập
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    // Kiểm tra độ dài tên
    if (name.length < 3) {
      setErrorName("Tên phải có ít nhất 3 ký tự");
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
      await registerUser({ name, email, password });
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
            placeholder="Tên"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleInputChange('name'); // Reset lỗi khi nhập
            }}
            onFocus={() => handleInputChange("name")} // Xóa lỗi khi người dùng click vào trường tên
          />
          {errorName && <p className="error">{errorName}</p>} {/* Hiển thị lỗi cho tên */}         

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleInputChange('email'); // Reset lỗi khi nhập
            }}
            onFocus={() => handleInputChange("email")} // Xóa lỗi khi người dùng click vào trường email
          />
          {errorEmail && <p className="error">{errorEmail}</p>} {/* Hiển thị lỗi cho email */}

          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleInputChange('password'); // Reset lỗi khi nhập
            }}
            onFocus={() => handleInputChange("password")} // Xóa lỗi khi người dùng click vào trường mật khẩu
          />
          {errorPassword && <p className="error">{errorPassword}</p>} {/* Hiển thị lỗi cho mật khẩu */}
          
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
