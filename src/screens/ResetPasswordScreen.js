import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { useResetPassword } from "../hooks/useResetPassword";
import LinkText from "../components/LinkText";
import InputField from "../components/InputField";
import OtpLogin from "../components/OtpInput";
import CustomButton from "../components/CustomButton";
import CustomSnackbar from "../components/CustomSnackbar";
import { styles } from "../styles/ResetPasswordScreenStyles";

const ResetPasswordScreen = ({ navigation }) => {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinkText
        title={otpSent ? "Reset Password" : "Request OTP for Password Change"}
      />
      {!otpSent ? (
        <>
          <InputField
            label="Email Address"
            keyboardType="email-address"
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
            showEyeIcon
            secureTextEntry
            value={credentials.newPassword}
            onChangeText={(value) => handleChange("newPassword", value)}
            error={!!errors.newPassword}
            containerStyle={styles.inputFieldContainer}
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
      <LinkText
        title={"Go back to login"}
        onPress={() => navigation.navigate("Login")}
      />
      <CustomSnackbar
        visible={snackbar.visible}
        onDismiss={handleSnackbarClose}
        type={snackbar.severity}
        duration={3000}
        message={snackbar.message}
      />
    </ScrollView>
  );
};

export default ResetPasswordScreen;
