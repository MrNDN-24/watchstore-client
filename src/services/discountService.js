import axios from "axios";


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_CLIENT;
const API_URL = `${API_BASE_URL}/discount`;

export const validateDiscountForUser = async (discountCode) => {
  const token = localStorage.getItem("token");
  // console.log("Day la token", token);
  if (!token) return null;

  try {
    const response = await axios.get(`${API_URL}/${discountCode}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Check voucher", response);
    return response.data; // Giả sử API trả về thông tin user
  } catch (error) {
    console.error("Lỗi khi lấy mã giảm giá người dùng:", error);
    return null;
  }
};

export const getDiscounts = async () => {
  const response = await axios.get(`${API_URL}`);
  const data = response.data;
  console.log(data);
  // return Array.isArray(data.data) ? data.data : [];
  return data;
};
