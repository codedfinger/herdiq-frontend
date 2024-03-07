import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../config/config';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {ArrowLeftIcon} from 'react-native-heroicons/solid'

const EditMilkScreen = () => {

  const [milkingDate, setMilkingDate] = useState(new Date ());

  const [ showMilkingDatePicker, setShowMilkingDatePicker ] = useState(false)


  const navigation = useNavigation();
  const route = useRoute();

  // Initialize state variables to hold breeding record details
  const [milkingDetails, setMilkingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the breeding record details when the component mounts
    fetchMilkingDetails();
  }, []);

  // Function to fetch breeding record details
  const fetchMilkingDetails = async () => {
    try {
      setLoading(true);
      const authToken = await AsyncStorage.getItem('authToken');
      const milkingID = route.params.milkingID; // Get the breedingId from route params

      const response = await fetch(`${API_BASE_URL}/api/milk/get-milk-record/${milkingID}`, {
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

      const milkingData = data.milking 

      setMilkingDetails(milkingData);

      console.log("milking details", milkingDetails)
    } catch (error) {
      console.error('Error fetching milking details:', error);
      setError('Error fetching milking details');
    } finally {
      setLoading(false);
    }
  };

  // Function to update breeding record
 // Function to update breeding record
const handleUpdateMilking = async () => {
    try {
      setLoading(true);
      const authToken = await AsyncStorage.getItem('authToken');
      const milkingID = route.params.milkingID; // Get the breedingId from route params
  
      // Construct the updated breeding record object
      const updatedMilkingRecord = {
        tagID: milkingDetails.tagID,
        animalType: milkingDetails.animalType,
        milkingDate: milkingDetails.milkingDate,
        shift: milkingDetails.shift,
        animals: milkingDetails.animals,
        amountOfMilk: milkingDetails.amountOfMilk,
        unit: milkingDetails.unit,
        fats: milkingDetails.fats,
        solidsNotFat: milkingDetails.solidsNotFat,
        totalSolid: milkingDetails.totalSolid,
        remark: milkingDetails.remark
      };
  
      const response = await fetch(`${API_BASE_URL}/api/milk/edit-milk-record/${milkingID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedMilkingRecord),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Breeding record successfully updated
      console.log('Milk record updated successfully!');
      // You can navigate to another screen or perform any other actions as needed
      navigation.navigate('PigMilk', { milkingID })

    } catch (error) {
      console.error('Error updating milk record:', error);
      setError('Error updating milk record');
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00695C" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!milkingDetails) {
    return null; // Return null if breedingDetails is not available yet
  }

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
    <View style={styles.container}>

<       View style={styles.greenCard}>
        <View className="flex-row justify-start">
          <TouchableOpacity 
          onPress={()=> navigation.goBack()} 
          className="bg-green-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Update Milk Record</Text>
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
            selectedValue={milkingDetails.shift}
            onValueChange={(itemValue, itemIndex) => {
            setMilkingDate(prevState => ({ ...prevState, shift: itemValue }))        

            }}>
            <Picker.Item label="Select Shift" value="" style={styles.pickerItem}/>
            <Picker.Item label="Morning" value="morning" style={styles.pickerItem}/>
            <Picker.Item label="Afternoon" value="afternoon" style={styles.pickerItem}/>
            <Picker.Item label="Evening" value="evening" style={styles.pickerItem}/>
        </Picker>
        </View>
    
        <>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              style={styles.input}
              value={milkingDetails.amountOfMilk}
              placeholder="Qty of Milk (ltr)"
              onChangeText={text => setBreedingDetails(prevState => ({ ...prevState, amountOfMilk: parseFloat(text)  }))}
            />

            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              style={styles.input}
              value={milkingDetails.fats}
              placeholder="Fats (%)"
              onChangeText={text => setBreedingDetails(prevState => ({ ...prevState, fats: parseFloat(text)  }))}
            />

            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              style={styles.input}
              value={milkingDetails.solidsNotFat}
              placeholder="Fats (%)"
              onChangeText={text => setBreedingDetails(prevState => ({ ...prevState, solidsNotFat: parseFloat(text)  }))}
            />

            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              style={styles.input}
              value={milkingDetails.totalSolid}
              placeholder="Fats (%)"
              onChangeText={text => setBreedingDetails(prevState => ({ ...prevState, totalSolid: parseFloat(text)  }))}
            />
            
        </>
        <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
        style={styles.input}
        value={milkingDetails.remark}
        placeholder="Remark"
        onChangeText={text => setMilkingDate(prevState => ({ ...prevState, remark: text }))}
        />

    </>


{loading && (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="yellow" />
  </View>
)}

</View>

      {/* Add a button to update the breeding record */}
      <TouchableOpacity onPress={handleUpdateMilking} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Update Milk Record</Text>
      </TouchableOpacity>
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

export default EditMilkScreen;
