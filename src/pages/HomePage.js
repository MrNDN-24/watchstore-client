import React, { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import ProductList from "../components/ProductList";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const slides = [banner1, banner2, banner3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex == 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex == slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div>
      <Navbar /> {/* Thêm Navbar */}
      <main>
        <div className="flex flex-col min-h-screen">
          <div className="relative w-full h-[600px] overflow-hidden">
            {slides.map((slide, index) => (
              <img
                src={slide}
                alt=""
                key={index}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute group-hover:block absolute top-[40%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <MdArrowBackIos onClick={prevSlide} size={30} />
            </div>
            <div className="absolute group-hover:block absolute top-[40%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <MdArrowForwardIos onClick={nextSlide} size={30} />
            </div>
          </div>
        </div>
        <ProductList />
      </main>
      <Footer /> {/* Thêm Footer */}
    </div>
  );
};

export default HomePage;
