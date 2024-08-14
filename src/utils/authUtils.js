import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../config/axiosConfig";
import { sendOtp } from "../config/auth";
import { endpoints } from "../config";
import { fieldMapping } from "../constants/fieldMapping";
import { messagesMapping } from "../constants/messageMapping";

export const generateSnackbarMessage = (response) => {
  if (!response || !response.payload) {
    return "An unknown error occurred";
  }
  if (response.message === "REQUEST_BODY_VALIDATION_ERROR") {
    const fieldsWithErrors = Object.keys(response.payload).map(
      (field) =>
        fieldMapping[field] ||
        field.replace(/Field --> /, "").replace(/([A-Z])/g, " $1")
    );
    const uniqueFields = [...new Set(fieldsWithErrors)];
    return `Please check ${uniqueFields.join(", ")}`;
  }

  const payload = response.payload || "";

  for (const [key, value] of Object.entries(messagesMapping)) {
    if (payload.includes(key)) return value;
  }

  return "An error occurred. Please try again.";
};

export const handleSendOtp = async (
  email,
  setSnackbar,
  setOtpSent,
  otpType = "email-otp"
) => {
  try {
    const response = await sendOtp(email, otpType);
    if (response.successful) {
      setSnackbar({
        visible: true,
        message: "OTP sent to your email!",
        severity: "success",
      });
      setOtpSent(true);
    } else {
      const errorMessage = generateSnackbarMessage(response);
      setSnackbar({
        visible: true,
        message: response.payload||errorMessage || "Failed to send OTP.",
        severity: "error",
      });
    }
  } catch (error) {
    setSnackbar({
      visible: true,
      message: "Failed to send OTP.",
      severity: "error",
    });
  }
};

export const validateOtp = (otp, setOtpError) => {
  if (!otp || otp.length < 6) {
    setOtpError("OTP must be 6 digits long.");
    return false;
  }
  setOtpError("");
  return true;
};

export const checkAuth = async (setSnackbar, navigation) => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    if (!token) {
      navigation.navigate("Feedback", {
        type: "error",
        message: "No authentication token found. Please log in again.",
      });
      return { auth: false };
    }

    const response = await axiosInstance.post(
      endpoints.verifyToken,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.data.successful) {
      if (response.data.payload.successful) {
        return { auth: true };
      } else {
        navigation.navigate("Feedback", {
          type: "error",
          message: `Authentication failed: ${
            response.data.payload.payload?.notValidReason || "Unknown reason"
          }`,
        });
        return { auth: false };
      }
    } else {
      navigation.navigate("Feedback", {
        type: "error",
        message: "Authentication failed. Please try again.",
      });
      return { auth: false };
    }
  } catch (error) {
    navigation.navigate("Feedback", {
      type: "error",
      message: "Error verifying token. Please try again.",
    });
    return { auth: false };
  }
};
