import React from "react";
import "../styles/Navbar.css";
import logo from "../assets/logowatchstore.jpg"; // Thay đổi đường dẫn nếu cần
import profile_icon from "../assets/profile_icon.png";
import cart_icon from "../assets/cart_icon.png";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/products">Sản Phẩm</a>
        <a href="/about">About</a>
        <a href="/signup">Sign Up</a>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Tìm kiếm..." />
      </div>
      <div className="icons">
        <div className="flex items-center gap-6">
          <img src={cart_icon} className="w-5 cursor-pointer" alt="" />

          <div className="group relative">
            <img
              className="w-5 cursor-pointer"
              src={profile_icon}
              alt="Profile Icon"
            />
            <div className="absolute hidden group-hover:block right-0 pt-4 dropdown-menu bg-white shadow-lg rounded">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-state-100 text-gray-500 rounded">
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={() => navigate("/api/profile")}
                >
                  {" "}
                  Tài khoản
                </p>
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={handleLogout}
                >
                  {" "}
                  Log out
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
