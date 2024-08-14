import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import CustomButton from "../components/CustomButton";
import styles from "../styles/RegisterScreenStyles";
import useRegister from "../hooks/useRegister";
import { fieldMapping } from "../constants/fieldMapping";
import { userRoles } from "../constants/userRoles";
import { initialFormState } from "../constants/formState";
import LinkText from "./LinkText";
import InputField from "./InputField";
import CustomPicker from "./CustomPicker";
import CustomSnackbar from "./CustomSnackbar";

const RegistrationForm = ({ navigation }) => {
  const {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleRoleChange,
    snackbar,
    handleSnackbarClose,
  } = useRegister(initialFormState);

  const handleRegister = () => {
    handleSubmit();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(formData).map((field) =>
        field !== "userRole" ? (
          <View key={field} style={styles.inputContainer}>
            <InputField
              style={styles.input}
              value={formData[field]}
              label={fieldMapping[field]}
              required
              onChangeText={(text) => handleChange(field, text)}
              placeholder={fieldMapping[field]}
              secureTextEntry={field === "password"}
              showEyeIcon={field === "password"}
              keyboardType={
                field === "mobileNumber"
                  ? "phone-pad"
                  : field === "username"
                  ? "email-address"
                  : "default"
              }
            />
            {errors[field] && (
              <Text style={styles.errorText}>{errors[field]}</Text>
            )}
          </View>
        ) : null
      )}
        <CustomPicker
          formData={formData}
          errors={errors}
          handleRoleChange={handleRoleChange}
          userRoles={userRoles}
        />
      <CustomButton
        title={
          loading ? <ActivityIndicator size="small" color="#fff" /> : "Register"
        }
        onPress={handleRegister}
        disabled={loading}
      />
      <LinkText
        title="Already have an account? Login here"
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

export default RegistrationForm;
