import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DataTable } from 'react-native-paper';
import { API_BASE_URL } from '../../../../config/config';

const ShedDetailsScreen = ({ route }) => {
  const { shed } = route.params;

  const navigation = useNavigation();

  const [newAnimal, setNewAnimal] = useState('');
  const [shedAnimals, setShedAnimals] = useState([]); 

  const fetchShedAnimals = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');

      const response = await fetch(`${API_BASE_URL}/api/shed/get-shed/${shed._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setShedAnimals(data.shed.shedAnimals);
      } else {
        console.error('Error fetching shed animals:', data.message);
      }
    } catch (error) {
      console.error('Error fetching shed animals:', error.message);
    }
  };

  useEffect(() => {
    // Fetch shed animals when the component mounts
    fetchShedAnimals();
  }, [shed._id]); // Fetch shed animals whenever the shed ID changes


  const handleAddAnimal = async () => {
    try {
        const authToken = await AsyncStorage.getItem('authToken');

      // Make sure the tag ID is not empty
      if (!newAnimal.trim()) {
        Alert.alert('Error', 'Please enter the animal tag ID.');
        return;
      }

      // Call your API to add the animal to the shed
      const response = await fetch(`${API_BASE_URL}/api/shed/add-shed-animal/${shed._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          tagID: newAnimal.trim(),
        }),
      });

      const data = await response.json();

      // Handle the response
      if (response.ok) {
        console.log('Animal added successfully:', data);
        Alert.alert('success');
        fetchShedAnimals();

      } else {
        console.error('Error add animal:', data.message);
        Alert.alert(data.message);
      }
    } catch (error) {
      console.error('Error adding animal:', error.message);
      // Handle the error, show an error message, etc.
       // Add this block to log raw response and parsed data
    console.log('Raw response:', await response.text());
    console.log('Parsed data:', data);
    }
  };

  // remove aminal from shed
  const handleRemoveAnimal = async (tagID) => {
    try {
        const authToken = await AsyncStorage.getItem('authToken');

        const response = await fetch(`${API_BASE_URL}/api/shed/remove-shed-animal/${shed._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                tagID,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Animal removed successfully:', data);
            Alert.alert('success');
            fetchShedAnimals(); // Fetch the updated list of shed animals
        } else {
            console.error('Error removing animal:', data.message);
            Alert.alert(data.message);
        }
    } catch (error) {
        console.error('Error removing animal:', error.message);
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
            <Text style={styles.headerTitle}>{shed.shedName} Shed</Text>
        </View>
      
      
        <View style={styles.card}>
        <View style={styles.cardCover}>
            <MaterialIcons name="house" size={48} color="#00695C" />
        </View>
        <View style={styles.listItem}>
            <View style={styles.itemHeader}>
            <Text style={styles.aboutTitle}>About</Text>
            <Text style={styles.shedDescription}>{shed.shedDescription}</Text>
            </View>
        </View>
        </View>

       {/* Animals in the Shed */}
      <View style={styles.animalsContainer}>
        <Text style={styles.animalsHeader}>Shed Animals</Text>

        {/* React Native Paper DataTable to display shed animals */}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Tag ID</DataTable.Title>
            <DataTable.Title>Gender</DataTable.Title>

          </DataTable.Header>

          {shedAnimals.map((animal, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{animal.name}</DataTable.Cell>
              <DataTable.Cell>{animal.tagID}</DataTable.Cell>
              <DataTable.Cell>{animal.gender}</DataTable.Cell>
              <TouchableOpacity onPress={() => handleRemoveAnimal(animal.tagID)}>
                <Icons name="remove-circle" style={styles.deleteIcon} size={24} color="red" />
              </TouchableOpacity>
            </DataTable.Row>
          ))}
        </DataTable>

        {/* Display message if shedAnimals is empty */}
        {shedAnimals.length === 0 && (
            <Text style={styles.noAnimalsText}>No animals in this shed yet</Text>
        )}

      </View>

     {/* Add Animal Section */}
     <View style={styles.addAnimalContainer}>
        <TextInput
          style={styles.addAnimalInput}
          placeholder="Enter animal Tag ID"
          value={newAnimal}
          onChangeText={(text) => setNewAnimal(text)}
        />
        <TouchableOpacity style={styles.addAnimalButton} onPress={handleAddAnimal}>
          <Text style={styles.addAnimalButtonText}>Add Animal</Text>
        </TouchableOpacity>
      </View>

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
      padding: 5,
      borderRadius: 8,
      backgroundColor: '#fff', // Set the background color of the card
    },
    cardCover: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 120, // Adjust the height as needed
      backgroundColor: '#e0e0e0', // Set the background color of the card cover
      borderRadius: 8,
    },
      shedDescription: {
      fontSize: 16,
      color: '#555',
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
    aboutTitle: {
      fontSize: 14,
      color: '#00695C',
    },
    shedName: {
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
    animalsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#00695C',
        textAlign: 'center',
      },
      addAnimalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
      },
      addAnimalInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#00695C',
        borderRadius: 8,
        marginRight: 10,
        paddingHorizontal: 10,
      },
      addAnimalButton: {
        backgroundColor: '#00695C',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      },
      addAnimalButtonText: {
        color: '#fff',
        fontSize: 16,
      },
      noAnimalsText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginTop: 10,
        color: 'gray',
        fontStyle: 'italic'
      },
      deleteIcon: {
        fontSize: 24,
        color: '#D32F2F',
        fontWeight: 'bold',
        textAlign: 'center',  // Center the text horizontally
        alignSelf: 'center', // Center the text vertically
        marginTop: 15,
      },
  });
  

export default ShedDetailsScreen;
