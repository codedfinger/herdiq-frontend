import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/main/HomeScreen';
import WelcomeScreen from '../screens/main/WelcomeScreen';
import LoginScreen from '../screens/main/LoginScreen';
import SignUpScreen from '../screens/main/SignUpScreen';
import DashboardScreen from '../screens/main/DashboardScreen';
import MainScreen from '../screens/main/MainScreen'

import GoatScreen from '../screens/GoatScreen';
import SheepScreen from '../screens/SheepScreen';
import RabbitScreen from '../screens/RabbitScreen';
import CowScreen from '../screens/CowScreen';
import PigScreen from '../screens/PigScreen';

import BreedListScreen from '../screens/subscreen/breed/BreedListScreen';
import BreedScreen from '../screens/subscreen/breed/BreedScreen';
import AnimalListScreen from '../screens/subscreen/animals/AnimalListScreen';
import AnimalScreen from '../screens/subscreen/animals/AnimalScreen';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        {/* main screens */}
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        <Stack.Screen name="Dashboard" options={{headerShown: false}} component={DashboardScreen} />
        <Stack.Screen name="Main" options={{headerShown: false}} component={MainScreen} />

        {/* animal screen */}
        <Stack.Screen name="Goat" options={{headerShown: false}} component={GoatScreen} />
        <Stack.Screen name="Sheep" options={{headerShown: false}} component={SheepScreen} />
        <Stack.Screen name="Rabbit" options={{headerShown: false}} component={RabbitScreen} />
        <Stack.Screen name="Cow" options={{headerShown: false}} component={CowScreen} />
        <Stack.Screen name="Pig" options={{headerShown: false}} component={PigScreen} />

        {/* sub animal screen */}
        <Stack.Screen name="Breed" options={{headerShown: false}} component={BreedListScreen} />
        <Stack.Screen name="AddBreed" options={{headerShown: false}} component={BreedScreen}/>
        <Stack.Screen name="Animals" options={{headerShown: false}} component={AnimalListScreen}/>
        <Stack.Screen name="AddAnimal" options={{headerShown: false}} component={AnimalScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}