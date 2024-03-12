import React, { useState } from 'react';
import { View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import { Card, Title, Appbar, BottomNavigation } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'

const GoatScreen = () => {
  const navigation = useNavigation();

  const iconsData = [
    { name: 'attach-money',type: 'MaterialIcon', label: 'Finance', title: 'Finance' },
    { name: 'history', type: 'MaterialIcon', label: 'Records', title: 'Records' },
    { name: 'group-add', type: 'MaterialIcon', label: 'Employee', title: 'Employee' },
    { name: 'goat', type: 'MaterialIcon', label: 'GoatAnimals', title: 'Animals' },
    { name: 'pets', type: 'MaterialIcon', label: 'GoatBreed', title: 'Breed' },
    { name: 'house-siding', type: 'MaterialIcon', label: 'GoatShed', title: 'Shed' },
    { name: 'local-hospital', type: 'MaterialIcon', label: 'Vaccine', title: 'Vaccine' },
    { name: 'dna', type: 'MaterialCommunityIcon', label: 'GoatProgeny', title: 'Progeny' },
    { name: 'gender-male-female', type: 'MaterialCommunityIcon', label: 'GoatBreeding', title: 'Breeding' },
    { name: 'loyalty', type: 'MaterialIcon', label: 'Tags', title: 'Tags' },
    { name: 'baby-bottle', type: 'MaterialCommunityIcon', label: 'GoatMilk', title: 'Milk' },


  ];

  const renderIcon = (name, type, size, color) => {
    switch (type) {
      case 'MaterialIcon':
        return <MaterialIcon name={name} size={size} color={color} />;
      case 'FontAwesome':
        return <FontAwesomeIcon name={name} size={size} color={color} />;
      case 'MaterialCommunityIcon':
        return <MaterialCommunityIcon name={name} size={size} color={color} />;
      default:
        // Return a default icon or handle the case as needed
        return null;
    }
  };

  // Example data for the line chart
  const data = {
    labels: ['Goat', 'Sheep', 'Cow', 'Pig', 'Bird'], // Replace with your actual labels
    datasets: [
      {
        data: [19, 21, 25, 22, 23, 33], // Replace with your actual data
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 105, 92, ${opacity})`,
    strokeWidth: 2,
  };


  return (
    <View style={styles.container}>
      <View style={styles.greenCard}>
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={()=> navigation.goBack()} 
          className="bg-green-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Goat</Text>

      </View>

      
      

      <View style={[styles.card, styles.secondCard]}>
        <View style={styles.iconContainer}>
          {iconsData.slice(3).map((icon, index) => (
            <View key={index} style={styles.iconWrapper}>
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(`${icon.label}`)}
              >
                <View style={styles.iconBackground}>
                  {renderIcon(icon.name, icon.type, 30, '#00695C')}
                </View>
                </TouchableOpacity>
              <Text style={styles.iconText}>{icon.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Bar Chart */}
      {/* Line Chart */}
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={350}
          height={200}
          chartConfig={chartConfig}
          bezier
        />
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
    marginBottom: 16,
    backgroundColor: '#fff', // White background
    padding: 8, // Add padding
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
    fontSize: 38,
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
});


export default GoatScreen;
