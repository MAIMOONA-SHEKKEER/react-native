import { useNavigation } from "@react-navigation/native";
import { sendOtp } from "../config/auth";
import { verifyOtp } from "../config/user";
import { fieldMapping } from "../constants/fieldMapping";

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
  if (payload.includes("Email address is not verified"))
    return "Email address is not verified";
  if (payload.includes("Invalid credentials provided"))
    return "Invalid credentials provided";
  if (payload.includes("Invalid ID")) return "Invalid ID number";
  if (payload.includes("already exists")) return "Email address already exists";
  if (payload.includes("OTP has not expired"))
    return "Previously requested OTP has not expired yet";
  if (payload.includes("Missing final '@domaind"))
    return "Please verify email address";
  if (payload.includes("Provided Otp is redeemed already"))
    return "Provided OTP is already redeemed";
  if (payload.includes("could not execute statement"))
    return "There was a problem with your request. Please check your input.";

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
    console.log('otpResp',response)
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
