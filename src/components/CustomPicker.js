import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 

const CustomPicker = ({ selectedValue, onValueChange, items, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc', 
    borderRadius: 4, 
    paddingHorizontal: 10, 
    paddingVertical: 8, 
    backgroundColor: '#fff', 
    marginBottom: 10, 
  },
  picker: {
    height: 50, 
    width: '100%', 
  },
});

export default CustomPicker;
