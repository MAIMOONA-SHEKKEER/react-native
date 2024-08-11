import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import FeedbackComponent from './src/components/Feedback';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login"  options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="Dashboard"  options={{ headerShown: false }} component={DashboardScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
        <Stack.Screen name="Feedback" options={{ headerShown: false }} component={FeedbackComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
