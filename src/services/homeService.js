import axios from "axios";

const API_URL = "http://localhost:5000/homepage";

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}`);
  const data = response.data;
  console.log(data);
  return Array.isArray(data.data) ? data.data : [];
};
