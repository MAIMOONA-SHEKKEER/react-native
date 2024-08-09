import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import CustomButton from "../components/CustomButton";
import styles from "../styles/RegisterScreenStyles";
import useRegister from "../hooks/useRegister";
import { fieldMapping } from "../constants/fieldMapping";
import { userRoles } from "../constants/userRoles";
import { initialFormState } from "../constants/formState";
import { Picker } from "@react-native-picker/picker";
import LinkText from "./LinkText";
import InputField from "./InputField";
import CustomPicker from "./CustomPicker";

const RegistrationForm = ({ navigation }) => {
  const {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleRoleChange,
  } = useRegister(initialFormState);

  const handleRegister = () => {
    handleSubmit();
  };

  return (
    <View style={styles.container}>
      {Object.keys(formData).map(
        (field) =>
          field !== "userRole" && (
            <View key={field} style={styles.inputContainer}>
              <InputField
                style={styles.input}
                value={formData[field]}
                label={fieldMapping[field]}
                onChangeText={(text) => handleChange(field, text)}
                placeholder={fieldMapping[field]}
                secureTextEntry={field === "password"}
                keyboardType={field === "mobileNumber" ? "numeric" : "default"}
              />
              {errors[field] && (
                <Text style={styles.errorText}>{errors[field]}</Text>
              )}
            </View>
          )
      )}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>User Role</Text>
        <CustomPicker
          selectedValue={formData.userRole}
          onValueChange={(itemValue) => handleRoleChange(itemValue)}
          items={userRoles}
        />

        {errors.userRole && (
          <Text style={styles.errorText}>{errors.userRole}</Text>
        )}
      </View>
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
    </View>
  );
};

export default RegistrationForm;
