import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  generateSnackbarMessage,
  handleSendOtp,
  validateOtp,
} from "../utils/authUtils";
import { validateEmail, validatePassword } from "../utils/validators";
import { loginUser } from "../config/auth";
import { verifyOtp } from "../config/user";

export default function useLogin() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [loginMethod, setLoginMethod] = useState("email-password");
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResendOtpButton, setShowResendOtpButton] = useState(false);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    severity: "success",
  });

  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!validateEmail(credentials.email))
      newErrors.email = "Invalid email address";
    if (!validatePassword(credentials.password))
      newErrors.password = "Password must be at least 6 characters long";
    if (!credentials.email) newErrors.email = "Email is required";
    if (loginMethod === "email-password" && !credentials.password) {
      newErrors.password = "Password is required";
    }
    if (loginMethod === "email-otp" && !credentials.otp && otpSent) {
      newErrors.otp = "OTP is required";
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    handleLogin();
  };

  const resetForm = () => {
    setCredentials({
      email: "",
      password: "",
      otp: "",
    });
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(loginMethod, credentials);
      if (response.successful) {
        setSnackbar({
          visible: true,
          message: "Login Successful",
          severity: "success",
        });
        resetForm();
        setTimeout(() => {
          navigation.navigate("Dashboard");
        }, 3000);
      } else {
        const errorMessage = generateSnackbarMessage(response);
        setSnackbar({
          visible: true,
          message: errorMessage || "Login failed. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        visible: true,
        message: "Login failed. Please try again.",
        severity: "error",
      });
    }
  };

  const handleVerifyOtp = async (email, otp) => {
    try {
      const response = await verifyOtp(email, otp);

      if (response && response.successful) {
        const { validOtpProvided, message } = response.payload || {};

        if (validOtpProvided) {
          setSnackbar({
            visible: true,
            message: message || "OTP verified successfully!",
            severity: "success",
          });
          setTimeout(() => {
            navigation.navigate("Dashboard");
            resetState();
          }, 3000);
        } else {
          setSnackbar({
            visible: true,
            message: message || "Invalid OTP provided.",
            severity: "error",
          });
          setShowResendOtpButton(true);
        }
      } else {
        setSnackbar({
          visible: true,
          message: "OTP verification failed.",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        visible: true,
        message: "OTP verification failed. Please try again.",
        severity: "error",
      });
    }
  };

  const onVerifyOtpClick = () => {
    if (validateOtp(credentials.otp, setOtpError)) {
      setLoading(true);
      handleVerifyOtp(credentials.email, credentials.otp).finally(() =>
        setLoading(false)
      );
    }
  };

  const toggleLoginMethod = () => {
    setLoginMethod((prev) =>
      prev === "email-password" ? "email-otp" : "email-password"
    );
    setOtpSent(false);
  };

  const handleSnackbarClose = () =>
    setSnackbar((prev) => ({ ...prev, visible: false }));

  const handleBack = () => {
    setLoginMethod("email-password");
    navigation.navigate("Login");
  };

  const resetState = () => {
    resetForm();
    setOtpSent(false);
  };

  const onResendOtpClick = () => {
    setLoading(true);
    handleSendOtp(credentials.email, setSnackbar, setOtpSent).finally(() => {
      setLoading(false);
      setShowResendOtpButton(false);
    });
  };

  return {
    credentials,
    loginMethod,
    otpSent,
    errors,
    snackbar,
    handleChange,
    handleSubmit,
    handleSendOtp: () =>
      handleSendOtp(credentials.email, setSnackbar, setOtpSent),
    toggleLoginMethod,
    handleSnackbarClose,
    onVerifyOtpClick,
    otpError,
    loading,
    setErrors,
    showResendOtpButton,
    onResendOtpClick,
    handleBack,
  };
}
