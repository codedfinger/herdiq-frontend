import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text,TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { Card, Title, Appbar, BottomNavigation } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config'

const MainScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState(null);
  const [farmName, setFarmName] = useState(null);
  const [chartData, setChartData] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

// Fetch user profile information when the component mounts
useEffect(() => {
  const fetchUsername = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedFarmName = await AsyncStorage.getItem('farmName');

      if (storedUsername && storedFarmName) {
        setUsername(storedUsername); 
        setFarmName(storedFarmName);
      }
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  fetchUsername();
}, []);


  const iconsData = [
    { name: 'goat', type: 'MaterialIcon', label: 'Goat' },
    { name: 'sheep', type: 'MaterialCommunityIcon', label: 'Sheep' },
    { name: 'rabbit', type: 'MaterialCommunityIcon', label: 'Rabbit' },
    { name: 'cow', type: 'MaterialCommunityIcon', label: 'Cow' },
    { name: 'history', type: 'MaterialIcon', label: 'Records' },
    { name: 'group-add', type: 'MaterialIcon', label: 'Employee' },
  
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

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const fetchData = async () => {
    try {

      const authToken = await AsyncStorage.getItem('authToken');
      const userID = await AsyncStorage.getItem('userID');

      if (!authToken || !userID) {
        console.error('Please log in.');
        return;
      }

      // Fetch data from your API
      const response = await fetch(`${API_BASE_URL}/api/animal/get-animal-user/${userID}`,{
        method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
            // body: JSON.stringify(${userID}),
      });
      const jsonData = await response.json();
      
      // Process fetched data and update state
    if (jsonData.length > 0) {
      const labels = jsonData.map(entry => entry.animal);
      const dataPoints = jsonData.map(entry => entry.value);
      const sortedData = {
        labels: labels,
        datasets: [{
          data: dataPoints
        }]
      };
      setChartData(sortedData);
      console.log("chart data", chartData);
    } else {
      // Handle case when jsonData is empty
      console.warn('No data available.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


  //Example data for the line chart
  const data = {
    labels: ['Goat', 'Sheep', 'Cow', 'Rabbit'], // Replace with your actual labels
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0], // Replace with your actual data
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 105, 92, ${opacity})`,
    strokeWidth: 2,
  };

  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString(undefined, options);
    return currentDate;
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refreshing}
      //     onRefresh={onRefresh}
      //   />
      // }
    >
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImage}>
        <Text style={styles.profileInitials}>{username ? username.charAt(0) : "..."}</Text>
        </View>
        <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hi, {username ? username : "..."}</Text>
        </View>
        <View style={styles.appbarIcons}>
          <MaterialIcon name="notifications" size={26} color="#00695C" onPress={() => { /* Handle notification press */ }} style={styles.iconSpacing}/>
          <MaterialIcon name="search" size={26} color="#00695C" onPress={() => { /* Handle search press */ }} />
        </View>
      </View>

      <View style={styles.greenCard}>
        <Text style={styles.currentDate}>{getCurrentDate()}</Text>
        <Text style={styles.mainHeading}>{farmName ? farmName : ''}</Text>
        <Text style={styles.subHeading}>Start managing your farm</Text>
      </View>


      <View style={styles.card}>
      <View style={styles.iconContainer}>
        {iconsData.slice(0, 6).map((icon, index) => (
          <View key={index} style={styles.iconWrapper}>
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate(`${icon.label}`)}
                  >
                    <View style={styles.iconBackground}>
                      {renderIcon(icon.name, icon.type, 30, '#00695C')}
                    </View>
                  </TouchableOpacity>
            
            <Text style={styles.iconText}>{icon.label}</Text>
          </View>
        ))}
      </View>
    </View>

      {/* Bar Chart */}
      { chartData ? (
        <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={350}
          height={200}
          chartConfig={chartConfig}
          bezier
        />
      </View>
      ):(
        <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={350}
          height={200}
          chartConfig={chartConfig}
          bezier
        />
      </View>
      )}
      

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
    marginBottom: 16,
    backgroundColor: '#fff', // White background
    padding: 8, // Add padding
    borderRadius: 8, // Optional: Add border radius
  },
  greenCard: {
    backgroundColor: '#00695C',
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start', // Align items to the left
    marginBottom: 10,
  },
  currentDate: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  mainHeading: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    color: 'white',
    fontSize: 14,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Align icons with space between them
    marginTop: 10,
  },
  iconWrapper: {
    width: '30%', // Set the width to 30% of the container for 3 icons in a row
    alignItems: 'center',
    marginVertical: '1%', // Adjust vertical margin for spacing between rows
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


export default MainScreen;
