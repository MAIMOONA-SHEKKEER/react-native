import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/LoginScreenStyles";
import CustomSnackbar from "../components/CustomSnackbar";
import { Divider } from "react-native-paper";
import useLogin from "../hooks/useLogin";
import PasswordLogin from "../components/PasswordInput";
import OtpLogin from "../components/OtpInput";
import ToggleLoginMethod from "../components/ToggleLogin";
import EmailInput from "../components/EmailInput";
import LinkText from "../components/LinkText";

export default function LoginScreen({ navigation }) {
  const {
    credentials,
    loginMethod,
    otpSent,
    errors,
    snackbar,
    handleChange,
    handleSubmit,
    toggleLoginMethod,
    handleSnackbarClose,
    onVerifyOtpClick,
    handleSendOtp,
    otpError,
    loading,
    showResendOtpButton,
    onResendOtpClick,
  } = useLogin();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      <EmailInput
        value={credentials.email}
        onChangeText={(value) => handleChange("email", value)}
        error={errors.email}
      />
      {loginMethod === "email-password" && !otpSent && (
        <PasswordLogin
          password={credentials.password}
          onPasswordChange={(value) => handleChange("password", value)}
          onSubmit={handleSubmit}
          error={errors.password}
          loading={loading}
          navigation={navigation}
        />
      )}
      {loginMethod === "email-otp" && (
        <OtpLogin
          otpSent={otpSent}
          otp={credentials.otp}
          onOtpChange={(value) => handleChange("otp", value)}
          otpError={otpError}
          loading={loading}
          onSendOtp={handleSendOtp}
          onVerifyOtp={onVerifyOtpClick}
          showResendOtpButton={showResendOtpButton}
          onResendOtpClick={onResendOtpClick}
            />
      )}
      <ToggleLoginMethod
        loginMethod={loginMethod}
        toggleLoginMethod={toggleLoginMethod}
      />
      <Divider />
      <LinkText title={"OR"} />
      <Divider />
      <LinkText
        title={"Don't have an account? Please Register"}
        onPress={() => navigation.navigate("Register")}
      />
      <CustomSnackbar
        visible={snackbar.open}
        onDismiss={handleSnackbarClose}
        type={snackbar.severity}
        duration={3000}
        message={snackbar.message}
      />
    </View>
  );
}
