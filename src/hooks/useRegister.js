import { useState } from 'react';
import { registerUser } from '../services/authService';

export default function useRegister(initialFormState) {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    // Add more validation as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: '',
    }));
  };

  const handleRoleChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      userRole: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      userRole: '',
    }));
  };

  const handleSubmit = async (navigation) => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const data = await registerUser(formData);
      if (data.success) {
        navigation.navigate('Login');
      } else {
        setErrors({ global: data.message });
      }
    } catch (err) {
      setErrors({ global: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    handleChange,
    handleRoleChange,
    handleSubmit,
  };
}
