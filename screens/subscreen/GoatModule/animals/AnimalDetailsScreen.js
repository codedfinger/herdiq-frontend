import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView,StyleSheet, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DataTable } from 'react-native-paper';

const AnimalDetailsScreen = ({ route }) => {
  const { animal } = route.params;

  const navigation = useNavigation();

  return (
    <ScrollView >

    <View style={styles.container}>
        <View style={styles.greenCard}>
            <View className="flex-row justify-start">
            <TouchableOpacity 
            onPress={()=> navigation.goBack()} 
            className="bg-green-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle}>{animal.breedName}</Text>
        </View>
      
      
        <View style={styles.card}>
        <View style={styles.cardCover}>
            <MaterialCommunityIcons name="camera-plus" size={48} color="#00695C" />
        </View>
                 
              <View style={styles.description}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Color</Text>
                  <Text style={styles.detailText}>{animal.color}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Gender</Text>
                  <Text style={styles.detailText}>{animal.gender}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Breed Name</Text>
                  <Text style={styles.detailText}>{animal.breedName}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Batch No</Text>
                  <Text style={styles.detailText}>{animal.batchNo}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Purchase Type</Text>
                  <Text style={styles.remarkText}>{animal.purchaseType}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Shed</Text>
                  <Text style={styles.remarkText}>{animal.shed}</Text>
                </View>
              </View>        
            </View>


      <View style={styles.otherCard}>
        <Text style={styles.animalsHeader}>VACCINE</Text>

        <DataTable>

          {animal.vaccine.map((vaxx, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{vaxx}</DataTable.Cell>
             
              
            </DataTable.Row>
          ))}
        </DataTable>

        {animal.vaccine.length === 0 && (
            <Text style={styles.noAnimalsText}>No vaccine for this animal yet</Text>
        )}

      </View>

      {/* Card for Weight */}
      <View style={styles.otherCard}>
        <Text style={styles.animalsHeader}>WEIGHT</Text>
        {animal.weight && animal.weight.length > 0 ? (
          <DataTable>
            {animal.weight.map((weightItem, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{weightItem}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        ) : (
          <View style={styles.noAnimalsContainer}>
          <Text style={styles.noAnimalsText}>No Records added</Text>
          <TouchableOpacity
                style={styles.addIconContainer}
                onPress={() => {
                  // Add your logic for handling the "add" action here
                  console.log("Add action triggered");
                }}>
                <MaterialIcons name="add-circle-outline" size={24} color="#BDBDBD" />
              </TouchableOpacity>
          </View>         )}
      </View>

        {/* Card for Weight */}
        <View style={styles.otherCard}>
        <Text style={styles.animalsHeader}>MATING</Text>
        {animal.weight && animal.weight.length > 0 ? (
          <DataTable>
            {animal.weight.map((weightItem, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{weightItem}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        ) : (
          <View style={styles.noAnimalsContainer}>
          <Text style={styles.noAnimalsText}>No Records added</Text>
          <TouchableOpacity
                style={styles.addIconContainer}
                onPress={() => {
                  // Add your logic for handling the "add" action here
                  console.log("Add action triggered");
                }}>
                <MaterialIcons name="add-circle-outline" size={24} color="#BDBDBD" />
              </TouchableOpacity>
          </View>         )}
      </View>

  {/* Card for Weight */}
  <View style={styles.otherCard}>
        <Text style={styles.animalsHeader}>PROGENY</Text>
        {animal.progeny && animal.progeny.length > 0 ? (
          <DataTable>
            {animal.progeny.map((data, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{data}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        ) : (
          <View style={styles.noAnimalsContainer}>
          <Text style={styles.noAnimalsText}>No Records added</Text>
          
          </View>         
          )}
          <TouchableOpacity
            style={styles.addIconContainer}
            onPress={() => {
              // Add your logic for handling the "add" action here
              navigation.navigate('GoatProgeny')

            }}>
            <MaterialIcons name="add-circle-outline" size={24} color="#BDBDBD" />
          </TouchableOpacity>
      </View>


        {/* Card for Weight */}
        <View style={styles.otherCard}>
        <Text style={styles.animalsHeader}>MILK HISTORY</Text>
        {animal.weight && animal.weight.length > 0 ? (
          <DataTable>
            {animal.weight.map((weightItem, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{weightItem}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        ) : (
          <View style={styles.noAnimalsContainer}>
          <Text style={styles.noAnimalsText}>No Records added</Text>
          <TouchableOpacity
                style={styles.addIconContainer}
                onPress={() => {
                  // Add your logic for handling the "add" action here
                  console.log("Add action triggered");
                }}>
                <MaterialIcons name="add-circle-outline" size={24} color="#BDBDBD" />
              </TouchableOpacity>
          </View>        )}
      </View>

        {/* Card for Weight */}
        <View style={styles.otherCard}>
        <Text style={styles.animalsHeader}>INSURANCE</Text>
        {animal.weight && animal.weight.length > 0 ? (
          <DataTable>
            {animal.weight.map((weightItem, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{weightItem}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        ) : (
          <View style={styles.noAnimalsContainer}>
          <Text style={styles.noAnimalsText}>No insurance record</Text>
          <TouchableOpacity
                style={styles.addIconContainer}
                onPress={() => {
                  // Add your logic for handling the "add" action here
                  console.log("Add action triggered");
                }}>
                <MaterialIcons name="add-circle-outline" size={24} color="#BDBDBD" />
              </TouchableOpacity>
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
      padding: 10,
      paddingTop: 40,
    },
    
    card: {
      marginTop: 76,
      padding: 5,
      borderRadius: 8,
      backgroundColor: '#fff', // Set the background color of the card
      marginBottom: 15
    },
    otherCard: {
      padding: 5,
      borderRadius: 8,
      backgroundColor: '#fff', // Set the background color of the card
      marginBottom: 15

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
      borderBottomColor: '#00695C',
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
      noAnimalsContainer: {
        alignItems: 'center',
      },
      addIconContainer: {
        marginTop: 10,
        alignSelf: 'center'
      },
      deleteIcon: {
        fontSize: 24,
        color: '#D32F2F',
        fontWeight: 'bold',
        textAlign: 'center',  // Center the text horizontally
        alignSelf: 'center', // Center the text vertically
        marginTop: 15,
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
        color: '#00695C'
      },
      detailText: {
        fontSize: 14,
        color: '#555',
      },
      description: {
        padding: 10,
      },
  });
  

export default AnimalDetailsScreen;
