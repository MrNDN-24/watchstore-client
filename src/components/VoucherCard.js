import React from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatExpirationDate = (dateString) => {
  // Parse the date string
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Không xác định";
  }

  // Format the date in Vietnamese style
  return new Intl.DateTimeFormat("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const VoucherCard = ({ discount }) => {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(discount.code);
    toast.success("Đã sao chép mã giảm giá!");
  };

  useEffect(() => {
    console.log("Discount card", discount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white border-2 border-black text-black p-6 rounded-lg shadow-lg w-full max-w-sm">
      <div className="text-2xl font-bold mb-4">Mã giảm giá!</div>
      <div className="text-lg mb-4">
        Giảm{" "}
        <span className="font-bold underline">
          {discount.discountValue.toLocaleString("vi-VN")} VNĐ
        </span>{" "}
        cho đơn hàng!
      </div>
      <div className="text-base mb-4">Mã giảm giá:</div>
      <div className="bg-gray-100 border border-black rounded-lg px-4 py-2 flex items-center justify-between">
        <span className="text-xl font-semibold">{discount.code}</span>
        <button
          className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={handleCopyCode}
        >
          Sao chép
        </button>
      </div>
      <div className="text-sm mt-4">
        <p>
          Ngày bắt đầu:{" "}
          <span className="font-semibold">
            {formatExpirationDate(discount.startDate)}
          </span>
        </p>
        <p>
          Hạn sử dụng:{" "}
          <span className="font-semibold">
            {formatExpirationDate(discount.expirationDate)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default VoucherCard;
