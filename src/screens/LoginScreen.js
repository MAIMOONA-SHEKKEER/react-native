import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/LoginScreenStyles";
import InputField from "../components/InputField";
import useLogin from "../hooks/useLogin";
import CustomButton from "../components/CustomButton";
import LinkText from "../components/LinkText";
import CustomSnackbar from "../components/CustomSnackbar";
import { Chip, Divider } from "react-native-paper";

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
      <InputField
        label="Email"
        value={credentials.email}
        onChangeText={(value) => handleChange("email", value)}
        error={!!errors.email}
      />
      {errors.email ? (
        <Text style={styles.errorText}>{errors.email}</Text>
      ) : null}

      {loginMethod === "email-password" && !otpSent && (
        <>
          <InputField
            label="Password"
            value={credentials.password}
            onChangeText={(value) => handleChange("password", value)}
            secureTextEntry
            error={!!errors.password}
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
          <CustomButton
            title={" Login"}
            onPress={handleSubmit}
            loading={loading}
          />
        </>
      )}

      {loginMethod === "email-otp" && (
        <>
          {otpSent ? (
            <>
              <InputField
                label="OTP"
                value={credentials.otp}
                onChangeText={(value) => handleChange("otp", value)}
                keyboardType="numeric"
                error={!!otpError}
                style={styles.input}
              />
              {otpError ? (
                <Text style={styles.errorText}>{otpError}</Text>
              ) : null}
              <CustomButton
                title={" Verify OTP"}
                onPress={onVerifyOtpClick}
                loading={loading}
              />
              {showResendOtpButton && (
                <LinkText
                  title={"Resend OTP"}
                  onPress={onResendOtpClick}
                  disabled={loading}
                />
              )}
            </>
          ) : (
            <CustomButton
              title={" Send OTP"}
              onPress={handleSendOtp}
              loading={loading}
            />
          )}
        </>
      )}

      <LinkText
        title={
          loginMethod === "email-password"
            ? "Login with OTP"
            : "Login with Password"
        }
        onPress={toggleLoginMethod}
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
