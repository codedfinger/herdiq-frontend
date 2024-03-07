import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/appNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './screens/HomeScreen';
// import GameStore from './screens/gameStore';

// const Tab = createBottomTabNavigator();


export default function App() {

  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        setAuthenticated(!!userToken); // Set isAuthenticated to true if a token is present
      } catch (error) {
        console.error('Error retrieving user token:', error);
      }
    };

    checkUserToken();
  }, []); // Empty dependency array ensures the effect runs only once on app startup

  return (
    <AppNavigation isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />
  );
}
