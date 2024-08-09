import axiosInstance from '../config/axiosConfig';

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
