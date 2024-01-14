import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DashboardScreen from '../screens/DashboardScreen';
import MainScreen from '../screens/MainScreen'
import GoatScreen from '../screens/GoatScreen';
import SheepScreen from '../screens/SheepScreen';
import RabbitScreen from '../screens/RabbitScreen';
import CowScreen from '../screens/CowScreen';
import PigScreen from '../screens/PigScreen';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        <Stack.Screen name="Dashboard" options={{headerShown: false}} component={DashboardScreen} />
        <Stack.Screen name="Main" options={{headerShown: false}} component={MainScreen} />
        <Stack.Screen name="Goat" options={{headerShown: false}} component={GoatScreen} />
        <Stack.Screen name="Sheep" options={{headerShown: false}} component={SheepScreen} />
        <Stack.Screen name="Rabbit" options={{headerShown: false}} component={RabbitScreen} />
        <Stack.Screen name="Cow" options={{headerShown: false}} component={CowScreen} />
        <Stack.Screen name="Pig" options={{headerShown: false}} component={PigScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}