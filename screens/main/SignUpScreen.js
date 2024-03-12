import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { themeColors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../../config/config';

// subscribe for more videos like this :)
export default function SignUpScreen() {

    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [farmName, setFarmName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        try {

          setLoading(true); // Set loading to true when starting the signup process
    
          const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              email,
              password,
              fullname,
              farmName,
            }),
          });
    
          const data = await response.json();

    
          if (data.success) {
            // Registration successful, you can handle the success scenario here
            Alert.alert('Success', data.data.message);
            // Navigate to another screen or perform any action you need
            navigation.navigate('Verify', { email: email }); // replace 'Home' with the screen you want to navigate to
          } else {
            // Handle the case when registration fails
            Alert.alert('Error', data.error.message);
          }
        } catch (error) {
          // Handle any network or server errors
          console.error('Error during signup:', error);
        } finally {
          setLoading(false); // Set loading back to false when the signup process is complete
        }
      };

  return (
    <ScrollView>
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
            <TouchableOpacity 
                onPress={()=> navigation.goBack()}
                className="bg-green-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
                <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
            <Image source={require('../../assets/images/signup.png')} 
                style={{width: 220, height: 110}} />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}
      >
        <View className="form space-y-2">
            {/* <Text className="text-white-100 ml-4">Username</Text> */}

            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={fullname}
                onChangeText={(text) => setFullname(text)}
                placeholder='Full name'
            />

            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={farmName}
                onChangeText={(text) => setFarmName(text)}
                placeholder='Farm name'
            />
            
            {/* <Text className="text-white-100 ml-4">Username</Text> */}
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={username}
                onChangeText={(text) => setUsername(text)}
                placeholder='Username'
            />

            {/* <Text className="text-white-100 ml-4">Email Address</Text> */}
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder='Email'
            />
            {/* <Text className="text-white-100 ml-4">Password</Text> */}
            <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder='Password'
            />
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="yellow" />
                </View>
            ) : (
                <TouchableOpacity onPress={handleSignUp} className="py-3 bg-green-500 rounded-xl">
                <Text className="font-xl font-bold text-center text-white">Sign Up</Text>
                </TouchableOpacity>
            )}
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
        </Text>
        <View className="flex-row justify-center space-x-12">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../../assets/icons/google.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../../assets/icons/apple.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                <Image source={require('../../assets/icons/facebook.png')} 
                    className="w-10 h-10" />
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                <Text className="font-semibold text-greenbg-600"> Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  )
}
