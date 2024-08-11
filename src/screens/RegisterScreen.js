import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import useRegister from '../hooks/useRegister';
import styles from '../styles/RegisterScreenStyles';

export default function RegisterScreen({ navigation }) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    snackbar,
    handleRegister,
    handleSnackbarClose
  } = useRegister();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        <RegisterForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleRegister={handleRegister}
          loading={loading}
          error={error}
          navigation={navigation}
          snackbar={snackbar}
          handleSnackbarClose={handleSnackbarClose}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
