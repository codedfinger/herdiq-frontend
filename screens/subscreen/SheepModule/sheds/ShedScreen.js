import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../config/config';

const ShedScreen = () => {

  const navigation = useNavigation();

  const [animalType, setAnimalType] = useState('sheep');
  const [shedName, setShedName] = useState('');
  const [shedDescription, setShedDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // add new breed
  const handleSaveShed = async () => {
    try {

      setLoading(true); // Set loading to true when starting the add breed process

      // Retrieve the auth token from AsyncStorage
    const authToken = await AsyncStorage.getItem('authToken');

    // Check if the authToken is available
    if (!authToken) {
      console.error('Please log in.');
      // Handle the case where the auth token is not available
      return;
    }


      // Perform backend call to save data
      const response = await fetch(`${API_BASE_URL}/api/shed/add-shed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',        
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ animalType, shedName, shedDescription }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Shed added successfully:', data);

      navigation.navigate("SheepShed")

    // Clear the form by updating state variables
      setAnimalType('');
      setShedName('');
      setShedDescription('');

    } catch (error) {
      console.error('Error saving shed:', error.message);
      Alert.alert('Something Went Wrong');

    } finally {
      setLoading(false); // Set loading back to false when the process is complete
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.greenCard}>
        <View className="flex-row justify-start">
          <TouchableOpacity 
          onPress={()=> navigation.goBack()} 
          className="bg-green-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Add Shed</Text>
      </View>


      <View style={styles.card}>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={styles.input}
          value={animalType}
          placeholder="Animal Type"
          editable={false}
        />

        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={styles.input}
          value={shedName}
          placeholder="Shed Name"
          onChangeText={text => setShedName(text)}
        />

        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={styles.input}
          value={shedDescription}
          placeholder="Shed Description"
          onChangeText={text => setShedDescription(text)}
        />

        { loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="yellow" />
          </View>
        ):(
          <TouchableOpacity onPress={handleSaveShed} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Shed</Text>
          </TouchableOpacity>
        )}
        
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  card: {
    marginTop: 76,
    padding: 25, // Add padding
    borderRadius: 8, // Optional: Add border radius
  },
  secondCard: {
    marginTop: 72, // Add margin to the top of the second card
  },
  greenCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00695C',
    padding: 20,
    alignItems: 'flex-start',
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconWrapper: {
    alignItems: 'center',
    margin: 10,
  },
  iconBackground: {
    backgroundColor: 'rgba(178, 223, 219, 0.2)',
    borderRadius: 8,
    padding: 8,
  },
  iconText: {
    marginTop: 4,
    color: '#000',
    textAlign: 'center',
  },
  greetingContainer: {
    flex: 1,
    marginLeft: 8,
  },
  greetingText: {
    fontSize: 18,
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center', // Center the text
    width: '100%', // Ensure the text takes up the full width

  },
  profileImage: {
    width: 40,
    height: 40,
    backgroundColor: '#00695C',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  appbarIcons: {
    flexDirection: 'row',
  },
  iconSpacing: {
    marginRight: 16,
  },
  bannerContainer: {
    backgroundColor: '#004D40',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  bannerText: {
    fontSize: 18,
    color: '#000',
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    height: 50,
    borderColor: '#00695C',
    borderWidth: 1,
    paddingHorizontal: 8,
  },

  saveButton: {
    backgroundColor: '#00695C',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


export default ShedScreen;
