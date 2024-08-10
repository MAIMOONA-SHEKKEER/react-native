import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Text, Snackbar } from "react-native-paper";
import { useResetPassword } from "../hooks/useResetPassword";
import LinkText from "../components/LinkText";
import InputField from "../components/InputField";
import OtpLogin from "../components/OtpInput";
import CustomButton from "../components/CustomButton";
import CustomSnackbar from "../components/CustomSnackbar";
import { styles } from "../styles/ResetPasswordScreenStyles";

const ResetPasswordScreen = () => {
  const {
    credentials,
    otpSent,
    errors,
    snackbar,
    handleChange,
    handleSubmit,
    handleSendOtp,
    loading,
    handleOtpChange,
    showResendOtpButton,
    onResendOtpClick,
    handleSnackbarClose,
  } = useResetPassword();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <View style={styles.container}>
      <LinkText
        title={otpSent ? "Reset Password" : "Request OTP for Password Change"}
      />
      {!otpSent ? (
        <>
          <InputField
            label="Email Address"
            value={credentials.email}
            onChangeText={(value) => handleChange("email", value)}
            error={!!errors.email}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
          <CustomButton
            title={"Send OTP"}
            onPress={handleSendOtp}
            loading={loading}
            disabled={credentials.email.trim() === "" || loading}
          />
        </>
      ) : (
        <>
          <OtpLogin
            otpSent={otpSent}
            otp={credentials.otp}
            onOtpChange={handleOtpChange}
            otpError={errors.otp}
            loading={loading}
            onSendOtp={handleSendOtp}
            onVerifyOtp={handleSubmit}
            showResendOtpButton={showResendOtpButton}
            onResendOtpClick={onResendOtpClick}
            reset={"reset"}
          />

          <InputField
            label="New Password"
            secureTextEntry={!showPassword}
            value={credentials.newPassword}
            onChangeText={(value) => handleChange("newPassword", value)}
            error={!!errors.newPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={handleClickShowPassword}
              />
            }
          />
          {errors.newPassword ? (
            <Text style={{ color: "red" }}>{errors.newPassword}</Text>
          ) : null}
          <CustomButton
            title={"Reset"}
            onPress={handleSubmit}
            loading={loading}
          />

          {showResendOtpButton && (
            <LinkText title={"Resend OTP"} onPress={onResendOtpClick} />
          )}
        </>
      )}
      <CustomSnackbar
        visible={snackbar.visible}
        onDismiss={handleSnackbarClose}
        type={snackbar.severity}
        duration={3000}
        message={snackbar.message}
      />
    </View>
  );
};

export default ResetPasswordScreen;
