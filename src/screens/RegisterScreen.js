import React from 'react';
import { View } from 'react-native';
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
    <View style={styles.container}>
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
    </View>
  );
}
