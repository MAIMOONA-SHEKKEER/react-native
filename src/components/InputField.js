import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function InputField({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  showEyeIcon, 
}) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  let iconName;
  if (keyboardType === "phone-pad") {
    iconName = "phone";
  } else if (keyboardType === "email-address") {
    iconName = "email";
  } else {
    iconName = "account-circle";
  }

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        keyboardType={keyboardType}
        mode="outlined"
        style={{
          backgroundColor: "#FFFF",
        }}
        right={
          showEyeIcon ? (
            <TextInput.Icon
              icon={() => (
                <TouchableOpacity onPress={toggleSecureEntry}>
                  <MaterialIcons
                    name={isSecure ? "visibility-off" : "visibility"}
                    size={24}
                    color="#4B0082"
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            <TextInput.Icon
              icon={() => (
                <MaterialIcons name={iconName} size={24} color="#4B0082" />
              )}
            />
          )
        }
      />
    </View>
  );
}
