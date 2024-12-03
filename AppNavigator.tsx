import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/CalendarScreen';
import ReminderScreen from '../screens/ReminderScreen';
import ProductivityScreen from '../screens/ProductivityScreen';
import GoalsScreen from '../screens/GoalsScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Reminder" component={ReminderScreen} />
      <Tab.Screen name="Productivity" component={ProductivityScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
    </Tab.Navigator>
  );
}
