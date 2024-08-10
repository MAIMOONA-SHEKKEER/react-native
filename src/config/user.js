import { api, endpoints } from './index';
import { handleApiError } from '../utils/apiUtils';

export const verifyToken = async (token) => {
  try {
    const response = await api.post(endpoints.verifyToken, { token });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await api.post(endpoints.verifyOtp, {
      combination: 'email-otp',
      email,
      otp,
    });
    console.log('verifyOtpRes', response.data); // Move this after the API call
    return response.data;
  } catch (error) {
    console.log('error', error);
    handleApiError(error);
  }
};

export const registerUser = async (userDetails) => {
  try {
    const response = await api.post(endpoints.registerUser, userDetails);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
