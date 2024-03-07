import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../config/config';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';


const BreedScreen = () => {

  const navigation = useNavigation();

  const [animalType, setAnimalType] = useState('sheep');
  const [tagID, setTagID] = useState('');
  const [tagExists, setTagExists] = useState(false);
  const [matingDate, setMatingDate] = useState(new Date ());
  const [matingType, setMatingType] = useState('natural');
  const [maleTagID, setMaleTagID] = useState(null);
  const [maleBreed, setMaleBreed] = useState(null);
  const [semen, setSemen] = useState(null);
  const [dose, setDose] = useState(null);
  const [administrator, setAdministrator] = useState(null);
  const [time, setTime] = useState(null);
  const [embryo, setEmbryo] = useState(null);
  const [matingStatus, setMatingStatus] = useState("pending");
  const [miscarriageDate, setMiscarriageDate] = useState(null);
  const [miscarriageReason, setMiscarriageReason] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [remark, setRemark] = useState('');
  const [showNaturalInputs, setShowNaturalInputs] = useState(false);
  const [showInseminationInputs, setShowInseminationInputs] = useState(false);
  const [showTransplantInputs, setShowTransplantInputs] = useState(false);

  const [ showMatingDatePicker, setShowMatingDatePicker ] = useState(false)


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

    // console.log("data sent", data)

    if (data.animal && data.animal.gender === 'female') {
      setTagExists(true);
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
  const handleSaveBreeding = async () => {
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
      tagID,
      matingDate,
      matingType,
      matingStatus,
      remark,
    };

    switch (matingType) {
      case 'natural':
        requestBody = {
          ...requestBody,
          maleTagID,
          maleBreed,
        };
        break;
      case 'artificial':
        requestBody = {
          ...requestBody,
          semen,
          dose,
          administrator,
          time,
        };
        case 'transplant':
        requestBody = {
          ...requestBody,
          embryo,
          administrator,
          time,
        };
        break;
      default:
        break;
    }

      // Perform backend call to save data
      const response = await fetch(`${API_BASE_URL}/api/breeding/add-breeding`, {
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
      console.log('Breeding added successfully:', data);

      navigation.navigate("SheepBreeding")

    // Clear the form by updating state variables
      setAnimalType('');

    } catch (error) {
      console.error('Error saving breeding:', error.message);
      Alert.alert('Something Went Wrong');

    } finally {
      setLoading(false); // Set loading back to false when the process is complete
    }
  };

  const handleOpenMatingDatePicker = () => {
    setShowMatingDatePicker(true)
  };
  
  // Function to handle opening the first day datepicker
  const handleCloseMatingDatePicker = () => {
    setShowMatingDatePicker(false)
  };
  

  const onChangeMatingDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    // const formattedDate = moment(currentDate).format('YYYY-MM-DD');
    console.log("selected date", currentDate)
    handleCloseMatingDatePicker(true);
    setMatingDate(currentDate);
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
        <Text style={styles.headerTitle}>Add Breed</Text>
      </View>


      <View style={styles.card}>

        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
          style={styles.input}
          value={tagID}
          placeholder="Tag ID"
          onChangeText={text => setTagID(text)}
        />

          {!tagExists && (
            <TouchableOpacity onPress={checkTagExistence} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Continue</Text>
            </TouchableOpacity>
          )}

        {tagExists && (
          <>
           <TouchableOpacity
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              style={styles.modalInput}
              onPress={handleOpenMatingDatePicker} // Open the first day datepicker on press
            >
              <Text>{matingDate.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {showMatingDatePicker && (
              <DateTimePicker
                testID="matingDatePicker"
                value={matingDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeMatingDate}
              />
            )}
          <View 
            style={styles.dropDownInput}
          >
          <Picker
            style={{width:"100%"}} 
            
            mode="dropdown"      
            selectedValue={matingType}
            onValueChange={(itemValue, itemIndex) => {
              setMatingType(itemValue);
              setShowNaturalInputs(itemValue === 'natural');
              setShowInseminationInputs(itemValue === 'artificial');
              setShowTransplantInputs(itemValue === 'transplant');

            }}>
            <Picker.Item label="Natural" value="natural" style={styles.pickerItem}/>
            <Picker.Item label="Artificial Insemination" value="artificial" style={styles.pickerItem}/>
            <Picker.Item label="Embryo Transplant" value="transplant" style={styles.pickerItem}/>
          </Picker>
          </View>
          

           
            {showNaturalInputs && (
              <>
                {/* Render additional inputs for natural mating */}
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={maleTagID}
                  placeholder="Male Tag ID"
                  onChangeText={text => setMaleTagID(text)}
                />
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={maleBreed}
                  placeholder="Male Breed"
                  onChangeText={text => setMaleBreed(text)}
                />
              </>
            )}

            {showInseminationInputs && (
              <>
                {/* Render additional inputs for insemination */}
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={semen}
                  placeholder="Semen"
                  onChangeText={text => setSemen(text)}
                />
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={dose}
                  placeholder="Dose"
                  onChangeText={text => setDose(text)}
                />
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={administrator}
                  placeholder="Technical/Medical Professional"
                  onChangeText={text => setAdministrator(text)}
                />
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={time}
                  placeholder="Time"
                  onChangeText={text => setTime(text)}
                />
              </>
            )}

            {showTransplantInputs && (
              <>
                {/* Render additional inputs for insemination */}
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={embryo}
                  placeholder="Embryo"
                  onChangeText={text => setEmbryo(text)}
                />
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={administrator}
                  placeholder="Technical/Medical Professional"
                  onChangeText={text => setAdministrator(text)}
                />
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={time}
                  placeholder="Time"
                  onChangeText={text => setTime(text)}
                />
              </>
            )}

            {/* 
            <TextInput
              style={styles.input}
              value={matingStatus}
              placeholder="Mating Status"
              onChangeText={text => setMatingStatus(text)}
            />
            <TextInput
              style={styles.input}
              value={miscarriageDate}
              placeholder="Miscarriage Date"
              onChangeText={text => setMiscarriageDate(text)}
            />
            <TextInput
              style={styles.input}
              value={miscarriageReason}
              placeholder="Miscarriage Reason"
              onChangeText={text => setMiscarriageReason(text)}
            />
            <TextInput
              style={styles.input}
              value={deliveryDate}
              placeholder="Delivery Date"
              onChangeText={text => setDeliveryDate(text)}
            />
            <TextInput
              style={styles.input}
              value={remark}
              placeholder="Remark"
              onChangeText={text => setRemark(text)}
            /> */}

            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              style={styles.input}
              value={remark}
              placeholder="Remark"
              onChangeText={text => setRemark(text)}
            />

            <TouchableOpacity onPress={handleSaveBreeding} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Continue</Text>
            </TouchableOpacity>
          </>
        )}

        {loading && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="yellow" />
          </View>
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


export default BreedScreen;
