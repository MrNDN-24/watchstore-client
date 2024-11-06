import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`);
  return response.data;
};

export const fetchUserData = async () => {
  const token = localStorage.getItem("token");
  console.log("Day la token", token);
  if (!token) return null;

  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Giả sử API trả về thông tin user
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    return null;
  }
};

export const updateUser = async (userData) => {
  const response = await axios.put(`${API_URL}/profile`, userData);
  console.log("Du lieu phan hoi", response.data);
  return response.data;
};
