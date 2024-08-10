import React from 'react';
import { ActivityIndicator, Button } from 'react-native-paper';

export default function CustomButton({ title, onPress, disabled,loading }) {
  return (
    <Button 
      mode="contained" 
      onPress={onPress} 
      disabled={disabled}
      loading={loading}
      style={{
        backgroundColor: disabled ? "#A9A9A9" : "#4B0082",
        opacity: disabled ? 0.6 : 1,
      }}
    >
     {loading ? <ActivityIndicator animating={true} color="#FFFFFF" size="small" /> : title}
    </Button>
  );
}
