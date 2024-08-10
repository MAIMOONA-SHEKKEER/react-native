import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from "../styles/SideBarStyles";

const menuItems = [
  { name: "Home", icon: "home" },
  { name: "Profile", icon: "person" },
  { name: "Settings", icon: "settings" },
];

const Sidebar = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Icon name="close" size={30} color="#000" />
      </TouchableOpacity>
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Icon name={item.icon} size={24} color="#6200ee" />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


export default Sidebar;
