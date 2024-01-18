import React, { useState } from 'react';
import { View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import { Card, Title, Appbar, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart } from 'react-native-chart-kit';

const HomeScreen = () => {

  const iconsData = [
    { name: 'attach-money', label: 'Finance' },
    { name: 'history', label: 'Records' },
    { name: 'group-add', label: 'Employee' },
    { name: 'goat', label: 'Animals' },
    { name: 'subtitles', label: 'Breed' },
    { name: 'house-siding', label: 'Shed' },
    { name: 'local-hospital', label: 'Vaccine' },
    { name: 'local-mall', label: 'Breedings' },
    { name: 'pets', label: 'Matings' },
    { name: 'loyalty', label: 'Tags' },
    { name: 'settings', label: 'Settings' },

  ];

  const username = "Alex"; // Replace with the actual username

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
      <View style={styles.header}>
        <View style={styles.profileImage}>
          <Text style={styles.profileInitials}>{username.charAt(0)}</Text>
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hi, {username}</Text>
        </View>
        <View style={styles.appbarIcons}>
          <Icon name="notifications" size={26} color="#00695C" onPress={() => { /* Handle notification press */ }} style={styles.iconSpacing}/>
          <Icon name="search" size={26} color="#00695C" onPress={() => { /* Handle search press */ }} />
        </View>
      </View>

      
      <View style={styles.card}>
          <View style={styles.iconContainer}>
            {iconsData.slice(0, 3).map((icon, index) => (
              <View key={index} style={styles.iconWrapper}>
                <View style={styles.iconBackground}>
                  <Icon name={icon.name} size={30} color="#00695C" />
                </View>
                <Text style={styles.iconText}>{icon.label}</Text>
              </View>
            ))}
          </View>
      </View>

      <View style={styles.card}>
        <View style={styles.iconContainer}>
          {iconsData.slice(3).map((icon, index) => (
            <View key={index} style={styles.iconWrapper}>
              <View style={styles.iconBackground}>
                <Icon name={icon.name} size={30} color="#00695C" />
              </View>
              <Text style={styles.iconText}>{icon.label}</Text>
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
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconWrapper: {
    alignItems: 'center',
    margin: 8,
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


export default HomeScreen;
