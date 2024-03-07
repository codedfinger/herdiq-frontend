import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../config/config';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {ArrowLeftIcon} from 'react-native-heroicons/solid'

const EditBreedingScreen = () => {

const [animalType, setAnimalType] = useState('cow');
  const [tagID, setTagID] = useState('');
  const [tagExists, setTagExists] = useState(false);
  const [matingDate, setMatingDate] = useState(new Date ());
  const [matingType, setMatingType] = useState('');
  const [maleTagID, setMaleTagID] = useState(null);
  const [maleBreed, setMaleBreed] = useState(null);
  const [semen, setSemen] = useState(null);
  const [dose, setDose] = useState(null);
  const [administrator, setAdministrator] = useState(null);
  const [time, setTime] = useState(null);
  const [embryo, setEmbryo] = useState(null);
  const [matingStatus, setMatingStatus] = useState("pending");
  const [miscarriageDate, setMiscarriageDate] = useState(new Date ());
  const [miscarriageReason, setMiscarriageReason] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(new Date ());
  const [remark, setRemark] = useState('');
  const [showNaturalInputs, setShowNaturalInputs] = useState(false);
  const [showInseminationInputs, setShowInseminationInputs] = useState(false);
  const [showTransplantInputs, setShowTransplantInputs] = useState(false);
  const [showNotSuccessful, setShowNotSuccessful] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [showMiscarriage, setShowMiscarriage] = useState(false);

  const [ showMatingDatePicker, setShowMatingDatePicker ] = useState(false)
  const [ showDeliveryDatePicker, setShowDeliveryDatePicker ] = useState(false)
  const [ showMiscarriageDatePicker, setShowMiscarriageDatePicker ] = useState(false)

  const navigation = useNavigation();
  const route = useRoute();

  // Initialize state variables to hold breeding record details
  const [breedingDetails, setBreedingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the breeding record details when the component mounts
    fetchBreedingDetails();
  }, []);

  // Function to fetch breeding record details
  const fetchBreedingDetails = async () => {
    try {
      setLoading(true);
      const authToken = await AsyncStorage.getItem('authToken');
      const breedingId = route.params.breedingId; // Get the breedingId from route params

      const response = await fetch(`${API_BASE_URL}/api/breeding/get-breeding/${breedingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const breedingData = await response.json();
      setBreedingDetails(breedingData.breeding);
    } catch (error) {
      console.error('Error fetching breeding details:', error);
      setError('Error fetching breeding details');
    } finally {
      setLoading(false);
    }
  };

  // Function to update breeding record
 // Function to update breeding record
const handleUpdateBreeding = async () => {
    try {
      setLoading(true);
      const authToken = await AsyncStorage.getItem('authToken');
      const breedingId = route.params.breedingId; // Get the breedingId from route params
  
      // Construct the updated breeding record object
      const updatedBreedingRecord = {
        tagID: breedingDetails.tagID,
        matingDate,
        matingType: breedingDetails.matingType,
        maleTagID: breedingDetails.maleTagID,
        maleBreed: breedingDetails.maleBreed,
        semen: breedingDetails.semen,
        dose: breedingDetails.dose,
        administrator: breedingDetails.administrator,
        time: breedingDetails.time,
        embryo: breedingDetails.embryo,
        matingStatus,
        miscarriageDate,
        miscarriageReason,
        deliveryDate,
        remark: breedingDetails.remark,
      };
  
      const response = await fetch(`${API_BASE_URL}/api/breeding/edit-breeding/${breedingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedBreedingRecord),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Breeding record successfully updated
      console.log('Breeding record updated successfully!');
      // You can navigate to another screen or perform any other actions as needed
      navigation.navigate('CowBreeding', { breedingId })

    } catch (error) {
      console.error('Error updating breeding record:', error);
      setError('Error updating breeding record');
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

  if (!breedingDetails) {
    return null; // Return null if breedingDetails is not available yet
  }

  const handleOpenMatingDatePicker = () => {
    setShowMatingDatePicker(true)
  };
  
  // Function to handle opening the first day datepicker
  const handleCloseMatingDatePicker = () => {
    setShowMatingDatePicker(false)
  };

  const handleOpenDeliveryDatePicker = () => {
    setShowDeliveryDatePicker(true)
  };
  
  // Function to handle opening the first day datepicker
  const handleCloseDeliveryDatePicker = () => {
    setShowDeliveryDatePicker(false)
  };
  
  const handleOpenMiscarriageDatePicker = () => {
    setShowMiscarriageDatePicker(true)
  };
  
  // Function to handle opening the first day datepicker
  const handleCloseMiscarriageDatePicker = () => {
    setShowMiscarriageDatePicker(false)
  };

  const onChangeMatingDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    // const formattedDate = moment(currentDate).format('YYYY-MM-DD');
    console.log("selected date", currentDate)
    handleCloseMatingDatePicker(true);
    setMatingDate(currentDate);
  };


  const onChangeDeliveryDate = (event, selectedDate) => {
    const currentDate = selectedDate || deliveryDate; // Use current value if no date is selected
    setShowDeliveryDatePicker(false); // Close the date picker
    setDeliveryDate(currentDate); // Update the delivery date state
  };
  
  const onChangeMiscarriageDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    // const formattedDate = moment(currentDate).format('YYYY-MM-DD');
    console.log("selected date", currentDate)
    handleCloseMiscarriageDatePicker(true);
    setMiscarriageDate(currentDate);
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
        <Text style={styles.headerTitle}>Update Breeding</Text>
      </View>

     <View style={styles.card}>
     <Text>Set Status:</Text>

     <View 
        style={styles.dropDownInput}
    >
    <Picker
        style={{width:"100%"}} 
        
        mode="dropdown"      
        selectedValue={matingStatus}
        onValueChange={(itemValue, itemIndex) => {
        setMatingStatus(itemValue);
        setShowNotSuccessful(itemValue === 'unsuccessful');
        setShowDelivery(itemValue === 'delivery');
        setShowMiscarriage(itemValue === 'miscarriage');

        }}>
        <Picker.Item label="Not Successful" value="unsuccessful" style={styles.pickerItem}/>
        <Picker.Item label="Delivered" value="delivery" style={styles.pickerItem}/>
        <Picker.Item label="Miscarriage" value="miscarriage" style={styles.pickerItem}/>
    </Picker>
    </View>

            {showDelivery && (
              <>
            <Text>Choose Delivery Date</Text>

            <TouchableOpacity
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              style={styles.modalInput}
              onPress={handleOpenDeliveryDatePicker} // Open the first day datepicker on press
            >
              <Text>{deliveryDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
                {/* Render additional inputs for natural mating */}
                {showDeliveryDatePicker && (
                <DateTimePicker
                    testID="matingDatePicker"
                    value={deliveryDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDeliveryDate}
                />
            )}
              </>
            )}

            {showMiscarriage && (
              <>
            <Text>Choose Miscarriage Date</Text>

               <TouchableOpacity
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              style={styles.modalInput}
              onPress={handleOpenMiscarriageDatePicker} // Open the first day datepicker on press
            >
              <Text>{miscarriageDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
                {/* Render additional inputs for natural mating */}
                {showMiscarriageDatePicker && (
                <DateTimePicker
                    testID="matingDatePicker"
                    value={miscarriageDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeMiscarriageDate}
                />
            )}
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  style={styles.input}
                  value={miscarriageReason}
                  placeholder="Reason"
                  onChangeText={text => setMiscarriageReason(text)}
                />
              </>
            )}


    
    <TextInput
    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
    style={styles.input}
    value={breedingDetails.tagID}
    placeholder="Tag ID"
    onChangeText={text => setBreedingDetails(prevState => ({ ...prevState, tagID: text }))}
    />

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
        selectedValue={breedingDetails.matingType}
        onValueChange={(itemValue, itemIndex) => {
        setBreedingDetails(prevState => ({ ...prevState, matingType: itemValue }))        
        setShowNaturalInputs(itemValue === 'natural');
        setShowInseminationInputs(itemValue === 'artificial');
        setShowTransplantInputs(itemValue === 'transplant');

        }}>
        <Picker.Item label="Natural" value="natural" style={styles.pickerItem}/>
        <Picker.Item label="Artificial Insemination" value="artificial" style={styles.pickerItem}/>
        <Picker.Item label="Embryo Transplant" value="transplant" style={styles.pickerItem}/>
    </Picker>
    </View>
    

    
        {breedingDetails.matingType == 'natural' && (
        <>
            {/* Render additional inputs for natural mating */}
            <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            style={styles.input}
            value={breedingDetails.maleTagID}
            placeholder="Male Tag ID"
            onChangeText={text => setBreedingDetails(prevState => ({ ...prevState, maleTagID: text }))}
            />
            <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            style={styles.input}
            value={breedingDetails.maleBreed}
            placeholder="Male Breed"
            onChangeText={text => setBreedingDetails(prevState => ({ ...prevState, maleBreed: text }))}
            />
        </>
        )}

        {breedingDetails.matingType == 'artificial' && (
        <>
            {/* Render additional inputs for insemination */}
            <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            style={styles.input}
            value={breedingDetails.semen}
            placeholder="Semen"
            onChangeText={text => setBreedingDetails(prevState => ({ ...prevState, semen: text }))}
            />
            <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            style={styles.input}
            value={breedingDetails.dose}
            placeholder="Dose"
            onChangeText={text => setBreedingDetails(prevState => ({ ...prevState, dose: text }))}
            />
            <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            style={styles.input}
            value={breedingDetails.administrator}
            placeholder="Technical/Medical Professional"
            onChangeText={text => setBreedingDetails(prevState => ({ ...prevState, administrator: text }))}
            />
            <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            style={styles.input}
            value={breedingDetails.time}
            placeholder="Time"
            onChangeText={text => setBreedingDetails(prevState => ({ ...prevState, time: text }))}
            />
        </>
        )}

        {breedingDetails.matingType == 'transplant' && (
        <>
            {/* Render additional inputs for insemination */}
            <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            style={styles.input}
            value={breedingDetails.embryo}
            placeholder="Embryo"
            onChangeText={text => setBreedingDetails(prevState => ({ ...prevState, embryo: text }))}
            />
            <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            style={styles.input}
            value={breedingDetails.administrator}
            placeholder="Technical/Medical Professional"
            onChangeText={text => setBreedingDetails(prevState => ({ ...prevState, administrator: text }))}
            />
            <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            style={styles.input}
            value={breedingDetails.time}
            placeholder="Time"
            onChangeText={text => setBreedingDetails(prevState => ({ ...prevState, time: text }))}
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
        value={breedingDetails.remark}
        placeholder="Remark"
        onChangeText={text => setBreedingDetails(prevState => ({ ...prevState, remark: text }))}
        />


    </>


{loading && (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="yellow" />
  </View>
)}

</View>

      {/* Add a button to update the breeding record */}
      <TouchableOpacity onPress={handleUpdateBreeding} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Update Breeding Record</Text>
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

export default EditBreedingScreen;
