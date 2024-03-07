import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FAB } from 'react-native-paper'; // Import the FAB component
import { API_BASE_URL } from '../../../../config/config';

const AnimalListScreen = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);

  // fetch all breed
  const fetchAnimals = useCallback(async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      const userID = await AsyncStorage.getItem('userID')
      if (!authToken && !userID) {
        console.error('Please log in.');
        return;
      }


      const response = await fetch(`${API_BASE_URL}/api/animal/get-sheep-animals/${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      // if (!response.ok) {
      //   // Log the error message directly
      //   // console.error(`HTTP error! Status: ${response.status}`);
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      // const animalsData = await response.json();

      // setAnimals(animalsData.animals);
      // setLoading(false);

      if (!response.ok) {
        if (response.status === 404) {
          // If status is 404, set animals to an empty array
          setAnimals([]);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        const animalsData = await response.json();
        setAnimals(animalsData.animals);
      }
    } catch (error) {
      console.error('Error fetching animals:', error.message);
    } finally {
      setLoading(false); // Set loading to false in all cases
    }
  }, []);

  useEffect(() => {
    // Fetch the list of animals when the component mounts and when it is focused
    fetchAnimals();
  }, [isFocused, fetchAnimals]);

  
  //Delete Breed
  const handleDeleteAnimal = async (animalId) => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
    
      const response = await fetch(`${API_BASE_URL}/api/animal/delete-animal/${animalId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
  
      if (!response.ok) {
        console.log("response", response)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      Alert.alert('Animal removed successfully');
      // Fetch the updated list of animals after deletion
      fetchAnimals();
    } catch (error) {
      console.error('Error deleting animals:', error.message);
    }
  };

    // Edit breed
    const handleEditAnimal = async (animal) => {
      navigation.navigate('SheepAnimalDetails', { animal });
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
        <Text style={styles.headerTitle}>Animals</Text>
      </View>


      <View style={styles.card}>
      {loading ? (
        <ActivityIndicator size="large" color="#00695C" />
      ): error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : animals.length > 0 ? (
      <FlatList
        data={animals}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
              onPress={() => handleEditAnimal(item)}
              style={styles.listItem}
            >
            <View style={styles.itemHeader}>
              <Text style={styles.tagID}>{item.tagID}</Text>
              <Text style={styles.breedName}>{item.breedName}</Text>
              {/* Additional information: color and gender */}
              <View style={styles.additionalInfo}>
                <Text style={styles.additionalInfoText}>{`${item.color}, ${item.gender}`}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleDeleteAnimal(item._id)}
              style={styles.deleteButton}
            >
              <MaterialIcons name="delete" size={24} color="#00695C" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />


      ): (
        <Text style={styles.noAnimalsText}>No Animal Added</Text>
      )}
    </View>

    {/* Add FAB at the bottom of the screen */}
    <FAB
        style={styles.fab}
        icon="plus"
        color="#fff"
        onPress={() => {
          // Handle the action when the FAB is pressed
          navigation.navigate('SheepAddAnimal');
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
    color: '#00695C',
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


export default AnimalListScreen;
