import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FAB } from 'react-native-paper'; // Import the FAB component
import { API_BASE_URL } from '../../../../config/config';

const BreedScreen = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const [breeds, setBreeds] = useState([]);
  const [error, setError] = useState(null);

  // fetch all breed
  const fetchBreeds = useCallback(async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      const userID = await AsyncStorage.getItem('userID')
      if (!authToken && !userID) {
        console.error('Please log in.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/breed/get-sheep-breeds/${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      // const breedsData = await response.json();

      // setBreeds(breedsData.breeds);
      // setLoading(false);

      if (!response.ok) {
        if (response.status === 404) {
          // If status is 404, set animals to an empty array
          setBreeds([]);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        const breedsData = await response.json();
        setBreeds(breedsData.breeds);
      }
    } catch (error) {
      console.error('Error fetching breeds:', error.message);
    } finally {
      setLoading(false); // Set loading to false in all cases
    }
  }, []);

  useEffect(() => {
    // Fetch the list of breeds when the component mounts and when it is focused
    fetchBreeds();
  }, [isFocused, fetchBreeds]);


  // Edit breed
  const handleEditBreed = async (breedId) => {
    // Implement the logic to navigate to the edit screen with the breedId
    // You can use navigation.navigate('EditBreedScreen', { breedId });
  };
  
  //Delete Breed
  const handleDeleteBreed = async (breedId) => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
    
      const response = await fetch(`${API_BASE_URL}/api/breed/delete-breed/${breedId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      Alert.alert('Breed deleted successfully');
      // Fetch the updated list of breeds after deletion
      fetchBreeds();
    } catch (error) {
      console.error('Error deleting breed:', error.message);
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
        <Text style={styles.headerTitle}>Breeds</Text>
      </View>


      <View style={styles.card}>
      {loading ? (
        <ActivityIndicator size="large" color="#00695C" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : breeds.length > 0 ? (
        <FlatList
          data={breeds}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View style={styles.itemHeader}>
                <Text style={styles.animalType}>{item.animalType}</Text>
                <Text style={styles.breedName}>{item.breedName}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleDeleteBreed(item._id)}
                style={styles.deleteButton}
              >
                <MaterialIcons name="delete" size={24} color="#00695C" />
              </TouchableOpacity>
            </View>
          )}
        />
      ): (
        <Text style={styles.noAnimalsText}>No Breed Added</Text>
      )}
    </View>

    {/* Add FAB at the bottom of the screen */}
    <FAB
        style={styles.fab}
        icon="plus"
        color="#fff"
        onPress={() => {
          // Handle the action when the FAB is pressed
          navigation.navigate('SheepAddBreed');
        }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
  },
  card: {
    marginTop: 76,
    padding: 5, // Add padding
    borderRadius: 8, // Optional: Add border radius

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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10, // Add padding
    borderRadius: 8, // Optional: Add border radius

  },
  itemHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  animalType: {
    fontSize: 14,
    color: '#555',
  },
  breedName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  deleteButton: {
    // backgroundColor: '#00695C',
    padding: 3,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#00695C',
  },
});


export default BreedScreen;
