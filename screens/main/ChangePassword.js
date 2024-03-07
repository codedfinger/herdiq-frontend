import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { API_BASE_URL } from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const PasswordScreen = () => {

    navigation = useNavigation()
  // State variables for old and new password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle changing password
  const handleChangePassword = async () => {
    try {
      // Fetch user ID and auth token from AsyncStorage
      const authToken = await AsyncStorage.getItem('authToken');
      const userId = await AsyncStorage.getItem('userID');

      // Check if authToken and userId exist
      if (!authToken || !userId) {
        console.error('Please log in.');
        return;
      }

      // Make a request to backend to change password
      const response = await fetch(`${API_BASE_URL}/api/auth/password/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      // Display success message
      if (data.success) {
        Alert.alert('Success', 'Password changed successfully');
      } else {
        // Handle the case when registration fails
        Alert.alert('Error', data.error.message);
      }
      // Reset the input fields
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View className="flex-row justify-start">
            <TouchableOpacity 
                onPress={()=> navigation.goBack()}
                className="bg-green-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
                <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
        </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={oldPassword}
          onChangeText={text => setOldPassword(text)}
          placeholder="Old Password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
          placeholder="New Password"
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleChangePassword} style={styles.button}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
    },
    formContainer: {
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 30,
    },
    input: {
      height: 50,
      borderColor: '#00695C',
      borderWidth: 1,
      paddingHorizontal: 8,
      marginBottom: 20,
      width: '100%',
    },
    button: {
      backgroundColor: '#00695C',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      width: '100%',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  

export default PasswordScreen;
