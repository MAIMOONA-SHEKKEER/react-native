import { useState } from "react";
import { fieldMapping } from "../constants/fieldMapping";
import {
  validateEmail,
  validateMobile,
  validatePassword,
} from "../utils/validators";
import { generateSnackbarMessage } from "../utils/authUtils";
import { registerUser } from "../config/user";
import { useNavigation } from "@react-navigation/native";

export default function useRegister(initialFormState) {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    severity: "success",
  });

  const navigation = useNavigation();

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key === "email" && !validateEmail(formData[key])) {
        newErrors[key] = "Invalid email address";
      } else if (key === "password" && !validatePassword(formData[key])) {
        newErrors[key] = "Password must be at least 6 characters long";
      } else if (key === "mobile" && !validateMobile(formData[key])) {
        newErrors[key] = "Mobile number must be between 10 to 15 digits";
      } else if (!formData[key]) {
        newErrors[key] = `${
          fieldMapping[key] || key.replace(/([A-Z])/g, " $1")
        } is required`;
      }
    });
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      handleRegistration();
    } else {
      setErrors(validationErrors);
    }
  };

  const resetFormData = () => {
    setFormData({
      ...initialFormState,
    });
  };

  const handleRegistration = async () => {
    setLoading(true);
    try {
      const response = await registerUser(formData);
      resetFormData();
      if (response.successful) {
        setSnackbar({
          visible: true,
          message: "Registration successful!",
          severity: "success",
        });
        navigation.navigate("Feedback", {
          message: "Registration successful!",
        });
      } else {
        const errorMessage = generateSnackbarMessage(response);
        setSnackbar({
          visible: true,
          message: errorMessage || "Registration failed",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        visible: true,
        message: "Registration failed. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      userRole: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      userRole: "",
    }));
  };

  const handleChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleSnackbarClose = () =>
    setSnackbar((prev) => ({ ...prev, visible: false }));

  return {
    formData,
    errors,
    loading,
    snackbar,
    handleChange,
    handleRoleChange,
    handleSubmit,
    handleSnackbarClose,
  };
}
