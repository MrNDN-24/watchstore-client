import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <div>
      <Navbar /> {/* Thêm Navbar */}
      <main>
        <h1>Welcome to the Watch Store!</h1>
        <button onClick={handleLogout}>Đăng Xuất</button>
      </main>
      <Footer /> {/* Thêm Footer */}
    </div>
  );
};

export default HomePage;
