import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authHeader, baseUrl, verifyTokenHeader } from "../constants/token";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
  refreshSubscribers.map((callback) => callback(token));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.url.includes("/verifyToken")) {
      config.headers.Authorization = verifyTokenHeader;
    } else {
      config.headers.Authorization = authHeader;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await axiosInstance.post('/verifyToken');
          isRefreshing = false;
          onRefreshed(); 
        } catch (refreshError) {
          isRefreshing = false;
          localStorage.removeItem('authToken');
          return Promise.reject(refreshError);
        }
      }

      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(axiosInstance(originalRequest));
        });
      });

      return retryOriginalRequest;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
