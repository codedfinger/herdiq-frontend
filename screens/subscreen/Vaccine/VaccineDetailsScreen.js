import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DataTable } from 'react-native-paper';
import { API_BASE_URL } from '../../../config/config';
import moment from 'moment';

const VaccineDetailsScreen = ({ route }) => {
  const { vaccine } = route.params;

  const navigation = useNavigation();

  const [newAnimal, setNewAnimal] = useState('');
  const [vaccineAnimals, setVaccineAnimals] = useState([]); 

  const [selectedOption, setSelectedOption] = useState('tagID'); // Default to 'tagID'
  const [tagID, setTagID] = useState('');
  const [shedName, setShedName] = useState('');

  // State for modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [ showFirstDayPicker, setShowFirstDayPicker ] = useState(false)
  const [ showLastDayPicker, setShowLastDayPicker ] = useState(false)
  const [ firstDay, setFirstDay ] = useState(new Date ());
  const [ lastDay, setLastDay ] = useState(new Date());

// New state variables for the details modal
const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
const [selectedAnimalVaccineDetails, setSelectedAnimalVaccineDetails] = useState(null);

  const [ cycle, setCycle ] = useState("")
  const [ remark, setRemark ] = useState("")

  // State for modal form data
  const [modalFormData, setModalFormData] = useState({
    selectedOption: 'tagID',
    tagID: '',
    firstDay: new Date(),
    lastDay: new Date(),
    cycle: '',
    remark: '',
    showFirstDayPicker: false, // New state for controlling the visibility of the first day datepicker
    showLastDayPicker: false, // New state for controlling the visibility of the last day datepicker
  });

  // Function to handle opening the first day datepicker
const handleOpenFirstDayPicker = () => {
  setShowFirstDayPicker(true)
};
  // Function to handle opening the first day datepicker
  const handleOpenLastDayPicker = () => {
    setShowLastDayPicker(true)
  };

    // Function to handle opening the first day datepicker
const handleCloseFirstDayPicker = () => {
  setShowFirstDayPicker(false)
};

  // Function to handle opening the first day datepicker
  const handleCloseLastDayPicker = () => {
    setShowLastDayPicker(false)
  };


  // Function to handle opening the modal
  const handleOpenModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  // Function to handle closing the modal
  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);


   
   // Function to handle opening the details modal
   const handleOpenDetailsModal = (animal) => {
     setSelectedAnimalVaccineDetails({
      name: animal.name,
      tagID: animal.tagID,
      firstDay: animal.firstDay,
      lastDay: animal.lastDay,
      cycle: animal.cycle,
      remark: animal.remark
     });
     setIsDetailsModalVisible(true);
   };

   // Add the useEffect hook to observe changes in selectedAnimalVaccineDetails
    useEffect(() => {
    }, [selectedAnimalVaccineDetails]);
 
   // Function to handle closing the details modal
   const handleCloseDetailsModal = () => {
     setSelectedAnimalVaccineDetails(null);
     setIsDetailsModalVisible(false);
   };
 


  const fetchVaccineAnimals = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');

      const response = await fetch(`${API_BASE_URL}/api/vaccine/get-vaccine/${vaccine._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setVaccineAnimals(data.vaccine.vaccineAnimals);
      } else {
        console.error('Error fetching vaccine animals:', data.message);
      }
    } catch (error) {
      console.error('Error fetching vaccine animals:', error.message);
    }
  };

  useEffect(() => {
    // Fetch vaccine animals when the component mounts
    fetchVaccineAnimals();
  }, [vaccine._id]); 

  const handleAddAnimal = async () => {
    try {
        const authToken = await AsyncStorage.getItem('authToken');

       // Make sure the selected option is not empty
    if (!tagID.trim() && modalFormData.selectedOption === 'tagID') {
      Alert.alert('Error', 'Please enter the animal tag ID.');
      return;
    }

    // Add additional checks for other input fields if needed

    let endpoint;

    // Determine the endpoint based on the selected option
    if (modalFormData.selectedOption === 'tagID') {
      endpoint = `${API_BASE_URL}/api/vaccine/add-animal-vaccine/${vaccine._id}`;
    } else if (modalFormData.selectedOption === 'shedName') {
      // Adjust this line based on your actual API endpoint for adding animals by shedName
      endpoint = `${API_BASE_URL}/api/vaccine/add-animals-from-shed/${vaccine._id}`;
    } else {
      // Handle the case where an unsupported option is selected
      console.error('Unsupported option selected:', modalFormData.selectedOption);
      return;
    }

        // Construct the request body based on the selected option
        const requestBody = {
          tagID: modalFormData.selectedOption === 'tagID' ? tagID : undefined,
          shedName: modalFormData.selectedOption === 'shedName' ? shedName : undefined,
          firstDay: firstDay,
          lastDay: lastDay,
          cycle: cycle,
          remark: remark
        };

      // Call your API to add the animal to the vaccine
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      // Handle the response
      if (response.ok) {
        console.log('Animal added successfully:', data);
        fetchVaccineAnimals();
        handleCloseModal()

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

        const response = await fetch(`${API_BASE_URL}/api/vaccine/remove-vaccine-animal/${vaccine._id}`, {
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
            fetchVaccineAnimals(); // Fetch the updated list of shed animals
        } else {
            console.error('Error removing animal:', data.message);
            Alert.alert(data.message);
        }
    } catch (error) {
        console.error('Error removing animal:', error.message);
    }
};

const onChangeFirstDay = (event, selectedDate) => {
  const currentDate = selectedDate;
  // const formattedDate = moment(currentDate).format('YYYY-MM-DD');
  console.log("selected date", currentDate)
  handleCloseFirstDayPicker(true);
  setFirstDay(currentDate);
};

const onChangeLastDay = (event, selectedDate) => {
  const currentDate = selectedDate;
  // const formattedDate = moment(currentDate).format('YYYY-MM-DD');
  console.log("selected date", currentDate)
  handleCloseLastDayPicker(true);
  setLastDay(currentDate);
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
            <Text style={styles.headerTitle}>{vaccine.vaccineName} Vaccine</Text>
        </View>
      
      
        <View style={styles.card}>
        <View style={styles.cardCover}>
            <MaterialIcons name="local-hospital" size={48} color="#00695C" />
        </View>
        <View style={styles.listItem}>
            <View style={styles.itemHeader}>
            <Text style={styles.aboutTitle}>Cycle</Text>
            <Text style={styles.shedDescription}> {vaccine.cycle} days</Text>
            <Text style={styles.aboutTitle}>About</Text>
            <Text style={styles.shedDescription}>{vaccine.remark}</Text>
            </View>
        </View>
        </View>

       {/* Animals in the Shed */}
      <View style={styles.animalsContainer}>
        <Text style={styles.animalsHeader}>Vaccine Animals</Text>

        {/* React Native Paper DataTable to display shed animals */}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Tag ID</DataTable.Title>
            <DataTable.Title>Gender</DataTable.Title>


          </DataTable.Header>

          {vaccineAnimals.map((animal, index) => (
            <DataTable.Row 
            key={index}
            onPress={() => handleOpenDetailsModal(animal)} 
            >
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
        {vaccineAnimals.length === 0 && (
            <Text style={styles.noAnimalsText}>No animals added to this vaccine yet</Text>
        )}

      </View>




      {/* Button to open the modal */}
      <TouchableOpacity
              style={styles.addAnimalButton}
              onPress={handleOpenModal}
            >
              <Text style={styles.addAnimalButtonText}>Add Animal</Text>
            </TouchableOpacity>


      {/* Modal */}
      <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={handleCloseModal}
            >
              <ScrollView contentContainerStyle={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Animal</Text>

          {/* Segmented Control for selecting add option */}
          <View style={styles.segmentedControl}>
          <TouchableOpacity
          style={[styles.segmentedButton, modalFormData.selectedOption === 'tagID' && styles.selectedSegment]}
          onPress={() => {
            setModalFormData((prevData) => ({ ...prevData, selectedOption: 'tagID' }));
            setTagID(''); // Clear the tagID when switching options
          }}
        >
          <Text style={styles.segmentedButtonText}>By Tag ID</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.segmentedButton, modalFormData.selectedOption === 'shedName' && styles.selectedSegment]}
          onPress={() => {
            setModalFormData((prevData) => ({ ...prevData, selectedOption: 'shedName' }));
            setShedName(''); // Clear the shedName when switching options
          }}
        >
          <Text style={styles.segmentedButtonText}>By Shed</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.modalInput}
        placeholder={modalFormData.selectedOption === 'tagID' ? 'Enter Tag ID' : 'Enter Shed Name'}
        value={modalFormData.selectedOption === 'tagID' ? tagID : shedName}
        onChangeText={(text) => {
          modalFormData.selectedOption === 'tagID' ? setTagID(text) : setShedName(text);
        }}
      />

    {/* First Day Input */}
    <TouchableOpacity
      style={styles.modalInput}
      onPress={handleOpenFirstDayPicker} // Open the first day datepicker on press
    >
        <Text>{firstDay.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {showFirstDayPicker && (
              <DateTimePicker
                testID="firstDayPicker"
                value={firstDay}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeFirstDay}

              />
            )}

            {/* ... Other input fields ... */}

            {/* Last Day Input */}
            <TouchableOpacity
              style={styles.modalInput}
              onPress={handleOpenLastDayPicker} // Open the last day datepicker on press
            >
        <Text>{lastDay.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {showLastDayPicker && (
              <DateTimePicker
                testID="lastDayPicker"
                value={lastDay}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeLastDay}

              />
            )}

            <TextInput
              style={styles.modalInput}
              placeholder="Enter Cycle in days"
              value={cycle}
              onChangeText={(text) => setCycle(text)}
            />   

            <TextInput
              style={styles.modalInput}
              placeholder="Remark"
              value={remark}
              multiline={true} 
              numberOfLines={4}
              onChangeText={(text) => setRemark(text)}
            />             

          {/* Add Animal Button */}
          <TouchableOpacity style={styles.modalButton} onPress={handleAddAnimal}>
            <Text style={styles.modalButtonText}>Add Animal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </Modal>

      {/* Details modal for each vaccine animals*/}
 {/* Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDetailsModalVisible}
        onRequestClose={handleCloseDetailsModal}
      >
        {/* Content of the details modal */}
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Vaccine Details</Text>
            
     {/* Display vaccine details here */}
     {selectedAnimalVaccineDetails && (
              <View>
                <View style={styles.animalTitleContainer}>
                  <Text style={styles.animalTitle}>{selectedAnimalVaccineDetails.name}</Text>
                  <Text style={styles.tagID}>{selectedAnimalVaccineDetails.tagID}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>First Day:</Text>
                  <Text style={styles.detailText}>{moment(selectedAnimalVaccineDetails.firstDay).format('MMMM DD, YYYY')}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Last Day:</Text>
                  <Text style={styles.detailText}>{moment(selectedAnimalVaccineDetails.lastDay).format('MMMM DD, YYYY')}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Cycle:</Text>
                  <Text style={styles.detailText}>{selectedAnimalVaccineDetails.cycle} days</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Next Vaccination Date:</Text>
                  <Text style={styles.detailText}>
                    {moment(selectedAnimalVaccineDetails.firstDay).add(selectedAnimalVaccineDetails.cycle, 'days').format('MMMM DD, YYYY')}
                  </Text>
                </View>

                <View style={styles.remarkContainer}>
                  <Text style={styles.detailLabel}>Remark:</Text>
                  <Text style={styles.remarkText}>{selectedAnimalVaccineDetails.remark}</Text>
                </View>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleCloseDetailsModal}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            )}         
            </View>
        </View>
      </Modal>


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
      fontSize: 15,
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
      segmentedControl: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      
      segmentedButton: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00695C',
        margin: 2
      },
      
      selectedSegment: {
        backgroundColor: '#004D40',
      },
      
      segmentedButtonText: {
        color: '#fff',
        fontSize: 16,
      },
      formContainer: {
        marginTop: 10,
      },
      // Styles for the modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalDatePicker: {
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#00695C',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  animalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  animalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00695C'
  },
  tagID: {
    fontSize: 18,
    color: '#555',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
  },
  remarkContainer: {
    marginTop: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  remarkText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'justify',
  },
  });
  

export default VaccineDetailsScreen;
