import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import { themeColors } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config'

export default function LoginScreen() {
  const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {

          setLoading(true); // Set loading to true when starting the signup process
    
          const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            // Registration successful, you can handle the success scenario here
            // Alert.alert('Success', data.data.message);
            // Navigate to another screen or perform any action you need

            await AsyncStorage.setItem('authToken', data.data.token);
            await AsyncStorage.setItem('userID', data.data.user._id)
            await AsyncStorage.setItem('username', data.data.user.username)
            await AsyncStorage.setItem('farmName', data.data.user.farmName)

            console.log("user", await AsyncStorage.getItem('userID'))

            navigation.navigate('Dashboard'); 
          } else {
            // Handle the case when registration fails
            Alert.alert('Error', data.error.message);
          }
        } catch (error) {
          // Handle any network or server errors
          console.error('Error during login:', error);
        } finally {
          setLoading(false); // Set loading back to false when the signup process is complete
        }
      };

  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView  className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={()=> navigation.goBack()} 
          className="bg-green-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View  className="flex-row justify-center">
          <Image source={require('../../assets/images/login.png')} 
          style={{width: 200, height: 200}} />
        </View>
        
        
      </SafeAreaView>
      <View 
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
        className="flex-1 bg-white px-8 pt-8">
          <View className="form space-y-2">
            <Text className="text-white-100 ml-4">Email Address</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text className="text-white-100 ml-4">Password</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              placeholder="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity className="flex items-end">
              <Text className="text-white-100 mb-5">Forgot Password?</Text>
            </TouchableOpacity>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="yellow" />
                </View>
            ) : (
                <TouchableOpacity onPress={handleLogin} className="py-3 bg-green-500 rounded-xl">
                <Text className="font-xl font-bold text-center text-white">Login</Text>
                </TouchableOpacity>
            )}
            
          </View>
          <Text className="text-xl text-white-100 font-bold text-center py-5">Or</Text>
          <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../../assets/icons/google.png')} className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../../assets/icons/apple.png')} className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Image source={require('../../assets/icons/facebook.png')} className="w-10 h-10" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-7">
              <Text className="text-white-100 font-semibold">
                  Don't have an account?
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                  <Text className="font-semibold text-yellow-400"> Sign Up</Text>
              </TouchableOpacity>
          </View>
          
      </View>
    </View>
    
  )
}