import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../config/config';

const VaccineScreen = () => {

  const navigation = useNavigation();

  const [vaccineName, setVaccineName] = useState('');
  const [cycle, setCycle] = useState('');
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(false);

  // add new breed
  const handleSaveVaccine = async () => {
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
      const response = await fetch(`${API_BASE_URL}/api/vaccine/add-vaccine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',        
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ vaccineName, cycle, remark }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Vaccine added successfully:', data);

      navigation.navigate("RabbitVaccine")

    // Clear the form by updating state variables
      setVaccineName('');
      setCycle('');
      setRemark('');

    } catch (error) {
      console.error('Error saving vaccine:', error.message);
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
        <Text style={styles.headerTitle}>Add Vaccine</Text>
      </View>


      <View style={styles.card}>
        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={styles.input}
          value={vaccineName}
          placeholder="Vaccine Name"
          onChangeText={text => setVaccineName(text)}
        />

        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={styles.input}
          value={cycle}
          placeholder="Enter cycle in days"
          onChangeText={text => setCycle(text)}
        />

        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={styles.input}
          value={remark}
          placeholder="Remark"
          onChangeText={text => setRemark(text)}
        />

        { loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="yellow" />
          </View>
        ):(
          <TouchableOpacity onPress={handleSaveVaccine} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Vaccine</Text>
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


export default VaccineScreen;
