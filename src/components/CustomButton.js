import React from 'react';
import { Button } from 'react-native-paper';

export default function CustomButton({ title, onPress, disabled }) {
  return (
    <Button 
      mode="contained" 
      onPress={onPress} 
      disabled={disabled}
      style={{backgroundColor:"#4B0082"}}
    >
      {title}
    </Button>
  );
}
