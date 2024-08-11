import React from 'react';
import { Snackbar } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomSnackbar = ({ visible, onDismiss, message, type = 'error' }) => {
  const isSuccess = type === 'success';

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={6000}
      style={[styles.snackbar, isSuccess && styles.successSnackbar]}
      action={{
        label: 'Close',
        onPress: onDismiss,
      }}
    >
      <View style={styles.content}>
        <MaterialIcons
          name={isSuccess ? 'check-circle' : 'error'}
          size={24}
          color={isSuccess ? '#155724' : '#721c24'}
          style={styles.icon}
        />
        <Text style={[styles.message, isSuccess && styles.successMessage]}>
          {message}
        </Text>
      </View>
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: '#f8d7da',
  },
  successSnackbar: {
    backgroundColor: '#d4edda',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  message: {
    color: '#721c24', 
  },
  successMessage: {
    color: '#155724',
  },
});

export default CustomSnackbar;
