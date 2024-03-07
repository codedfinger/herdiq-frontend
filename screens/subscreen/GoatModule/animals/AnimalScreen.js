import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Picker, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API_BASE_URL } from '../../../../config/config';

const AnimalScreen = () => {

  const navigation = useNavigation();

  const [tagID, setTagID] = useState('');
  const [animalType, setAnimalType] = useState('goat');
  const [breedName, setBreedName] = useState('');
  const [gender, setGender] = useState('');
  const [color, setColor] = useState('');
  const [batchNo, setBatchNo] = useState('');
  const [purchaseType, setPurchaseType] = useState('');
  const [shed, setShed] = useState('');

  const [loading, setLoading] = useState(false);

  // add new breed
  const handleSaveAnimal = async () => {
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
      const response = await fetch(`${API_BASE_URL}/api/animal/add-animal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',        
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ 
            tagID,
            animalType, 
            breedName,
            gender,
            color,
            batchNo,
            purchaseType,
            shed,  
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Animal added successfully:', data);

      navigation.navigate("GoatAnimals")

    // Clear the form by updating state variables
      setAnimalType('');
      setBreedName('');

    } catch (error) {
      console.error('Error saving animal:', error.message);
      Alert.alert('Something Went Wrong');

    } finally {
      setLoading(false); // Set loading back to false when the process is complete
    }
  };

  return (
    <KeyboardAwareScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    extraScrollHeight={Platform.select({ ios: 20, android: 20 })}
    enableOnAndroid
  >
    <View style={styles.container}>
      <View style={styles.greenCard}>
        <View className="flex-row justify-start">
          <TouchableOpacity 
          onPress={()=> navigation.goBack()} 
          className="bg-green-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Add Animal</Text>
      </View>

      <View style={styles.card}>

      {/* Animal Info */}
      <View style={styles.animalInfo}>
      <Text style={styles.inputTitle}>Info</Text>
      <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={styles.input}
          value={tagID}
          placeholder="Tag ID"
          onChangeText={text => setTagID(text)}
        />

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
          value={breedName}
          placeholder="Breed Name"
          onChangeText={text => setBreedName(text)}
        />
      </View>


      {/* Appearance */}
        <View style={styles.appearance}>
        <Text style={styles.inputTitle}>Appearance</Text>
          <View style={styles.inputRow}>
          <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              style={[styles.input, styles.flexibleInput]}  // Add flexibleInput style
              value={gender}
              placeholder="Gender"
              onChangeText={text => setGender(text)}
            />   

            <View style={{ width: 10 }} />

            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              style={[styles.input, styles.flexibleInput]}  // Add flexibleInput style
              value={color}
              placeholder="Color"
              onChangeText={text => setColor(text)}
            /> 

          </View>
            
        </View >


        
        <View style={styles.purchase}>
        <Text style={styles.inputTitle}>Purchase</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            style={styles.input}
            value={batchNo}
            placeholder="Batch No"
            onChangeText={text => setBatchNo(text)}
          />

          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            style={styles.input}
            value={purchaseType}
            placeholder="Purchase Type"
            onChangeText={text => setPurchaseType(text)}
          />          

          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            style={styles.input}
            value={shed}
            placeholder="Shed"
            onChangeText={text => setShed(text)}
          />      
        </View>

        { loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="yellow" />
          </View>
        ):(
          <TouchableOpacity onPress={handleSaveAnimal} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Animal</Text>
          </TouchableOpacity>
        )}
        
      </View>
    </View>

    </KeyboardAwareScrollView>
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
    padding: 5, // Add padding
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

  inputTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
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
  animalInfo: {
    marginBottom: 10, // Adjust this value
    marginTop: 10,
  },
  appearance: {
    marginBottom: 10, // Adjust this value
    marginTop: 10,
  },
  purchase: {
    marginBottom: 10, // Adjust this value
  },
  flexibleInput: {
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // or use 'space-around' for additional spacing
    alignItems: 'center', // Optional: align items to the center vertically
    marginTop: 10, // Add some top margin for spacing

  },
});


export default AnimalScreen;
