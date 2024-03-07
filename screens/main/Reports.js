import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Card, Title, Appbar, BottomNavigation } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PieChart } from 'react-native-chart-kit'; // Import PieChart
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../config/config';

const ReportScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState(null);
  const [farmName, setFarmName] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchUserInfo();
    fetchData();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedFarmName = await AsyncStorage.getItem('farmName');

      if (storedUsername && storedFarmName) {
        setUsername(storedUsername); 
        setFarmName(storedFarmName);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const fetchData = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      const userID = await AsyncStorage.getItem('userID');

      if (!authToken || !userID) {
        console.error('Please log in.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/animal/get-animal-user/${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      const jsonData = await response.json();

      const data = jsonData.map(entry => ({ 
        name: entry.animal, 
        population: entry.value,
        color: getRandomColor(), 
        legendFontColor: "#7F7F7F",
        legendFontSize: 15 
      }));

      setChartData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const availableColors = ["#4A148C", "#880E4F", "#0D47A1", "#01579B", "#E65100"];

  const getRandomColor = () => {
    if (availableColors.length === 0) {
      console.error('No more colors available');
      return null;
    }
  
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const selectedColor = availableColors[randomIndex];
    
    // Remove the selected color from the available colors array
    availableColors.splice(randomIndex, 1);
  
    return selectedColor;
  };
  
  
  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {/* Profile Image */}
          <View style={styles.profileImage}>
            <Text style={styles.profileInitials}>{username ? username.charAt(0) : '...'}</Text>
          </View>
          {/* Greeting Text */}
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Hi, {username ? username : '...'}</Text>
          </View>
          {/* Appbar Icons */}
          <View style={styles.appbarIcons}>
            <MaterialIcon name="notifications" size={26} color="#00695C" onPress={() => { /* Handle notification press */ }} style={styles.iconSpacing} />
            <MaterialIcon name="search" size={26} color="#00695C" onPress={() => { /* Handle search press */ }} />
          </View>
        </View>

        {/* Green Card */}
        <View style={styles.greenCard}>
          <Text style={styles.mainHeading}>NGN75,000</Text>
          <Text style={styles.currentDate}>Revenue</Text>
        </View>


        {/* Pie Chart */}
        { chartData ? (
          <View style={styles.chartContainer}>
          <PieChart
            data={chartData}
            width={350}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
        ):(
          <View style={styles.chartContainer}>
          <PieChart
            data={[]}
            width={350}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
        )}

        <View style={styles.gridContainer}>
            {/* Top row */}
            <View style={styles.rowContainer}>
              <View style={styles.gridItem}>
                <Text style={styles.gridItemText}>Vaccines</Text>
                <Text style={styles.gridItemText}>5</Text>

              </View>
              <View style={styles.gridItem}>
                 <Text style={styles.gridItemText}>Breeds</Text>
                <Text style={styles.gridItemText}>3</Text>             
             </View>
            </View>

            {/* Bottom row */}
            <View style={styles.rowContainer}>
              <View style={styles.gridItem}>
                <Text style={styles.gridItemText}>Sheds</Text>
                <Text style={styles.gridItemText}>2</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridItemText}>Milk Qty</Text>
                <Text style={styles.gridItemText}>7 Ltr</Text>
              </View>
            </View>
          </View>
        
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 105, 92, ${opacity})`,
  strokeWidth: 2,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
  },
  greenCard: {
    backgroundColor: '#00695C',
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
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
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconWrapper: {
    width: '30%',
    alignItems: 'center',
    marginVertical: '1%',
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
  gridContainer: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  gridItem: {
    width: '48%', // Adjust the width as needed for your grid items
    height: 100, // Adjust the height as needed for your grid items
    backgroundColor: '#80CBC4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItemText: {
    fontSize: 18, // Adjust the font size as needed
    color: '#004D40', // White color
  },
});

export default ReportScreen;
