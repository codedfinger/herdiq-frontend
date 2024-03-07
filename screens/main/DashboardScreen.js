import React, { useState } from 'react';
import { BottomNavigation, Text, Provider as PaperProvider } from 'react-native-paper';
import MainScreen from './MainScreen';
import ProfileScreen from './Profile';
import ReportScreen from './Reports';


const HomeRoute = () => {
  return (
    <MainScreen />
  );
};

const ProfileRoute = () => {
  return (
    <ProfileScreen />
  );
};

const ReportRoute = () => {
  return (
    <ReportScreen />
  );
};

const DashboardScreen = () => {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home-minus', unfocusedIcon: 'home-minus-outline'},
    { key: 'reports', title: 'Reports', focusedIcon: 'notebook-edit', unfocusedIcon: 'notebook-edit-outline' },
    { key: 'profile', title: 'Profile', focusedIcon: 'passport', unfocusedIcon: 'face-man' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    reports: ReportRoute,
    profile: ProfileRoute,
  });

  return (
    <PaperProvider
      theme={{
        colors: {
          surface: '#ffffff', 
        },
      }}
    >
      <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#ffffff' }} // Change the background color of the BottomNavigation
      activeColor="#00695C" // Change the active icon color
      theme={{colors: {secondaryContainer: '#E0F2F1'}}}
      variant='primary'

    />
    </PaperProvider>
      

  );
};


export default DashboardScreen;
