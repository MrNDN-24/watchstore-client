import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const loginUserWithGoogle = async (googleToken) => {
  if (!googleToken) {
    throw new Error("Google token is missing");
  }
  const response = await axios.post(`${API_URL}/google-login`, { token: googleToken });
  return response.data;
};
