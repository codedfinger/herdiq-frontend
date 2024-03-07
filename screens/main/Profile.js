import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Text,TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Card, Title, Appbar, BottomNavigation } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native'
import { API_BASE_URL } from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();

  // State variables to hold user profile information
  const [profileInfo, setProfileInfo] = useState(null);
  const [username, setUsername] = useState(profileInfo ? profileInfo.username : '');
  const [email, setEmail] = useState(profileInfo ? profileInfo.email : '');
  const [password, setPassword] = useState(profileInfo ? profileInfo.password : '');
  const [fullname, setFullname] = useState(profileInfo ? profileInfo.fullname : '');
  const [farmName, setFarmName] = useState(profileInfo ? profileInfo.farmName : '');
  const [city, setCity] = useState(profileInfo ? profileInfo.city : '');
  const [country, setCountry] = useState(profileInfo ? profileInfo.country : '');
  const [mobileNumber, setMobileNumber] = useState(profileInfo ? profileInfo.mobileNumber : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch user profile information from the backend
  const fetchProfileInfo = async () => {
    try {

     
      setLoading(true);

      const authToken = await AsyncStorage.getItem('authToken');
      const userID = await AsyncStorage.getItem('userID')
      if (!authToken && !userID) {
        console.error('Please log in.');
        return;
      }
      
      // Replace 'API_ENDPOINT' with the actual endpoint to fetch user profile information
      const response = await fetch(`${API_BASE_URL}/api/auth/show/${userID}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch profile information');
      }
      const data = await response.json();

      const profile = data.user
      setProfileInfo(profile);

      console.log("profile info",profileInfo)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to update user profile information
  const updateProfile = async () => {
    try {
      setLoading(true);

      const authToken = await AsyncStorage.getItem('authToken');
      const userID = await AsyncStorage.getItem('userID');

      if (!authToken || !userID) {
        console.error('Please log in.');
        return;
      }

      const updateData = {};
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (password) updateData.password = password;
      if (fullname) updateData.fullname = fullname;
      if (farmName) updateData.farmName = farmName;
      if (city) updateData.city = city;
      if (country) updateData.country = country;
      if (mobileNumber) updateData.mobileNumber = mobileNumber;
  

      const response = await fetch(`${API_BASE_URL}/api/auth/update/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ update: updateData }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile information');
      }

      const data = await response.json();
      const updatedData = data.data.user

      setProfileInfo(updatedData);

      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  // Fetch user profile information when the component mounts
  useEffect(() => {
    fetchProfileInfo();
  }, []);

  // Update fields with profileInfo data
  useEffect(() => {
    if (profileInfo) {
      setUsername(profileInfo.username || '');
      setEmail(profileInfo.email || '');
      setPassword(profileInfo.password || '');
      setFullname(profileInfo.fullname || '');
      setFarmName(profileInfo.farmName || '');
      setCity(profileInfo.city || '');
      setCountry(profileInfo.country || '');
      setMobileNumber(profileInfo.mobileNumber || '');
    }
  }, [profileInfo]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>

    <View style={styles.container}>
      <View style={styles.greenCard}>
        <Text style={styles.mainHeading}>Profile Settings</Text>
      </View>

      {profileInfo && (
        <View style={styles.profileInfoContainer}>


      <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
        style={styles.input}
        value={username}
        onChangeText={text => setUsername(text)}
        placeholder="Username"
      />

      <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
        style={styles.input}
        value={email}
        // onChangeText={text => setEmail(text)}
        placeholder="Email"
        disabled={true}
      />

      <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
        style={styles.input}
        value={fullname}
        onChangeText={text => setFullname(text)}
        placeholder="Fullname"
      />

      <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
        style={styles.input}
        value={farmName}
        onChangeText={text => setFarmName(text)}
        placeholder="Farm Name"
      />

      <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
        style={styles.input}
        value={country}
        onChangeText={text => setCountry(text)}
        placeholder="Country"
      />

      <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
        style={styles.input}
        value={city}
        onChangeText={text => setCity(text)}
        placeholder="City"
      />

      <TextInput
        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
        style={styles.input}
        value={mobileNumber}
        onChangeText={text => setMobileNumber(text)}
        placeholder="Mobile Number"
      />


          {/* Add more text elements for other profile information */}
        </View>
      )}

        { loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="yellow" />
          </View>
        ):(
          <TouchableOpacity onPress={updateProfile} style={styles.editButton}>
            <Text style={styles.editButtonText}>Update Profile</Text>
          </TouchableOpacity>
        )}

          <TouchableOpacity onPress={() => {navigation.navigate('Password')}} style={styles.editButton}>
            <Text style={styles.editButtonText}>Change Password</Text>
          </TouchableOpacity>   
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
  greenCard: {
    backgroundColor: '#00695C',
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start', // Align items to the left
    marginBottom: 10,
  },
  mainHeading: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileInfoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#00695C',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#00695C',
    borderWidth: 1,
    paddingHorizontal: 8,
  },

});

export default ProfileScreen;