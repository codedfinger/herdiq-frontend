import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../config/config';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icons from 'react-native-vector-icons/MaterialIcons';

import { DataTable } from 'react-native-paper';

const MilkScreen = () => {

  const navigation = useNavigation();

  const [animalType, setAnimalType] = useState('sheep');
  const [tagID, setTagID] = useState('');
  const [shiftSelected, setShiftSelected] = useState(false);
  const [tagExists, setTagExists] = useState(false);
  const [milkingDate, setMilkingDate] = useState(new Date ());
  const [shift, setShift] = useState('');
  const [animals, setAnimals] = useState([])
  const [amountOfMilk, setAmountOfMilk] = useState('');
  const [unit, setUnit] = useState('Ltr');
  const [fats, setFats] = useState('');
  const [solidsNotFat, setSolidsNotFat] = useState('');
  const [totalSolid, setTotalSolid] = useState('');
  const [remark, setRemark] = useState('');

  const [ showMilkingDatePicker, setShowMilkingDatePicker ] = useState(false)


  const [loading, setLoading] = useState(false);

  // Function to handle checking tag existence and if the animal is female
const checkTagExistence = async () => {
  try {
    setLoading(true);

     // Retrieve the auth token from AsyncStorage
     const authToken = await AsyncStorage.getItem('authToken');

     // Check if the authToken is available
     if (!authToken) {
       console.error('Please log in.');
       // Handle the case where the auth token is not available
       return;
     }

    const response = await fetch(`${API_BASE_URL}/api/animal/get-animal-by-tag/${tagID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    const animalData = data.animal

    if (animalData && animalData.gender === 'female') {


      animals.push({
        breedName: animalData.breedName,
        tagID: animalData.tagID
      })

      setTagExists(true);
      console.log('animals', animals)
    } else {
      setTagExists(false);
      if (!data.animal) {
        Alert.alert('Tag ID does not exist');
      } else {
        Alert.alert('Animal is not female');
      }
    }
  } catch (error) {
    console.error('Error checking tag existence:', error);
    Alert.alert('Something went wrong while checking tag existence');
  } finally {
    setLoading(false);
  }
};


  // add new breed
  const handleSaveMilking = async () => {
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

    let requestBody = {
      animalType,
      milkingDate,
      shift,
      animals,
      amountOfMilk,
      unit,
      fats,
      solidsNotFat,
      totalSolid,
      remark,
    };

      // Perform backend call to save data
      const response = await fetch(`${API_BASE_URL}/api/milk/add-milk-record`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',        
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Milk record added successfully:', data);

      navigation.navigate("SheepMilk")

    // Clear the form by updating state variables
      setAnimalType('');
      setAnimalType('');
      setMilkingDate('');
      setShift('');
      setAnimals('');
      setAmountOfMilk('');
      setUnit('');
      setFats('');
      setSolidsNotFat('');
      setTotalSolid('');
      setRemark('');

    } catch (error) {
      console.error('Error adding milk record:', error.message);
      Alert.alert('Something Went Wrong');

    } finally {
      setLoading(false); // Set loading back to false when the process is complete
    }
  };

  const handleOpenMilkingDatePicker = () => {
    setShowMilkingDatePicker(true)
  };
  
  // Function to handle opening the first day datepicker
  const handleCloseMilkingDatePicker = () => {
    setShowMilkingDatePicker(false)
  };

  const onChangeMilkingDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    // const formattedDate = moment(currentDate).format('YYYY-MM-DD');
    console.log("selected date", currentDate)
    handleCloseMilkingDatePicker(true);
    setMilkingDate(currentDate);
  };

  return (
    <ScrollView>

    <View style={styles.container}>
      <View style={styles.greenCard}>
        <View className="flex-row justify-start">
          <TouchableOpacity 
          onPress={()=> navigation.goBack()} 
          className="bg-green-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Add Milk Record</Text>
      </View>


      <View style={styles.card}>

          <>
           <TouchableOpacity
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              style={styles.modalInput}
              onPress={handleOpenMilkingDatePicker} // Open the first day datepicker on press
            >
              <Text>{milkingDate.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {showMilkingDatePicker && (
              <DateTimePicker
                testID="matingDatePicker"
                value={milkingDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeMilkingDate}
              />
            )}
          <View 
            style={styles.dropDownInput}
          >
          <Picker
            style={{width:"100%"}} 
            
            mode="dropdown"      
            selectedValue={shift}
            onValueChange={(itemValue, itemIndex) => {
              setShift(itemValue);
              setShiftSelected(true)
            }}>
            <Picker.Item label="Select Shift" value="" style={styles.pickerItem}/>
            <Picker.Item label="Morning" value="morning" style={styles.pickerItem}/>
            <Picker.Item label="Afternoon" value="afternoon" style={styles.pickerItem}/>
            <Picker.Item label="Evening" value="evening" style={styles.pickerItem}/>
          </Picker>
          </View>
           
            {shiftSelected && (
              <>

                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={tagID}
                  placeholder="Tag ID"
                  onChangeText={text => setTagID(text)}
                />
                {!tagExists && (
                  <TouchableOpacity onPress={checkTagExistence} style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Add</Text>
                </TouchableOpacity>
                )}

                
              </>
            )}

            {tagExists && (
              <>
                <View style={styles.animalsContainer}>
                  <Text style={styles.animalsHeader}>Animals</Text>

                  {/* React Native Paper DataTable to display shed animals */}
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Name</DataTable.Title>
                      <DataTable.Title>Tag ID</DataTable.Title>

                    </DataTable.Header>

                    {animals.map((animal, index) => (
                      <DataTable.Row 
                      key={index}
                      >
                        <DataTable.Cell>{animal.breedName}</DataTable.Cell>
                        <DataTable.Cell>{animal.tagID}</DataTable.Cell>
                        <TouchableOpacity onPress={() => handleRemoveAnimal(animal.tagID)}>
                          <Icons name="remove-circle" style={styles.deleteIcon} size={24} color="red" />
                        </TouchableOpacity>
                      </DataTable.Row>
                    ))}
                  </DataTable>

                </View>

                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={amountOfMilk}
                  placeholder="Qty of Milk (Ltr)"
                  onChangeText={text => setAmountOfMilk(text)}
                />
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={fats}
                  placeholder="Fat (%)"
                  onChangeText={text => setFats(text)}
                />
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={solidsNotFat}
                  placeholder="SNF (%)"
                  onChangeText={text => setSolidsNotFat(text)}
                />

                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={totalSolid}
                  placeholder="TS (%)"
                  onChangeText={text => setTotalSolid(text)}
                />
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={remark}
                  placeholder="Remark"
                  onChangeText={text => setRemark(text)}
                />

                <TouchableOpacity onPress={handleSaveMilking} style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Continue</Text>
                </TouchableOpacity>           
              </>
            )}
          </>
      
        {loading && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="yellow" />
          </View>
        )}

      </View>
    </View>
    </ScrollView>

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

  modalInput: {
    borderColor: '#00695C',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dropDownInput: {
    borderColor: '#00695C',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  pickerItem: {
    fontSize: 15
  }
  
});


export default MilkScreen;
