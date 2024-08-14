import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styles from "../styles/RegisterScreenStyles";

const CustomPicker = ({formData, handleRoleChange, userRoles, errors }) => {
  return (
    <View style={styles.pickerContainer}>
    <Text style={styles.label}>User Role</Text>
    <View style={styles.pickerWrapper}>
    <RNPickerSelect
      onValueChange={handleRoleChange}
      value={formData.userRole}
      items={userRoles.map((role) => ({ label: role.label, value: role.value }))}
      style={{
        inputAndroid: styles.inputAndroid,
        inputIOS: styles.inputIOS,
      }}
    />
  </View>
    {errors.userRole && (
      <Text style={styles.errorText}>{errors.userRole}</Text>
    )}
  </View>
  );
};

export default CustomPicker;
