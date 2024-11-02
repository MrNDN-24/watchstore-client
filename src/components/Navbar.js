import React from 'react';
import '../styles/Navbar.css';
import logo from '../assets/logowatchstore.jpg'; // Thay đổi đường dẫn nếu cần

const Navbar = () => {
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
        <div className="cart-icon">🛒</div>
        <div className="account-icon">👤</div>
      </div>
    </nav>
  );
};

export default Navbar;
