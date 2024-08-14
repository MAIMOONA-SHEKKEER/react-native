import React, { useState } from "react";
import {  Card } from "react-native-paper";
import { View } from "react-native";
import Sidebar from '../components/Sidebar';
import { styles } from "../styles/DashboardScreenStyles";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import SidebarToggleButton from "../components/ToggleButton";
import UserInfo from "../components/UserInfo";
import user from "../constants/userInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DashboardScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigation();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
    <Sidebar isVisible={isSidebarVisible} onClose={toggleSidebar} />
    <SidebarToggleButton onPress={toggleSidebar} />
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <UserInfo user={user} />
      </Card>
      <CustomButton title="LOGOUT" onPress={logoutUser} />
    </View>
  </View>

  );
};

export default DashboardScreen;
