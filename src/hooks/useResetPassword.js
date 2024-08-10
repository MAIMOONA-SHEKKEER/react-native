import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  handleSendOtp,
  generateSnackbarMessage,
  validateOtp,
} from "../utils/authUtils";
import { validateEmail } from "../utils/validators";
import { resetPassword } from "../config/auth";

export const useResetPassword = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    severity: "success",
  });
  const [showResendOtpButton, setShowResendOtpButton] = useState(false);
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOtpChange = (value) => {
    setCredentials((prev) => ({ ...prev, otp: value }));
    if (otpError) setOtpError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!credentials.email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(credentials.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (otpSent && !credentials.otp) {
      newErrors.otp = "OTP is required.";
    }
    if (otpSent && !credentials.newPassword) {
      newErrors.newPassword = "New password is required.";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    handleResetPassword();
  };

  const handleResetPassword = async () => {
    if (!validateOtp(credentials.otp, setOtpError)) {
      setSnackbar({
        visible: true,
        message: "Invalid OTP. Please try again.",
        severity: "error",
      });
      setShowResendOtpButton(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const resetResponse = await resetPassword({
        email: credentials.email,
        newPassword: credentials.newPassword,
        otp: credentials.otp,
      });

      if (resetResponse && resetResponse.successful) {
        if (resetResponse.payload.success) {
          setSnackbar({
            visible: true,
            message: "Password reset successfully.",
            severity: "success",
          });
          navigation.navigate("LoginScreen");
        } else {
          setSnackbar({
            visible: true,
            message: "Invalid OTP provided.",
            severity: "error",
          });
          setShowResendOtpButton(true);
        }
      } else {
        const errorMessage =
          generateSnackbarMessage(resetResponse) ||
          "Failed to reset password. Please try again.";
        setSnackbar({
          visible: true,
          message: errorMessage,
          severity: "error",
        });
        if (errorMessage.includes("invalid")) {
          setShowResendOtpButton(true);
        }
      }
    } catch (error) {
      setSnackbar({
        visible: true,
        message: error.message || "An error occurred. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onResendOtpClick = async () => {
    setLoading(true);
    await handleSendOtp(credentials.email, setSnackbar, setOtpSent);
    setLoading(false);
    setShowResendOtpButton(false);
  };

  const handleSnackbarClose = () =>
    setSnackbar((prev) => ({ ...prev, visible: false }));

  return {
    credentials,
    otpSent,
    errors,
    snackbar,
    handleChange,
    handleSubmit,
    handleSendOtp: () =>
      handleSendOtp(credentials.email, setSnackbar, setOtpSent),
    otpError,
    loading,
    handleOtpChange,
    showResendOtpButton,
    onResendOtpClick,
    setSnackbar,
    handleSnackbarClose,
  };
};
